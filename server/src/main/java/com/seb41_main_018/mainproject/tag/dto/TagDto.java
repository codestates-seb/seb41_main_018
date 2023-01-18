package com.seb41_main_018.mainproject.tag.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

public class TagDto {
    @ApiModel("Tag Post")
    @AllArgsConstructor
    @Getter
    public static class TagPost {
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "테그 이름", example = "제주 여행", required = true)
        @NotBlank(message = "태그명을 입력해야합니다.")
        private String name;
    }

    @ApiModel("Tag Patch")
    @AllArgsConstructor
    @Getter
    public static class TagPatch {
        @ApiModelProperty(notes = "테그 아이디", example = "1", required = true)
        private Long tagId;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "테그 이름", example = "제주 여행", required = true)
        @NotBlank(message = "태그명을 입력해야합니다.")
        private String name;
    }
    
    @ApiModel("Tag Response")
    @AllArgsConstructor
    @Getter
    @Builder
    public static class TagResponse {
        @ApiModelProperty(notes = "테그 아이디", example = "1", required = true)
        private Long tagId;
        @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
        private Long contentId;
        @ApiModelProperty(notes = "테그 이름", example = "제주 여행", required = true)
        private String name;
    }
}
