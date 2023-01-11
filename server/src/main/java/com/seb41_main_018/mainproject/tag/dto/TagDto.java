package com.seb41_main_018.mainproject.tag.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

public class TagDto {
    @AllArgsConstructor
    @Getter
    public static class TagPost {
        private Long contentId;
        @NotBlank(message = "태그명을 입력해야합니다.")
        private String name;
    }

    @AllArgsConstructor
    @Getter
    public static class TagPatch {
        private Long tagId;
        private Long contentId;
        @NotBlank(message = "태그명을 입력해야합니다.")
        private String name;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class TagResponse {
        private Long tagId;
        private Long contentId;
        private String name;
    }
}
