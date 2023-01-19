package com.seb41_main_018.mainproject.tag.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.content.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
public class Tag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "CONTENT_ID")
    private Content content;

    // 생성자 //
    public Tag(String name) {
        this.name = name;
    }

    // 연관관계 메소드 //
    public void addContent(Content content) {
        this.content = content;
    }
}
