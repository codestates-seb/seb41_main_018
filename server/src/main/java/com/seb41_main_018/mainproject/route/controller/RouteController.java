package com.seb41_main_018.mainproject.route.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/routes")
@Validated
public class RouteController {
    @PostMapping //루트 생성
    public ResponseEntity postRoute(){
        return null;
    }
    @PatchMapping("/{routeId}") //루트 수정
    public ResponseEntity patchRoute(@PathVariable("routeId") @Positive Long routeId
    ){
        return null;
    }

    @GetMapping("/{routeId}") //루트 조회
    public ResponseEntity getRoute(@PathVariable("routeId") @Positive Long routeId) {
        return null;
    }

    @DeleteMapping("/{routeId}")//루트 삭제
    public ResponseEntity deleteUser(@PathVariable("routeId") @Positive Long routeId){
        return null;
    }
}
