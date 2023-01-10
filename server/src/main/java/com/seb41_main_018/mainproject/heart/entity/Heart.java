package com.seb41_main_018.mainproject.heart.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "Like_Table")
@Entity
@Builder
public class Heart extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content content;

    private int heartCount;

//    @Column(nullable = false)
//    @Range(min = -1, max = 1)
//    private int heartStatus;
public Heart(User user, Content content) {
    this.user = user;
    this.content = content;
}
}