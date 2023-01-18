package com.seb41_main_018.mainproject.route.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class RouteDto {
    @ApiModel("Route Post")
    @AllArgsConstructor
    @Getter
    public static class RoutePost {
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "경로 이름", example = "서울", required = true)
        @NotBlank
        private String name;
    }

    @ApiModel("Route Patch")
    @AllArgsConstructor
    @Getter
    public static class RoutePatch {
        @ApiModelProperty(notes = "경로 아이디", example = "1", required = true)
        private Long routeId;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "경로 이름", example = "서울", required = true)
        @NotBlank
        private String name;
    }
    @ApiModel("Route Response")
    @AllArgsConstructor
    @Getter
    @Builder
    public static class RouteResponse {
        @ApiModelProperty(notes = "경로 아이디", example = "1", required = true)
        private Long routeId;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "경로 이름", example = "서울", required = true)
        private String name;
    }
}
