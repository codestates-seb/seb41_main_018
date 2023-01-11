package com.seb41_main_018.mainproject.route.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class RouteDto {
    @AllArgsConstructor
    @Getter
    public static class RoutePost {
        private Long contentId;
        @NotBlank
        private String name;
    }

    @AllArgsConstructor
    @Getter
    public static class RoutePatch {
        private Long routeId;
        private Long contentId;
        @NotBlank
        private String name;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class RouteResponse {
        private Long routeId;
        private Long contentId;
        private String name;
    }
}
