package com.seb41_main_018.mainproject.routeplace.service;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.service.RouteService;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import com.seb41_main_018.mainproject.routeplace.repository.RoutePlaceRepository;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoutePlaceService {
    private final UserRepository userRepository;
    private final RouteService routeService;
    private final RoutePlaceRepository routePlaceRepository;

    // 루트 장소 생성 //
    public RoutePlace createRoutePlace(RoutePlace routePlace, Long routeId) {
        Route route = routeService.findVerifiedRoute(routeId);
        routePlace.setRoute(route);

        return routePlaceRepository.save(routePlace);
    }

    // 루트 장소 수정 //
    public RoutePlace updateRoutePlace(Long placeId, RoutePlace routePlace) {
        RoutePlace findPlace = findVerifiedRoutePlace(placeId);

        Optional.ofNullable(routePlace.getBody())
                .ifPresent(findPlace::setBody);

        return routePlaceRepository.save(findPlace);
    }
    
    // 루트 장소 전체 조회 //
    public Page<RoutePlace> findRoutePlaces(int page, int size) {
        return routePlaceRepository.findAll(PageRequest.of(page, size,
                Sort.by("placeId").descending()));
    }

    // 루트 장소 조회 //
    public RoutePlace findRoutePlace(Long placeId){
        return findVerifiedRoutePlace(placeId);
    }
    // 루트 장소 삭제 //
    public void deleteRoutePlace(Long placeId) {
        RoutePlace findPlace = findVerifiedRoutePlace(placeId);
        routePlaceRepository.delete(findPlace);
    }

    // 루트 장소 검증 로직 //
    public RoutePlace findVerifiedRoutePlace(Long placeId){
        Optional<RoutePlace> optionalRoutePlace = routePlaceRepository.findByPlaceId(placeId);
        RoutePlace findPlace = optionalRoutePlace.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ROUTE_PLACE_NOT_FOUND));

        return findPlace;
    }
}
