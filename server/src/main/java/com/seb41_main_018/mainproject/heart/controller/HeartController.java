package com.seb41_main_018.mainproject.heart.controller;

import com.seb41_main_018.mainproject.constant.HeartType;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.heart.mapper.HeartMapper;
import com.seb41_main_018.mainproject.heart.service.HeartService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RestController
@RequiredArgsConstructor
public class HeartController {
    private final HeartMapper heartMapper;
    private final HeartService heartService;

    // 좋아요 등록 //

    @PostMapping("/{contentId}/hearts")
    public ResponseEntity postHeart(
            @PathVariable Long contentId,
            @RequestBody HeartDto.Post requestBody) {

        String heartType = requestBody.getHeartType().toUpperCase();
        requestBody.setHeartType(heartType);

        Heart createHeart = heartService.createHeart(
                heartMapper.heartPostDtoToEntity(requestBody),
                contentId,
                requestBody.getContentId());

        return new ResponseEntity<>(heartMapper.heartToHeartResponseDto(createHeart),HttpStatus.CREATED);
    }

}
