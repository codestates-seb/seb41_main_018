package com.seb41_main_018.mainproject.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb41_main_018.mainproject.auth.dto.LoginDto;
import com.seb41_main_018.mainproject.auth.jwt.JwtTokenizer;
import com.seb41_main_018.mainproject.auth.utils.RedisUtil;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
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

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager; // 정보 전달함
    private final JwtTokenizer jwtTokenizer; // 인증 성공 시 JWT 발급
    private final RedisUtil redisUtil;

    // 인증 시도 로직
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    // 인증 성공 시
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {

        User user = (User) authResult.getPrincipal();

        Map<String, Object> map = delegateAccessToken(user);
        String accessToken = map.get("accessToken").toString();
        String expiration = map.get("expiration").toString().substring(0, 19).replace("T", " ");

        String refreshToken = delegateRefreshToken(user);
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Expiration", expiration);
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private Map<String, Object> delegateAccessToken(User user) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail()); //추가
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        LocalDateTime localDateTime = LocalDateTime.now().plusMinutes(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        Map<String, Object> map = new HashMap<>();
        map.put("accessToken", accessToken);
        map.put("expiration", localDateTime);

        return map;
    }

    private String delegateRefreshToken(User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        redisUtil.set(subject, refreshToken, jwtTokenizer.getRefreshTokenExpirationMinutes());
        return refreshToken;
    }
}
