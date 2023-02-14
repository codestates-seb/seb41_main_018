package com.seb41_main_018.mainproject.user.dto;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@ApiModel("User All Response")
@Builder
@Getter
@AllArgsConstructor
public class UserAllResponseDto {
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private Long userId;
    @ApiModelProperty(notes = "유저 이메일", example = "ghd@gmail.com", required = true)
    private String email;
    @ApiModelProperty(notes = "유저 닉네임", example = "강하렴", required = true)
    private String nickname;
    @ApiModelProperty(notes = "유저 비밀번호", example = "1234", required = true)
    private String password;
    @ApiModelProperty(notes = "유저 전화번호", example = "010-1111-1111", required = true)
    private String phone;

    @ApiModelProperty(notes = "유저 프로필 이미지", example = "셀카.png", required = true)
    private String image;

    @ApiModelProperty(notes = "유저가 작성한 컨텐츠들", example = "서울 여행 컨텐츠, 부산 여행 컨텐츠", required = true)
    private List<ContentDto.UserContentResponseDto> contents;

    @ApiModelProperty(notes = "유저가 작성한 후기들", example = "짱좋아요, 좀 별로임", required = true)
    private List<CommentDto.UserCommentResponse> comments;

    @ApiModelProperty(notes = "유저가 좋아요한 컨텐츠들", example = "서울 여행 컨텐츠(좋아요)", required = true)
    private List<HeartDto.UserHeartResponse> hearts;
    @ApiModelProperty(notes = "가입한 날짜와 시간", example = "2023-01-22T03:18:40.365773", required = true)
    private LocalDateTime createdAt;
    @ApiModelProperty(notes = "유저 정보 수정한 날짜와 시간", example = "2023-01-22T03:18:40.365773", required = true)
    private LocalDateTime modifiedAt;

}
