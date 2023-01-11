package com.seb41_main_018.mainproject.routeplace.mapper;

import com.seb41_main_018.mainproject.route.dto.RouteDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.routeplace.dto.RoutePlaceDto;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoutePlaceMapper {
    RoutePlace routePlacePostDtoToRoutePlace(RoutePlaceDto.Post requestBody);
    default RoutePlace routePlacePatchDtoToRoutePlace(RoutePlaceDto.Patch requestBody) {
        Route route = new Route();
        route.setRouteId(requestBody.getRouteId());

        RoutePlace routePlace = new RoutePlace();
        routePlace.setRoute(route);
        routePlace.setPrice(requestBody.getPrice());
        routePlace.setVehicle(requestBody.getVehicle());
        routePlace.setBody(requestBody.getBody());

        return routePlace;
    }
    default RoutePlaceDto.Response routePlaceToRoutePlaceResponseDto(RoutePlace routePlace) {
        Route route = routePlace.getRoute();

        return RoutePlaceDto.Response.builder()
                .placeId(routePlace.getPlaceId())
                .routeId(route.getRouteId())
                .price(routePlace.getPrice())
                .vehicle(routePlace.getVehicle())
                .body(routePlace.getBody())
                .build();

    }
    List<RoutePlaceDto.Response> routePlaceToRoutePlaceResponseDtos(List<RoutePlace> routePlaces);
}
