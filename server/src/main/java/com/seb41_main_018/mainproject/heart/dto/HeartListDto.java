package com.seb41_main_018.mainproject.heart.dto;

import com.seb41_main_018.mainproject.constant.HeartType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@ApiModel("Heart List")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class HeartListDto {
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    private String title;
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "좋아요 상태", example = "ADD", required = true)
    private HeartType heartType;
    @ApiModelProperty(notes = "컨텐츠 작성 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime createdAt;

    @ApiModelProperty(notes = "컨텐츠 수정 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime modifiedAt;
}
