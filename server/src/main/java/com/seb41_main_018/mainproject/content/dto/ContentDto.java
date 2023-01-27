package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.route.dto.RouteResponseDto;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.constant.ThemeType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class ContentDto {
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
        @ApiModelProperty(notes = "컨텐츠 작성 날짜와 시간", example = "2023.01.20", required = true)
        private LocalDateTime createdAt;

        @ApiModelProperty(notes = "컨텐츠 수정 날짜와 시간", example = "2023.01.20", required = true)
        private LocalDateTime modifiedAt;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
        private Long userId;
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;


        @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private ThemeType themeType;

        @ApiModelProperty(notes = "좋아요 수", example = "1", required = true)
        private int heartCount;
        @ApiModelProperty(notes = "조회 수", example = "1", required = true)
        private int viewCount;

        @ApiModelProperty(notes = "총 여행 비용", example = "120000", required = true)
        private int amount;
        @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
        private String travelDate;

        @ApiModelProperty(notes = "작성자 닉네임", example = "강멋쟁이", required = true)
        private String nickName;

        @ApiModelProperty(notes = "상세 루트들", example = "창경궁", required = true)
        private List<RouteResponseDto> routes;
    }
    @ApiModel("UserContent Response")
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class UserContentResponseDto{
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;

        @ApiModelProperty(notes = "컨텐츠 작성 날짜와 시간", example = "2023.01.20", required = true)
        private LocalDateTime createdAt;

        @ApiModelProperty(notes = "컨텐츠 수정 날짜와 시간", example = "2023.01.20", required = true)
        private LocalDateTime modifiedAt;

    }
}