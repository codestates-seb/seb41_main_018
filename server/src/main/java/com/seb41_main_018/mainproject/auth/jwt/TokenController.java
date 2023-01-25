package com.seb41_main_018.mainproject.auth.jwt;

import com.seb41_main_018.mainproject.auth.utils.CustomAuthorityUtils;
import com.seb41_main_018.mainproject.auth.utils.RedisUtil;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/token")
@Validated
public class TokenController {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisUtil redisUtils;

    @PostMapping("/reissue")
    public ResponseEntity reissueToken(@RequestHeader("Refresh") @NotBlank String refreshToken,
                                       HttpServletResponse response) {

        String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        try {
            jwtTokenizer.verifySignature(refreshToken, encodeBase64SecretKey);
        } catch (SignatureException | MalformedJwtException | DecodingException e) {
            throw new BusinessLogicException(ExceptionCode.INVALID_VALUES);
        }

        //토큰 유효성 검증
        Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, encodeBase64SecretKey);

        Map<String, Object> map = new HashMap<>();
        String email = claims.getBody().getSubject();

        //redis에 refresh token 이 없으면 예외 처리
        if (redisUtils.get(email) == null) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        List<String> roles = authorityUtils.createRoles(email);
        map.put("username", email);
        map.put("roles", roles);

        //토큰 재발급
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String newAccessToken = jwtTokenizer.generateAccessToken(map, email, expiration, encodeBase64SecretKey);
        response.setHeader("Authorization", "Bearer " + newAccessToken);

        return new ResponseEntity<>(HttpStatus.OK);

    }
}
