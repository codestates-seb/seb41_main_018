package com.seb41_main_018.mainproject.routeplace.dto;

import com.seb41_main_018.mainproject.validator.NotSpace;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RoutePlaceDto {
    @ApiModel("RoutePlace Post")
    @AllArgsConstructor
    @Getter
    public static class Post {
        @ApiModelProperty(notes = "경로 아이디", example = "1", required = true)
        private Long routeId;
        @ApiModelProperty(notes = "금액", example = "100,000", required = true)
        private Long price;
        @ApiModelProperty(notes = "교통 수단", example = "버스", required = true)
        @NotSpace(message = "내용을 채워주세요.")
        private String vehicle;
        @ApiModelProperty(notes = "상세 경로 내용", example = "서울역", required = true)
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
    }
    @ApiModel("RoutePlace Patch")
    @AllArgsConstructor
    @Getter
    public static class Patch {
        @ApiModelProperty(notes = "경로 아이디", example = "1", required = true)
        private Long routeId;
        @ApiModelProperty(notes = "상세 경로 아이디", example = "1", required = true)
        private Long placeId;
        @ApiModelProperty(notes = "금액", example = "100,000", required = true)
        private Long price;
        @ApiModelProperty(notes = "교통 수단", example = "버스", required = true)
        @NotSpace(message = "내용을 채워주세요.")
        private String vehicle;
        @ApiModelProperty(notes = "상세 경로 내용", example = "서울역", required = true)
        @NotSpace(message = "내용을 채워주세요.")
        private String body;
    }

    @ApiModel("RoutePlace Response")
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        @ApiModelProperty(notes = "경로 아이디", example = "1", required = true)
        private Long routeId;
        @ApiModelProperty(notes = "상세 경로 아이디", example = "1", required = true)
        private Long placeId;
        @ApiModelProperty(notes = "금액", example = "100,000", required = true)
        private Long price;
        @ApiModelProperty(notes = "교통 수단", example = "버스", required = true)
        private String vehicle;
        @ApiModelProperty(notes = "상세 경로 내용", example = "서울역", required = true)
        private String body;
    }
}