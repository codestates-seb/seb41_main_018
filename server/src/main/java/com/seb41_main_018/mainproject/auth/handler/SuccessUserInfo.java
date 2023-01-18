package com.seb41_main_018.mainproject.auth.handler;

import com.seb41_main_018.mainproject.constant.UserStatus;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SuccessUserInfo {
    private int httpStatus;
    private long memberId;
    private String email;
    private String nickname;
    private Boolean email_subscribe;
    private UserStatus userStatus;
}
