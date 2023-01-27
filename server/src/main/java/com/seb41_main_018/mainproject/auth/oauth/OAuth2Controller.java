package com.seb41_main_018.mainproject.auth.oauth;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class OAuth2Controller {

    @GetMapping("/loading")
    public ResponseEntity loginError(@RequestParam String refreshToken) {
        //이미 다른 방식으로 회원가입된 경우 예외
        if (refreshToken.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
