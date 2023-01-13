package com.seb41_main_018.mainproject.heart.controller;

import com.seb41_main_018.mainproject.constant.HeartType;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
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
    private final HeartService heartService;

    // 좋아요 등록 //

/*    @PostMapping("/contents/hearts")
    public ResponseEntity postHeart(@RequestBody HeartDto.Response requestbody) {
        HeartType heartType = requestbody.getHeartType();
        requestbody.setHeartType(HeartType.ADD);

        HeartDto.Response response = heartService.saveHeart(

                requestbody.getUserId());

        return new ResponseEntity<>((response, heartType), HttpStatus.OK);
    }*/

}
