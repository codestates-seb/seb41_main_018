package com.seb41_main_018.mainproject.tag.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@ApiModel("Tag Response")
@AllArgsConstructor
@Getter
@Builder
public class TagResponseDto {
    @ApiModelProperty(notes = "테그 아이디", example = "1", required = true)
    private Long tagId;
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "테그 이름", example = "제주 여행", required = true)
    private String name;
}
