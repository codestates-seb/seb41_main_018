package com.seb41_main_018.mainproject.route.repository;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.route.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    Optional<Route> findByRouteId(Long routeId);
    @Query(value = "select * from routes where content_id = :contentId", nativeQuery = true)
    List<Route> findAllByContentId(long contentId);

    List<Route> findAllByContent(Content content);
}
