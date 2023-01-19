package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.constant.ThemeType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

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

        @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private ThemeType themeType;
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

        @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private ThemeType themeType;
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

        @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private ThemeType themeType;

        @ApiModelProperty(notes = "좋아요 수", example = "1", required = true)
        private int heartCount;

        @ApiModelProperty(notes = "조회 수", example = "1", required = true)
        private int viewCount;
    }
    @ApiModel("Content AllResponse")
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class ContentAllResponse {
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


        @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private ThemeType themeType;

        @ApiModelProperty(notes = "좋아요 수", example = "1", required = true)
        private int heartCount;
        @ApiModelProperty(notes = "조회 수", example = "1", required = true)
        private int viewCount;

        @ApiModelProperty(notes = "후기들", example = "저도 너무 좋았어요!", required = true)
        private List<CommentDto.Response> comments;

        @ApiModelProperty(notes = "태그들", example = "내돈내산", required = true)
        private List<TagDto.TagResponse> tags;
    }
    @ApiModel("ThemeType Response")
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class ThemeTypeResponse {
        @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
        private ThemeType themeType;
        @ApiModelProperty(notes = "카테고리에 따른 컨텐츠들", example = "기가 막힌 서울여행,서울에서 놀자!", required = true)
        private List<themeTypeResponseDto> contents;
    }
    @Builder
    @Getter
    @AllArgsConstructor
    public static class themeTypeResponseDto{
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        private String title;
    }
}
