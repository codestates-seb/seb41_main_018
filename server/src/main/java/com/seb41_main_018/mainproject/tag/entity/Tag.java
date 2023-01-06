package com.seb41_main_018.mainproject.tag.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Table
@Entity
public class Tag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(nullable = false)
    private Long tagId;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    private Post post;
}
