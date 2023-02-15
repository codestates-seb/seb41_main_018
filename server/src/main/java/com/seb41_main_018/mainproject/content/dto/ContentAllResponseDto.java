package com.seb41_main_018.mainproject.content.dto;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.route.dto.RouteResponseDto;
import com.seb41_main_018.mainproject.tag.dto.TagResponseDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@ApiModel("Content AllResponse")
@AllArgsConstructor
@Getter
@Builder
public class ContentAllResponseDto {

    @ApiModelProperty(notes = "컨텐츠 작성 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime createdAt;

    @ApiModelProperty(notes = "컨텐츠 수정 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime modifiedAt;
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private Long contentId;
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private Long userId;
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    @NotBlank(message = "게시글 제목을 입력해야합니다.")
    private String title;


    @ApiModelProperty(notes = "컨텐트 카테고리", example = "DOMESTIC", required = true)
    @NotBlank(message = "게시글 내용을 입력해야합니다.")
    private ThemeType themeType;

    @ApiModelProperty(notes = "좋아요 수", example = "1", required = true)
    private int heartCount;
    @ApiModelProperty(notes = "조회 수", example = "1", required = true)
    private int viewCount;

    @ApiModelProperty(notes = "태그들", example = "내돈내산", required = true)
    private String tag;

    @ApiModelProperty(notes = "총 여행 비용", example = "120000", required = true)
    private int amount;
    @ApiModelProperty(notes = "여행 날짜", example = "2023.01.20", required = true)
    private String travelDate;

    @ApiModelProperty(notes = "작성자 닉네임", example = "강멋쟁이", required = true)
    private String nickName;

    @ApiModelProperty(notes = "작성자 프로필 사진", example = "셀카.png", required = true)
    private String image;

    @ApiModelProperty(notes = "후기들", example = "저도 너무 좋았어요!", required = true)
    private List<CommentDto.Response> comments;

    @ApiModelProperty(notes = "태그들", example = "내돈내산", required = true)
    private List<TagResponseDto> tags;

    @ApiModelProperty(notes = "상세 루트들", example = "창경궁", required = true)
    private List<RouteResponseDto> routes;
}