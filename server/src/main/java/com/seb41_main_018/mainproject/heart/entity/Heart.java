package com.seb41_main_018.mainproject.heart.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.constant.HeartType;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Heart extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private HeartType heartType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content content;

    public Heart(User user, Content content) {
        this.user = user;
        this.content = content;
    }

    public void addUser(User user) {
        this.user = user;
        user.addHeart(this);
    }

    public void addContent(Content content) {
        this.content = content;
        content.addHeart(this);
    }
}