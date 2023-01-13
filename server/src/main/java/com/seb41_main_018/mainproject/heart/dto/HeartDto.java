package com.seb41_main_018.mainproject.heart.dto;

import com.seb41_main_018.mainproject.constant.HeartType;
import lombok.*;

public class HeartDto {
    @NoArgsConstructor
    @Getter
    @Setter
    static public class Response {
        private Long heartId;
        private Long userId;
        private Long contentId;
        private HeartType heartType;
    }
}
