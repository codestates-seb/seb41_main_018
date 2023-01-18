package com.seb41_main_018.mainproject.comment.dto;

import com.seb41_main_018.mainproject.constant.RatingType;
import com.seb41_main_018.mainproject.validator.NotSpace;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class CommentDto {
    @ApiModel("Comment Post")
    @AllArgsConstructor
    @Getter
    public static class Post {
        //private long userId;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private long contentId;
        @ApiModelProperty(notes = "코멘트 내용", example = "너무 좋은 코스네요!", required = true)
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
        @ApiModelProperty(notes = "별점", example = "FIVE", required = true)
        private RatingType ratingType;

    }
    @ApiModel("Comment Patch")
    @AllArgsConstructor
    @Getter
    public static class Patch {
        @ApiModelProperty(notes = "코멘트 아이디", example = "1", required = true)
        private long commentId;
        @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
        private long userId;
        @ApiModelProperty(notes = "컨텐츠 아이디", example = "1", required = true)
        private long contentId;
        @ApiModelProperty(notes = "코멘트 내용", example = "너무 좋은 코스네요!", required = true)
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
        @ApiModelProperty(notes = "별점", example = "FIVE", required = true)
        private RatingType ratingType;
        public void setCommentId(long commentId) {
            this.commentId = commentId;
        }
    }
    @ApiModel("Comment Response")
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        @ApiModelProperty(notes = "코멘트 아이디", example = "1", required = true)
        private long commentId;
        @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
        private long userId;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private long contentId;
        @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;
        @ApiModelProperty(notes = "코멘트 내용", example = "너무 좋은 코스네요!", required = true)
        private String body;
        @ApiModelProperty(notes = "별점", example = "FIVE", required = true)
        private RatingType ratingType;
    }
}
