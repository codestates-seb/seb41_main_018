package com.seb41_main_018.mainproject.route.dto;


import com.seb41_main_018.mainproject.validator.NotSpace;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@ApiModel("Route Patch")
@AllArgsConstructor
@Getter
public class RoutePatchDto {
    @ApiModelProperty(notes = "컨텐츠아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "상세 경로 아이디", example = "1", required = true)
    private Long routeId;
    @ApiModelProperty(notes = "금액", example = "100,000", required = true)
    private Long price;
    @ApiModelProperty(notes = "교통 수단", example = "버스", required = true)
    @NotSpace(message = "내용을 채워주세요.")
    private String vehicle;

    @ApiModelProperty(notes = "장소명", example = "서울역", required = true)
    @NotSpace(message = "내용을 채워주세요.")
    private String place;
    @ApiModelProperty(notes = "상세 경로 내용", example = "비둘기가 너무 많아요", required = true)
    @NotSpace(message = "내용을 채워주세요.")
    private String body;
    @ApiModelProperty(notes = "경로의 x좌표", example = "126.99571824238", required = true)
    private String x;

    @ApiModelProperty(notes = "경로의 y좌표", example = "37.5428216732984", required = true)
    private String y;

}