package com.seb41_main_018.mainproject.route.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import com.seb41_main_018.mainproject.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private Long totalPrice=0L;

    @OrderBy("placeId")
    @OneToMany(mappedBy = "route",cascade = CascadeType.REMOVE)
    private List<RoutePlace> routePlaces = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONTENT_ID")
    private Content content;

    // 생성자 //

    public Route(Long routeId, String name) {
        this.routeId = routeId;
        this.name = name;
    }
}
