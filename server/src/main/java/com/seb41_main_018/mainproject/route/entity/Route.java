package com.seb41_main_018.mainproject.route.entity;


import com.seb41_main_018.mainproject.audit.Auditable;
import com.seb41_main_018.mainproject.content.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.seb41_main_018.mainproject.route.entity.Route;
import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Route extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @ManyToOne
    @JoinColumn(name = "ContentId")
    private Content content;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private String vehicle;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private String place;


    @Column(nullable = false)
    private String x;

    @Column(nullable = false)
    private String y;

    public Route(
            Long price,
            String vehicle,
            String body,
            String place,
            String x,
            String y
    ) {
        this.price = price;
        this.vehicle = vehicle;
        this.body = body;
        this.place = place;
        this.x = x;
        this.y = y;
    }
}
