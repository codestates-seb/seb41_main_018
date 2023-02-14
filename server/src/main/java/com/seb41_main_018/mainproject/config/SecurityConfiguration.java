package com.seb41_main_018.mainproject.config;

import com.seb41_main_018.mainproject.auth.filter.JwtAuthenticationFilter;
import com.seb41_main_018.mainproject.auth.filter.JwtVerificationFilter;
import com.seb41_main_018.mainproject.auth.handler.*;
import com.seb41_main_018.mainproject.auth.jwt.JwtTokenizer;
import com.seb41_main_018.mainproject.auth.utils.CustomAuthorityUtils;
import com.seb41_main_018.mainproject.auth.utils.RedisUtil;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserRepository userRepository;
    private final RedisUtil redisUtil;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/users/emailCheck/*").permitAll()//이메일 중복 체크
                        .antMatchers(HttpMethod.POST, "/users/", "/users/login").permitAll() // 회원 가입
                        .antMatchers(HttpMethod.POST, "/users/logout").permitAll()
                        .antMatchers(HttpMethod.GET, "/users/*/Info").permitAll() // 회원 상세 정보 조회
                        .antMatchers(HttpMethod.PATCH, "/users/*").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/users/**").hasAnyRole("USER", "ADMIN") // 회원 조회
                        .antMatchers(HttpMethod.GET, "/contents/**").permitAll()//게시글 조회
                        .antMatchers(HttpMethod.DELETE, "/users/**").hasRole("USER") // 회원 삭제
                        .antMatchers(HttpMethod.POST, "/contents/").hasRole("USER") // 컨텐츠 등록
                        .antMatchers(HttpMethod.PATCH, "/contents/**").hasRole("USER") // 컨텐츠 편집
                        .antMatchers(HttpMethod.POST, "/comments/**").hasRole("USER") // 후기 생성
                        .antMatchers(HttpMethod.PATCH, "/comments/**").hasRole("USER") // 후기 수정
                        .antMatchers(HttpMethod.POST, "/tags/**").hasRole("USER") // 태그 생성
                        .antMatchers(HttpMethod.PATCH, "/tags/**").hasRole("USER")//태그 수정
                        .antMatchers(HttpMethod.DELETE, "/tags/**").hasRole("USER") //태그 삭제
                        .antMatchers(HttpMethod.POST, "**/hearts").hasRole("USER") // 좋아요
                        .antMatchers(HttpMethod.DELETE).hasRole("USER") // 질문, 답변 삭제
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2UserSuccessHandler(jwtTokenizer, userRepository, redisUtil))
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisUtil);
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler(userRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, redisUtil);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
