package com.seb41_main_018.mainproject.content.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.like.Like;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.user.entity.User;
import jdk.jfr.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Table
@EntityListeners(AuditingEntityListener.class)
@Entity
public class Content extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @Column(nullable = false, unique = true)
    private String title;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false, unique = true)
    private Long viewCount;


    // 연관 관계
    @ManyToOne(optional = true, fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    private User user;

    @ManyToOne
    private Category category;
    @OneToMany
    private Like like;

    @OneToMany
    private Tag tag;

    @OneToMany
    private Comment comment;

    @OneToMany
    private Route route;

}
