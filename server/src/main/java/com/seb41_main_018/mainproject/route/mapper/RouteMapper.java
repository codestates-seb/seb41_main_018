package com.seb41_main_018.mainproject.route.mapper;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.route.dto.RoutePatchDto;
import com.seb41_main_018.mainproject.route.dto.RoutePostDto;
import com.seb41_main_018.mainproject.route.dto.RouteResponseDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RouteMapper {
    default Route routePostDtoToRoute(RoutePostDto requestBody){
        Content content = new Content();
        content.setContentId(requestBody.getContentId());

        Route route = new Route();

        route.setContent(content);
        route.setX(requestBody.getX());
        route.setY(requestBody.getY());
        route.setPrice(requestBody.getPrice());
        route.setBody(requestBody.getBody());
        route.setPlace(requestBody.getPlace());
        route.setVehicle(requestBody.getVehicle());

        return route;
    }
    default Route routePatchDtoToRoute(RoutePatchDto requestBody) {
        Route route = new Route();

        route.setRouteId(requestBody.getRouteId());
        route.setPrice(requestBody.getPrice());
        route.setVehicle(requestBody.getVehicle());
        route.setBody(requestBody.getBody());
        route.setX(requestBody.getX());
        route.setY(requestBody.getY());

        return route;
    }
    default RouteResponseDto routeToRouteResponseDto(Route route) {
        return RouteResponseDto.builder()
                .contentId(route.getContent().getContentId())
                .routeId(route.getRouteId())
                .price(route.getPrice())
                .vehicle(route.getVehicle())
                .body(route.getBody())
                .x(route.getX())
                .y(route.getY())
                .place(route.getPlace())
                .build();

    }
    List<RouteResponseDto> routeToRouteResponseDtos(List<Route> routes);
}
