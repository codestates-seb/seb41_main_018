package com.seb41_main_018.mainproject.content.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

public class ContentDto {
    @AllArgsConstructor
    @Getter
    public static class ContentPost {
        private Long userId;
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private String body;
    }

    @AllArgsConstructor
    @Getter
    public static class ContentPatch {
        private Long contentId;
        private Long userId;
        @NotBlank(message = "게시글 제목을 입력해야합니다.")
        private String title;
        @NotBlank(message = "게시글 내용을 입력해야합니다.")
        private String body;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class ContentResponse {
        private Long contentId;
        private Long userId;
        private String title;
        private String body;
    }
}
