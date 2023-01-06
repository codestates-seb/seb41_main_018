package com.seb41_main_018.mainproject.audit;

import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {

    @CreatedDate //데이터 생성 날짜 자동 저장 어노테이션
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    @LastModifiedDate // 데이터 수정 날짜 자동 저장 어노테이션
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt;


    @CreatedBy // 데이터 생성자 자동 저장 어노테이션
    @Column(updatable = false)
    private String createdBy;


    @LastModifiedBy // 데이터 수정자 자동 저장 어노테이션
    private String modifiedBy;
}
