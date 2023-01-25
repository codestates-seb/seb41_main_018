package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.route.dto.RoutePostDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@ApiModel("Content Post")
@Getter
public class ContentPostDto {
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    @NotBlank(message = "게시글 제목을 입력해야합니다.")
    private String title;
    @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
    @NotBlank
    private String travelDate;


    @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
    @NotNull
    private ThemeType themeType;

    @ApiModelProperty(notes = "상세 루트들", example = "창경궁", required = true)
    @NotNull
    private List<RoutePostDto> routes;
}
