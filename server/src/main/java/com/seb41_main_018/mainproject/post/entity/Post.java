package com.seb41_main_018.mainproject.post.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import jdk.jfr.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Table(indexes = {
        @Index(columnList = "createAt"),
        @Index(columnList = "updateAt")
}, name = "USERS")
@EntityListeners(AuditingEntityListener.class)
@Entity
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

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
    private PostTag postTag;

    @OneToMany
    private Comment comment;

    @OneToMany
    private Route route;

}
