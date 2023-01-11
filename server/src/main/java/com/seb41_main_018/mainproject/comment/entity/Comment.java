package com.seb41_main_018.mainproject.comment.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;




    @Column(nullable = false)
    private String body;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "CONTENT_ID")
    private Content content;

    //Comment와 연관관계를 맺을 대상인 User 객체
    public void setUser(User user) {
        this.user = user;
        if (!this.user.getComments().contains(this)) {
            this.user.getComments().add(this);
        }
    }

    //Comment와 연관관계를 맺을 대상인 Post 객체
    public void setContent(Content content) {
        this.content = content;
        if (!this.content.getComments().contains(this)) {
            this.content.getComments().add(this);
        }
    }
}