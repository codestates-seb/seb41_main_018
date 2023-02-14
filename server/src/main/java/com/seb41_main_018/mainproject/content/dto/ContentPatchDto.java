package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.route.dto.RoutePostDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@ApiModel("Content Patch")
@AllArgsConstructor
@Getter
public class ContentPatchDto {
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private Long userId;
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    private String title;

    @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
    private String travelDate;

    @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
    private ThemeType themeType;
    @ApiModelProperty(notes = "태그들", example = "내돈내산", required = true)
    private String tag;

    @ApiModelProperty(notes = "상세 루트들", example = "창경궁", required = true)
    private List<RoutePostDto> routes;

    public void updateId(Long id){
        this.contentId = id;
    }

}