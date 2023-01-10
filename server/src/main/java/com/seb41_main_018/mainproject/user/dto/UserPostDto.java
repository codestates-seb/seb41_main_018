package com.seb41_main_018.mainproject.user.dto;

import com.seb41_main_018.mainproject.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class UserPostDto {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;

    @NotBlank
    private String nickname;
    @NotBlank
    private Boolean email_subscribe;
}