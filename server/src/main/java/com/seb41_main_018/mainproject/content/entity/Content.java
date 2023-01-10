package com.seb41_main_018.mainproject.content.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.category.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
public class Content extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private Long viewCount;


    // 연관 관계 //
    @ToString.Exclude
    @OrderBy("heartId")
    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Heart> hearts = new ArrayList<>();

    @ToString.Exclude
    @OrderBy("commentId")
    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ToString.Exclude
    @OrderBy("routeId")
    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Route> routes = new ArrayList<>();

    @ToString.Exclude
    @OrderBy("tagId")
    @OneToMany(mappedBy = "content", cascade = CascadeType.REMOVE)
    private List<Tag> tags = new ArrayList<>();

    @ManyToOne(optional = true, fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    // 생성자 //
    public Content(String title, String body) {
        this.title = title;
        this.body = body;
    }

    // 연관관계 메소드 //
    public void addLike(Like like) {
        likes.add(like);
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
