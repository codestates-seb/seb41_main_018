package com.seb41_main_018.mainproject.heart.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.constant.HeartType;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Builder
public class Heart extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;
    @Column
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
        this.heartType = HeartType.REMOVE;
    }
}