package com.seb41_main_018.mainproject.comment.dto;

import com.seb41_main_018.mainproject.constant.RatingType;
import com.seb41_main_018.mainproject.validator.NotSpace;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@ApiModel("Comment Post")
@AllArgsConstructor
@Getter
public class CommentPostDto {
    @ApiModelProperty(notes = "컨텐트 아이디", example = "1", required = true)
    private long contentId;
    @ApiModelProperty(notes = "코멘트 내용", example = "너무 좋은 코스네요!", required = true)
    @NotSpace(message = "내용을 채워주세요.")
    private String body;
    @ApiModelProperty(notes = "별점", example = "FIVE", required = true)
    private RatingType ratingType;
}
