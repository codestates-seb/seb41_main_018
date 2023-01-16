package com.seb41_main_018.mainproject.config;

import com.seb41_main_018.mainproject.auth.filter.JwtAuthenticationFilter;
import com.seb41_main_018.mainproject.auth.filter.JwtVerificationFilter;
import com.seb41_main_018.mainproject.auth.handler.UserAccessDeniedHandler;
import com.seb41_main_018.mainproject.auth.handler.UserAuthenticationEntryPoint;
import com.seb41_main_018.mainproject.auth.handler.UserAuthenticationFailureHandler;
import com.seb41_main_018.mainproject.auth.handler.UserAuthenticationSuccessHandler;
import com.seb41_main_018.mainproject.auth.jwt.JwtTokenizer;
import com.seb41_main_018.mainproject.auth.utils.CustomAuthorityUtils;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
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

@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserRepository userRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, UserRepository userRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userRepository = userRepository;
    }

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
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/users/emailCheck/*").permitAll()//이메일 중복 체크
                        .antMatchers(HttpMethod.POST, "/users/").permitAll() // 회원 가입
                        .antMatchers(HttpMethod.GET, "/users/*/Info").permitAll() // 회원 상세 정보 조회
                        .antMatchers(HttpMethod.GET, "/users/**").hasAnyRole("USER", "ADMIN") // 회원 조회
                        .antMatchers(HttpMethod.DELETE, "/users/**").hasRole("USER") // 회원 삭제
                        .antMatchers(HttpMethod.POST, "/contents/").hasRole("USER") // 컨텐츠 등록
                        .antMatchers(HttpMethod.PATCH, "/contents/**").hasRole("USER") // 컨텐츠 편집
                        .antMatchers(HttpMethod.POST, "/comments/**").hasRole("USER") // 후기 생성
                        .antMatchers(HttpMethod.PATCH, "/comments/**").hasRole("USER") // 후기 수정
                        .antMatchers(HttpMethod.POST, "**/hearts").hasRole("USER") // 좋아요
                        .antMatchers(HttpMethod.DELETE).hasRole("USER") // 질문, 답변 삭제
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

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler(userRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
