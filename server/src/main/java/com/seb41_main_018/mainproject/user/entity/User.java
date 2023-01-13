package com.seb41_main_018.mainproject.user.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.constant.LoginType;
import com.seb41_main_018.mainproject.constant.UserStatus;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Table(name = "USERS")
@Entity
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long userId;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String nickname;
    @Column(columnDefinition = "TEXT")
    private Boolean email_subscribe;

    @Column
    @Enumerated(value = EnumType.STRING)
    private UserStatus userStatus = UserStatus.ACTIVITY;

    @Column
    @Enumerated(value = EnumType.STRING)
    private LoginType loginType = LoginType.BASIC;

    //유저가 삭제되면, 작성 글과 좋아요도 삭제됨
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Content> contents = new ArrayList<>();

    //유저가 삭제되면, 좋아요가 삭제됨
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Heart> hearts = new ArrayList<>();

    //유저가 삭제되면, 댓글도 삭제됨
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    // 생성자 //
    public User(
            String email,
            String password,
            String nickname,
            Boolean email_subscribe
    ) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.email_subscribe = email_subscribe;
    }

}
