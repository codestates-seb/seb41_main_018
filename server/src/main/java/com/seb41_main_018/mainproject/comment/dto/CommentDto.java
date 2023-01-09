package com.seb41_main_018.mainproject.comment.dto;

import com.seb41_main_018.mainproject.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private long userId;
        private long contentId;
        @NotSpace(message = "내용을 채워주세요.")
        private String body;

    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long commentId;
        private long userId;
        private long contentId;
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
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


    }
}
