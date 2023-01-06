package com.seb41_main_018.mainproject.comment.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "post_id")
    private Long postId;

    @Column(nullable = false)
    @Size(min = 30)
    private String body;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    //Comment와 연관관계를 맺을 대상인 User 객체
    public void setUser(User user) {
        this.user = user;
        if (!this.user.getComments().contains(this)) {
            this.user.getComments().add(this);
        }
    }

    //Comment와 연관관계를 맺을 대상인 Post 객체
    public void setPost(Post post) {
        this.post = post;
        if (!this.post.getComments().contains(this)) {
            this.post.getComments().add(this);
        }
    }
}
