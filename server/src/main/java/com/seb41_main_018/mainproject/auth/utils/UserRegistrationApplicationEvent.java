package com.seb41_main_018.mainproject.auth.utils;

import com.seb41_main_018.mainproject.user.entity.User;
import lombok.Getter;

@Getter
public class UserRegistrationApplicationEvent {
    private User user;
    public UserRegistrationApplicationEvent(User user) {
        this.user = user;
    }
}