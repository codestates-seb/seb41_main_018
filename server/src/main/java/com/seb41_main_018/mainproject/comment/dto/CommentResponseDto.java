package com.seb41_main_018.mainproject.comment.dto;

import com.seb41_main_018.mainproject.constant.RatingType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Builder;
import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

@ApiModel("Comment Response")
@AllArgsConstructor
@Getter
@Builder
public class CommentResponseDto {
    @ApiModelProperty(notes = "코멘트 아이디", example = "1", required = true)
    private long commentId;
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private long userId;
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private long contentId;
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    @NotBlank(message = "게시글 제목을 입력해야합니다.")
    private String title;
    @ApiModelProperty(notes = "코멘트 내용", example = "너무 좋은 코스네요!", required = true)
    private String body;
    @ApiModelProperty(notes = "별점", example = "FIVE", required = true)
    private RatingType ratingType;

    @ApiModelProperty(notes = "유저닉네임", example = "원할머니멱살", required = true)
    private String nickName;

    @ApiModelProperty(notes = "코멘트 작성 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime createdAt;

    @ApiModelProperty(notes = "코멘트 수정 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime modifiedAt;

    @ApiModelProperty(notes = "코멘트 작성자 프로필 사진", example = "셀카.png", required = true)
    private String image;
}