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
                        .antMatchers(HttpMethod.GET, "/users/emailCheck/*").permitAll()//????????? ?????? ??????
                        .antMatchers(HttpMethod.POST, "/users/", "/users/login").permitAll() // ?????? ??????
                        .antMatchers(HttpMethod.POST, "/users/logout").permitAll()
                        .antMatchers(HttpMethod.GET, "/users/*/Info").permitAll() // ?????? ?????? ?????? ??????
                        .antMatchers(HttpMethod.PATCH, "/users/*").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/users/**").hasAnyRole("USER", "ADMIN") // ?????? ??????
                        .antMatchers(HttpMethod.GET, "/contents/**").permitAll()//????????? ??????
                        .antMatchers(HttpMethod.DELETE, "/users/**").hasRole("USER") // ?????? ??????
                        .antMatchers(HttpMethod.POST, "/contents/").hasRole("USER") // ????????? ??????
                        .antMatchers(HttpMethod.PATCH, "/contents/**").hasRole("USER") // ????????? ??????
                        .antMatchers(HttpMethod.POST, "/comments/**").hasRole("USER") // ?????? ??????
                        .antMatchers(HttpMethod.PATCH, "/comments/**").hasRole("USER") // ?????? ??????
                        .antMatchers(HttpMethod.POST, "/tags/**").hasRole("USER") // ?????? ??????
                        .antMatchers(HttpMethod.PATCH, "/tags/**").hasRole("USER")//?????? ??????
                        .antMatchers(HttpMethod.DELETE, "/tags/**").hasRole("USER") //?????? ??????
                        .antMatchers(HttpMethod.POST, "**/hearts").hasRole("USER") // ?????????
                        .antMatchers(HttpMethod.DELETE).hasRole("USER") // ??????, ?????? ??????
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
