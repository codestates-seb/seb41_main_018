package com.seb41_main_018.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class UserAllResponseDto {
    private Long userId;
    private String email;
    private String nickname;
    private String password;
    private Boolean email_subscribe;

    //private List<ContentResponseDto> contents;

    //private List<CommentResponseDto> comments;

    //private List<LikeResponseDto> likes;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}
