package com.seb41_main_018.mainproject.route.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.util.List;

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
        @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
        @NotBlank
        private String date;
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
        @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
        @NotBlank
        private String date;
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

        @ApiModelProperty(notes = "경로에 따른 상세 장소", example = "창경궁", required = true)
        private List<RoutePlaceResponseDto> routePlaces;

        @ApiModelProperty(notes = "총 여행 비용", example = "120000", required = true)
        private Long totalPrice;
        @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
        private String date;

    }
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoutePlaceResponseDto {
        @ApiModelProperty(notes = "상세 경로 아이디", example = "1", required = true)
        private Long placeId;
        @ApiModelProperty(notes = "금액", example = "100,000", required = true)
        private Long price;
        @ApiModelProperty(notes = "교통 수단", example = "버스", required = true)
        private String vehicle;
        @ApiModelProperty(notes = "상세 경로 내용", example = "서울역", required = true)
        private String body;

        @ApiModelProperty(notes = "경로의 x좌표", example = "126.99571824238", required = true)
        private String x;

        @ApiModelProperty(notes = "경로의 y좌표", example = "37.5428216732984", required = true)
        private String y;
    }
}
