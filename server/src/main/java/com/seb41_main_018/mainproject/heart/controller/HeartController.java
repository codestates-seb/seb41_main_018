package com.seb41_main_018.mainproject.heart.controller;

import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.service.HeartService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/hearts")
public class HeartController {
    private final HeartService heartService;

    // 좋아요 등록 //
    @PostMapping("/contents/{contentId}/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public HeartDto.Response heart(
            @PathVariable("userId") Long userId,
            @PathVariable("contentId") Long contentId){
        return heartService.saveHeart(contentId,userId);
    }
}
