package com.seb41_main_018.mainproject.user.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String ninkname;
    @Column(columnDefinition = "TEXT")
    private Boolean email_subscribe;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private loginStatus loginstatus = loginStatus.USER_ACTIVE;

    public enum loginStatus {

        USER_ACTIVE("Active account"),
        USER_INACTIVE("Inactive account"),
        USER_QUIT("Deleted account");

        @Getter
        private final String loginStatus;

        loginStatus(String loginStatus) {
            this.loginStatus = loginStatus;
        }
    }


}
