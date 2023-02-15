package com.seb41_main_018.mainproject.content.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "CONTENTS")
public class Content extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="CONTENT_ID")
    private Long contentId;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private int viewCount = 0;

    @Column(nullable = false)
    private int heartCount = 0;

    @Column(nullable = false)
    private  int amount = 0;

    @Column
    private String tag;

    @Column(nullable = false)
    private String travelDate;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private ThemeType themeType = ThemeType.BASIC;



    // 연관 관계 //
    @OrderBy("heartId")
    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Route> routes = new ArrayList<>();

    @OrderBy("tagId")
    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Tag> tags = new ArrayList<>();

    @ManyToOne(optional = true, fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "USER_ID")
    private User user;

    // 생성자 //

    // 연관관계 메소드 //
    public void addHeart(Heart heart) {
        hearts.add(heart);
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void addRoute(Route route) {
        routes.add(route);
    }

    public void addTag(Tag tag) {
        this.tags.add(tag);
        tag.addContent(this);
    }

}