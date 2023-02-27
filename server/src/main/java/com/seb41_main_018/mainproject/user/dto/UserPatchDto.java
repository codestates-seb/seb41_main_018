package com.seb41_main_018.mainproject.user.dto;

import com.seb41_main_018.mainproject.constant.UserStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@ApiModel("User Patch")
@Getter
@AllArgsConstructor
@Setter
public class UserPatchDto {
    @ApiModelProperty(notes = "유저 아이디", example = "1", required = true)
    private Long userId;
    @ApiModelProperty(notes = "유저 이메일", example = "ghd@gmail.com", required = true)
    @Email
    @Pattern(regexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
            message = "정확한 이메일을 입력해 주세요.")
    private String email;
    @ApiModelProperty(notes = "유저 닉네임", example = "강하렴", required = true)
    private String nickname;
    @ApiModelProperty(notes = "유저 비밀번호", example = "1234", required = true)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "비밀번호는 최소 8자리 최소 하나의 문자 및 하나의 숫자로 이루어 져야 합니다.")
    private String password;
    @ApiModelProperty(notes = "유저 전화번호", example = "010-1111-1111", required = true)
    @Pattern(regexp = "\\d{11}",message = "휴대폰 번호는 - 를 제외한 11자리 숫자를 입력해 주세요")
    private String phone;
    @ApiModelProperty(notes = "유저 상태", example = "ACTIVITY", required = true)
    private UserStatus userStatus;

    @ApiModelProperty(notes = "유저 프로필 이미지", example = "셀카.png", required = true)
    private String image;
}
