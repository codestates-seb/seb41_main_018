package com.seb41_main_018.mainproject.heart.dto;

import com.seb41_main_018.mainproject.constant.HeartType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

public class HeartDto {
    @ApiModel("Heart Patch")
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch {
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        @NotBlank
        private Long contentId;
        @ApiModelProperty(notes = "좋아요 상태", example = "ADD", required = true)
        @NotBlank
        private String heartType;
    }

    @ApiModel("Heart Response")
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    static public class Response {
        @ApiModelProperty(notes = "좋아요 아이디", example = "1", required = true)
        private Long heartId;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
        private Long userId;
        @ApiModelProperty(notes = "좋아요 상태", example = "ADD", required = true)
        private String heartType;
    }
    @ApiModel("Heart Response")
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    static public class UserHeartResponse {
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        private String title;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "좋아요 상태", example = "ADD", required = true)
        private HeartType heartType;
    }
}
