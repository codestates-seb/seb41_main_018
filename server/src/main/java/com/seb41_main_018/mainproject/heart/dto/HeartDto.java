package com.seb41_main_018.mainproject.heart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

public class HeartDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    static public class Response {
        private Long heartId;
        private Long userId;
        private Long contentId;
        private int heartCount;
    }
}
