package com.seb41_main_018.mainproject.heart.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@ApiModel("Heart Patch")
@AllArgsConstructor
@Getter
@Setter
public class HeartPatchDto {
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    @NotBlank
    private Long contentId;
    @ApiModelProperty(notes = "좋아요 상태", example = "ADD", required = true)
    @NotBlank
    private String heartType;
}
