package com.seb41_main_018.mainproject.heart.dto;

import com.seb41_main_018.mainproject.constant.HeartType;
import lombok.*;

import javax.validation.constraints.NotBlank;

public class HeartDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch {
        @NotBlank
        private Long contentId;
        @NotBlank
        private String heartType;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    static public class Response {
        private Long heartId;

        private Long contentId;
        private Long userId;
        private String heartType;
    }
}
