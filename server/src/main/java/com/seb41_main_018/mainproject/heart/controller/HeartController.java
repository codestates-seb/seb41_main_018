package com.seb41_main_018.mainproject.heart.controller;

import com.seb41_main_018.mainproject.constant.HeartType;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.heart.mapper.HeartMapper;
import com.seb41_main_018.mainproject.heart.service.HeartService;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
@ApiOperation(value = "좋아요 API", tags = {"Heart Controller"})
@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class HeartController {
    private final HeartMapper heartMapper;
    private final HeartService heartService;
    private final UserService userService;
    private final ContentService contentService;

    // 좋아요 등록 //
    @ApiOperation(value = "좋아요 등록", notes = "좋아요를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Comment not found")})
    @PostMapping("/{userId}/{contentId}/hearts")
    public ResponseEntity postHeart(
            @PathVariable("userId") @Positive Long userId,
            @PathVariable("contentId") @Positive Long contentId) {
        User user = userService.findUser(userId);
        Content content = contentService.findContent(contentId);
        Heart heart = heartService.createHeart(user,content);
        HeartDto.Response response = heartMapper.heartToHeartResponseDto(heart);

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

}
