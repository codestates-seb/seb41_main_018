package com.seb41_main_018.mainproject.routeplace.repository;

import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoutePlaceRepository extends JpaRepository<RoutePlace, Long> {
    Optional<RoutePlace> findByPlaceId(Long placeId);
    @Query(value = "select * from route_place where route_id = :routeId", nativeQuery = true)
    List<RoutePlace> findAllByRouteId(long routeId);

    List<RoutePlace> findAllByRoute(Route route);
}
