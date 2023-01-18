package com.seb41_main_018.mainproject.route.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class RouteDto {
    @AllArgsConstructor
    @Getter
    public static class RoutePost {
        @NotBlank
        private String name;
    }

    @AllArgsConstructor
    @Getter
    public static class RoutePatch {
        private Long routeId;
        @NotBlank
        private String name;
    }

    @AllArgsConstructor
    @Getter
    public static class RouteResponse {
        private Long routeId;
        private String name;
    }
}
