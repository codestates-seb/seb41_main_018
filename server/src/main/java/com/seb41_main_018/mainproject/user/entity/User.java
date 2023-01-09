package com.seb41_main_018.mainproject.user.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.like.entity.Like;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
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

    /*
    //유저가 삭제되면, 작성 글과 좋아요도 삭제됨
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Content> questions = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Like> answers = new ArrayList<>();

     */

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
