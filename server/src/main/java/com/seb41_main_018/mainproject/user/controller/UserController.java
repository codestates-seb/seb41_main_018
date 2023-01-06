package com.seb41_main_018.mainproject.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {
    @PostMapping //유저 생성,@Valid @RequestBody UserPatchDto questionPatchDto 추가하기
    public ResponseEntity postUser(){
        return null;
    }
    @PatchMapping("/{userId}") //유저 정보 수정 ,@Valid @RequestBody UserPatchDto questionPatchDto 추가하기
    public ResponseEntity patchUser(@PathVariable("userId") @Positive Long userId
                                        ){
        return null;
    }

    @GetMapping("/{userId}/Info") //유저 정보 조회
    public ResponseEntity getUser(@PathVariable("userId") @Positive Long userId) {
        return null;
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") @Positive Long userId){
        return null;
    }

}
