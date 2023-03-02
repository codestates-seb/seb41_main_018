package com.seb41_main_018.mainproject.comment.dto;

import com.seb41_main_018.mainproject.constant.RatingType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@ApiModel("Comment Response")
@AllArgsConstructor
@Getter
@Builder
public class UserCommentResponseDto {
    @ApiModelProperty(notes = "코멘트 아이디", example = "1", required = true)
    private long commentId;
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private long contentId;
    @ApiModelProperty(notes = "컨텐트 제목", example = "기가 막힌 서울여행", required = true)
    @NotBlank(message = "게시글 제목을 입력해야합니다.")
    private String title;
    @ApiModelProperty(notes = "코멘트 내용", example = "너무 좋은 코스네요!", required = true)
    private String body;
    @ApiModelProperty(notes = "별점", example = "FIVE", required = true)
    private RatingType ratingType;

    @ApiModelProperty(notes = "코멘트 작성 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime createdAt;

    @ApiModelProperty(notes = "코멘트 수정 날짜와 시간", example = "2023.01.20", required = true)
    private LocalDateTime modifiedAt;
}
