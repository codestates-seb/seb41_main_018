package com.seb41_main_018.mainproject.heart.controller;

import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.service.HeartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/hearts")
@AllArgsConstructor
public class HeartController {
    private final HeartService heartService;

    @PostMapping("/contents/{contentId}/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public HeartDto.Response heart(
            @PathVariable("userId") Long userId,
            @PathVariable("contentId") Long contentId){
        return heartService.saveHeart(contentId,userId);
    }
}
