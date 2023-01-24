package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.route.dto.RouteResponseDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel("Content Response")
@AllArgsConstructor
@Getter
@Builder
public class ContentResponseDto {
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private Long userId;
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    @NotBlank(message = "게시글 제목을 입력해야합니다.")
    private String title;
    @ApiModelProperty(notes = "컨텐트 내용", example = "너무 좋은 코스 추천합니당", required = true)
    @NotBlank(message = "게시글 내용을 입력해야합니다.")
    private String body;

    @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
    @NotBlank(message = "게시글 내용을 입력해야합니다.")
    private ThemeType themeType;

    @ApiModelProperty(notes = "좋아요 수", example = "1", required = true)
    private int heartCount;

    @ApiModelProperty(notes = "조회 수", example = "1", required = true)
    private int viewCount;

//    @ApiModelProperty(notes = "경로 이름", example = "서울", required = true)
//    private String routeName;

    @ApiModelProperty(notes = "총 여행 비용", example = "120000", required = true)
    private Long amount;
    @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
    private String travelDate;

    @ApiModelProperty(notes = "컨텐츠 작성 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime createdAt;

    @ApiModelProperty(notes = "컨텐츠 수정 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime modifiedAt;
    @ApiModelProperty(notes = "상세 루트들", example = "창경궁", required = true)
    private List<RouteResponseDto> routes;
}
