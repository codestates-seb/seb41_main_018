package com.seb41_main_018.mainproject.content.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

public class ContentDto {
    @ApiModel("Content Post")
    @AllArgsConstructor
    @Getter
    public static class ContentPost {
        //private Long userId;
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;
        @ApiModelProperty(notes = "컨텐트 내용", example = "너무 좋은 코스 추천합니당", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private String body;
    }

    @ApiModel("Content Patch")
    @AllArgsConstructor
    @Getter
    @Setter
    public static class ContentPatch {
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
        private Long userId;
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;
        @ApiModelProperty(notes = "컨텐트 내용", example = "너무 좋은 코스 추천합니당", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private String body;
    }

    @ApiModel("Content Response")
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class ContentResponse {
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
        private Long userId;
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;
        @ApiModelProperty(notes = "컨텐트 내용", example = "너무 좋은 코스 추천합니당", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private String body;

        @ApiModelProperty(notes = "좋아요 수", example = "1", required = true)
        private int heartCount;
    }
}
