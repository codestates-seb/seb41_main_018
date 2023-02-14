package com.seb41_main_018.mainproject.auth.logout.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LogoutDto {
    @NotBlank
    private String accessToken;
    private String refreshToken;
}
