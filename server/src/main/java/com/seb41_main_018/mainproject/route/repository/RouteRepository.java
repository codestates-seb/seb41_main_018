package com.seb41_main_018.mainproject.route.repository;

import com.seb41_main_018.mainproject.route.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Long> {
    Optional<Route> findByName(String name);
}
