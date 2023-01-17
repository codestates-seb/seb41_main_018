package com.seb41_main_018.mainproject.comment.dto;

import com.seb41_main_018.mainproject.constant.RatingType;
import com.seb41_main_018.mainproject.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class CommentDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        //private long userId;
        private long contentId;
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
        private RatingType ratingType;

    }

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private long commentId;
        private long userId;
        private long contentId;
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
        private RatingType ratingType;
        public void setCommentId(long commentId) {
            this.commentId = commentId;
        }
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
            private long commentId;
            private long userId;
            private long contentId;
            private String body;
            private RatingType ratingType;
    }
}
