package com.seb41_main_018.mainproject.route.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.content.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.seb41_main_018.mainproject.route.entity.Route;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ROUTES")
public class Route extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROUTE_ID")
    private Long routeId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "CONTENT_ID")
    private Content content;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String vehicle;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private String place;


    @Column(nullable = false)
    private double x;

    @Column(nullable = false)
    private double y;

    @Column(nullable = false)
    private String address;

    @BatchSize(size = 10)
    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "route_image", joinColumns = @JoinColumn(name = "CONTENT_ID"))
    private List<String> routeImages;

    public Route(
            int price,
            String vehicle,
            String body,
            String place,
            double x,
            double y,
            String address
    ) {
        this.price = price;
        this.vehicle = vehicle;
        this.body = body;
        this.place = place;
        this.x = x;
        this.y = y;
        this.address = address;
    }
    public void addContent(Content content) {
        this.content = content;
        content.getRoutes().add(this);
    }
    public void addRouteImages(List<String> routeImages) {
        this.routeImages = routeImages;
    }
}