package com.seb41_main_018.mainproject.routeplace.entity;

import com.seb41_main_018.mainproject.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.seb41_main_018.mainproject.route.entity.Route;
import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class RoutePlace extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;

    @ManyToOne(optional = true, fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "ROUTE_ID")
    private Route route;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private String vehicle;

    @Column(nullable = false)
    private String body;

    public RoutePlace(
            Long price,
            String vehicle,
            String body
    ) {
        this.price = price;
        this.vehicle = vehicle;
        this.body = body;
    }
}
