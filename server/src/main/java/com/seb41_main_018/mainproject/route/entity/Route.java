package com.seb41_main_018.mainproject.route.entity;

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
@Table(name = "Route_Table")
@Entity
public class Route extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Content content;

    @Column(nullable = false)
    private String body;
}
