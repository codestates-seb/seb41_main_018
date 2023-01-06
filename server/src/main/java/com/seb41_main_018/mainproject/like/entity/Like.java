package com.seb41_main_018.mainproject.like.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
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
@Table(name = "Like_Table")
@Entity
public class Like extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content content;

    @Column(nullable = false)
    private int like_count;
}