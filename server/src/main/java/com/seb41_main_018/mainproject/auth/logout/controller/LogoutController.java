package com.seb41_main_018.mainproject.auth.logout.controller;

import com.seb41_main_018.mainproject.auth.jwt.JwtTokenizer;
import com.seb41_main_018.mainproject.auth.utils.RedisUtil;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class LogoutController {
    private final JwtTokenizer jwtTokenizer;
    private final RedisUtil redisUtil;
    private final UserService userService;

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") @NotBlank String token){
        User user = userService.getLoginMember();

        String accessToken = token.replace("Bearer ", "");
//        String key = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        log.info("access 토큰 남은 유효시간 : " + jwtTokenizer.getExpiration(accessToken, encodeBase64SecretKey));

        try{
            redisUtil.setBlackList(accessToken, "access_token", jwtTokenizer.getBlacklistTime(jwtTokenizer.getExpiration(accessToken, encodeBase64SecretKey)));
        } catch (NullPointerException e) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_LOGIN);
        }

        // refresh token 삭제
        if (redisUtil.hasKey(user.getEmail())) {
            redisUtil.delete(user.getEmail());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
