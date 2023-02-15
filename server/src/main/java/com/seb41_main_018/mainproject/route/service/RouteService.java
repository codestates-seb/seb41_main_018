package com.seb41_main_018.mainproject.route.service;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RouteService {
    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    // 루트 장소 생성 //
    public Route createRoute(Route route) {
        //verifyExistsRoute(route.getRouteId());
        return routeRepository.save(route);
    }

    public void deleteRoutes(Content content) {
        Long contentId = content.getContentId();

        List<Route> routes = routeRepository.findAllByContentId(contentId);

        routes.stream().forEach(route -> routeRepository.delete(route)); //조회한 태그 삭제
    }

    // 루트 장소 수정 //
    public Route updateRoute(Long routeId, Route route) {
        Route findRoute = findVerifiedRoute(routeId);

        Optional.ofNullable(route.getBody())
                .ifPresent(findRoute::setBody);

        return routeRepository.save(findRoute);
    }
    public List<Route> findRoutes(){
        return routeRepository.findAll();
    }

    public List<Route> findRoutesByContentId(Long contentId){
        return routeRepository.findAllByContentId(contentId);
    }
    public List<Route> createRoutes(List<Route> routes) {
        return routes.stream().map(route -> routeRepository.save(route)).collect(Collectors.toList());
    }

//    // 루트 장소 전체 조회 //
//    public Page<Route> findRoutes(int page, int size) {
//        return routeRepository.findAll(PageRequest.of(page, size,
//                Sort.by("placeId").descending()));
//    }

    // 루트 장소 조회 //
    public Route findRoute(Long routeId){
        return findVerifiedRoute(routeId);
    }
    // 루트 장소 삭제 //
    public void deleteRoute(Long routeId) {
        Route findRoute = findVerifiedRoute(routeId);
        routeRepository.delete(findRoute);
    }

    // 루트 장소 검증 로직 //
    public Route findVerifiedRoute(Long routeId){
        Optional<Route> optionalRoute = routeRepository.findByRouteId(routeId);
        Route findRoute = optionalRoute.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ROUTE_NOT_FOUND));

        return findRoute;
    }

}