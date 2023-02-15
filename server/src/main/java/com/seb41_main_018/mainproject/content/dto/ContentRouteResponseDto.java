package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.validator.NotSpace;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@ApiModel("Content Route Response")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ContentRouteResponseDto{
    @ApiModelProperty(notes = "장소명", example = "서울역", required = true)
    @NotSpace(message = "내용을 채워주세요.")
    private String place;

}