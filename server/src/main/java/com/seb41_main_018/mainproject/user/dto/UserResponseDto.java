package com.seb41_main_018.mainproject.user.dto;

import com.seb41_main_018.mainproject.constant.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class UserResponseDto {
    private Long userId;
    private String email;
    private String nickname;
    private String password;
    private String phone;
    private Boolean email_subscribe;
    private UserStatus userStatus;
}