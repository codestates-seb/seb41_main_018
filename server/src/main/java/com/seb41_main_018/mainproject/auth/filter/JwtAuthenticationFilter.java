package com.seb41_main_018.mainproject.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb41_main_018.mainproject.auth.dto.LoginDto;
import com.seb41_main_018.mainproject.auth.jwt.JwtTokenizer;
import com.seb41_main_018.mainproject.auth.utils.RedisUtil;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager; // 정보 전달함
    private final JwtTokenizer jwtTokenizer; // 인증 성공 시 JWT 발급
    private final RedisUtil redisUtil;

    // 인증 시도 로직
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        LoginDto loginDto = new LoginDto();
        UsernamePasswordAuthenticationToken authenticationToken;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        } catch (Exception e) {
            log.info(e.getMessage());
        } finally {
            authenticationToken
                    = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        }

        return authenticationManager.authenticate(authenticationToken);
    }

    // 인증 성공 시
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal();

        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(
                "{\"" + "userId" + "\":" + user.getUserId() + "}"
        );

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(User user) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateAccessToken(claims, subject, expiration, encodeBase64SecretKey);
    }

    private String delegateRefreshToken(User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, encodeBase64SecretKey);

        //refresh 발급시 redis에 저장
        redisUtil.set("refresh_" + user.getEmail(), refreshToken, jwtTokenizer.getRefreshTokenExpirationMinutes());

        return refreshToken;
    }
}
