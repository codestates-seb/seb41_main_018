package com.seb41_main_018.mainproject.tag.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@ApiModel("Tag Post")
@AllArgsConstructor
@Getter
public class TagPostDto {
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "테그 이름", example = "제주 여행", required = true)
    @NotBlank(message = "태그명을 입력해야합니다.")
    private String name;
}
