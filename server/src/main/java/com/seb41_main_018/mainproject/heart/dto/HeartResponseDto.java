package com.seb41_main_018.mainproject.heart.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@ApiModel("Heart Response")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class HeartResponseDto {
    @ApiModelProperty(notes = "좋아요 아이디", example = "1", required = true)
    private Long heartId;
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private Long userId;
    @ApiModelProperty(notes = "좋아요 상태", example = "ADD", required = true)
    private String heartType;
}
