package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.constant.ThemeType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import java.util.List;

@ApiModel("ThemeType Response")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ThemeTypeResponse {
    @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
    private ThemeType themeType;
    @ApiModelProperty(notes = "카테고리에 따른 컨텐츠들", example = "기가 막힌 서울여행,서울에서 놀자!", required = true)
    private List<ThemeTypeResponseDto> contents;
}