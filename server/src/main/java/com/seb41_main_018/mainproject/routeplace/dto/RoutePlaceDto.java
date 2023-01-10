package com.seb41_main_018.mainproject.routeplace.dto;

import com.seb41_main_018.mainproject.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RoutePlaceDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotSpace(message = "내용을 채워주세요.")
        private Long price;

        @NotSpace(message = "내용을 채워주세요.")
        private String vehicle;

        @NotSpace(message = "내용을 채워주세요.")
        private String body;
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private long placeId;

        @NotSpace(message = "내용을 채워주세요.")
        private Long price;

        @NotSpace(message = "내용을 채워주세요.")
        private String vehicle;

        @NotSpace(message = "내용을 채워주세요.")
        private String body;

        public void setPlaceId(long placeId) {
            this.placeId = placeId;
        }
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long placeId;
        private Long price;
        private String vehicle;
        private String body;
    }
}