package com.seb41_main_018.mainproject.user.dto;

import com.seb41_main_018.mainproject.constant.UserStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
@ApiModel("User Patch")
@Getter
@AllArgsConstructor
@Setter
public class UserPatchDto {
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private Long userId;
    @ApiModelProperty(notes = "유저 이메일", example = "ghd@gmail.com", required = true)
    @NotBlank
    @Email
    private String email;
    @ApiModelProperty(notes = "유저 닉네임", example = "강하렴", required = true)
    @NotBlank
    private String nickname;
    @ApiModelProperty(notes = "유저 비밀번호", example = "1234", required = true)
    @NotBlank
    private String password;
    @ApiModelProperty(notes = "유저 전화번호", example = "010-1111-1111", required = true)
    @NotBlank
    private String phone;
    @ApiModelProperty(notes = "이메일 구독여부", example = "true", required = true)
    private Boolean email_subscribe;
    @ApiModelProperty(notes = "유저 상태", example = "ACTIVITY", required = true)
    private UserStatus userStatus;
}
