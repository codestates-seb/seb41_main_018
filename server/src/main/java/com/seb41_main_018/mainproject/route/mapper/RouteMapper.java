package com.seb41_main_018.mainproject.route.mapper;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.route.dto.RouteDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RouteMapper {
    Route routePostDtoToRoute(RouteDto.Post requestBody);
//    default Route routePatchDtoToRoute(RouteDto.Patch requestBody) {
//        Route route = new Route();
//        route.setRouteId(requestBody.getRouteId());
//
//        RoutePlace routePlace = new RoutePlace();
//        routePlace.setRoute(route);
//        routePlace.setPrice(requestBody.getPrice());
//        routePlace.setVehicle(requestBody.getVehicle());
//        routePlace.setBody(requestBody.getBody());
//        routePlace.setX(requestBody.getX());
//        routePlace.setY(requestBody.getY());
//
//        return routePlace;
//    }
    default RouteDto.Response routeToRouteResponseDto(Route route) {
        Content content = route.getContent();

        return RouteDto.Response.builder()
                .contentId(content.getContentId())
                .routeId(route.getRouteId())
                .price(route.getPrice())
                .vehicle(route.getVehicle())
                .body(route.getBody())
                .x(route.getX())
                .y(route.getY())
                .place(route.getPlace())
                .build();

    }
    List<RouteDto.Response> routeToRouteResponseDtos(List<Route> routes);
}
