package com.seb41_main_018.mainproject.routeplace.dto;

import com.seb41_main_018.mainproject.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RoutePlaceDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        private Long routeId;
        private Long price;
        @NotSpace(message = "내용을 채워주세요.")
        private String vehicle;
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private Long routeId;
        private Long placeId;
        private Long price;
        @NotSpace(message = "내용을 채워주세요.")
        private String vehicle;
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private Long routeId;
        private Long placeId;
        private Long price;
        private String vehicle;
        private String body;
    }
}