package com.seb41_main_018.mainproject.route.service;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final UserRepository userRepository;
    private final ContentService contentService;
    private final RouteRepository routeRepository;
    private final ContentRepository contentRepository;

    // 루트 장소 생성 //
    public Route createRoute(Route route, Long contentId) {
        Content content = contentService.findVerifiedContent(contentId);
        route.setContent(content);
//        route.setTotalPrice(route.getTotalPrice()+routePlace.getPrice());
//        routeRepository.save(route);

        return routeRepository.save(route);
    }

//    // 루트 장소 수정 //
//    public Route updateRoute(Long routeId, Route route) {
//        Route findRoute = findVerifiedRoute(routeId);
//
//        Optional.ofNullable(routePlace.getBody())
//                .ifPresent(findPlace::setBody);
//
//        return routePlaceRepository.save(findPlace);
//    }

    // 루트 장소 전체 조회 //
    public Page<Route> findRoutes(int page, int size) {
        return routeRepository.findAll(PageRequest.of(page, size,
                Sort.by("placeId").descending()));
    }

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
                new BusinessLogicException(ExceptionCode.ROUTE_PLACE_NOT_FOUND));

        return findRoute;
    }
}
