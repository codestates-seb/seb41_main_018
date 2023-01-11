package com.seb41_main_018.mainproject.route.service;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RouteService {
    private final RouteRepository routeRepository;
    private final ContentService contentService;


    // 경로 생성 //
    public Route createRoute(Route route, Long contentId) {
        Content content = contentService.findVerifiedContent(contentId);
        route.setContent(content);

        return routeRepository.save(route);
    }

    // 경로 수정 //
    public Route updateRoute(Long routeId, Route route) {
        Route findRoute = findVerifiedRoute(routeId);

        Optional.ofNullable(findRoute.getName())
                .ifPresent(findRoute::setName);

        return routeRepository.save(findRoute);
    }

    // 경로 단건 조회 //
    public Route findRoute(Long routeId) {
        return findVerifiedRoute(routeId);
    }

    // 경로 전체 조회 //
    public Page<Route> findRoutes(int page, int size) {
        return routeRepository.findAll(PageRequest.of(page, size,
                Sort.by("routeId").descending()));
    }

    // 경로 삭제 //
    public void deleteRoute(Long routeId) {
        Route findRoute = findVerifiedRoute(routeId);
        routeRepository.delete(findRoute);
    }

    // 경로 검증 로직 //
    public Route findVerifiedRoute(Long routeId) {
        Optional<Route> optionalRoute = routeRepository.findById(routeId);
        Route findRoute = optionalRoute.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ROUTE_NOT_FOUND));

        return findRoute;
    }
}
