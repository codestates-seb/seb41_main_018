package com.seb41_main_018.mainproject.user.dto;

import com.seb41_main_018.mainproject.constant.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@Setter
public class UserPatchDto {
    private Long userId;
    private String email;
    @NotBlank
    private String password;

    @NotBlank
    private String nickname;
    private Boolean email_subscribe;
    private UserStatus userStatus;
}
