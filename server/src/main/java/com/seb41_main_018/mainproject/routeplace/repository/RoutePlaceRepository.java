package com.seb41_main_018.mainproject.routeplace.repository;

import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoutePlaceRepository extends JpaRepository<RoutePlace, Long> {
    Optional<RoutePlace> findByPlaceId(Long placeId);
}
