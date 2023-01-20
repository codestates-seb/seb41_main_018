package com.seb41_main_018.mainproject.route.mapper;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.route.dto.RouteDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import com.seb41_main_018.mainproject.routeplace.repository.RoutePlaceRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface RouteMapper {
    default Route routePostDtoToRoute(RouteDto.RoutePost requestBody)
    {
    Content content = new Content();
    content.setContentId(requestBody.getContentId());

    Route route = new Route();
    route.setContent(content);
    route.setName(requestBody.getName());
    route.setDate(requestBody.getDate());

    return route;
    }
    default Route routePatchDtoToRoute(RouteDto.RoutePatch requestBody)
    {
        Content content = new Content();
        content.setContentId(requestBody.getContentId());

        Route route  = new Route();
        content.setContentId(requestBody.getContentId());
        route.setContent(content);
        route.setName(requestBody.getName());
        route.setDate(requestBody.getDate());

        return route;
    }
    default RouteDto.RouteResponse routeToRouteResponse(Route route)
    {
        Content content = route.getContent();

        return RouteDto.RouteResponse.builder()
                .routeId(route.getRouteId())
                .contentId(content.getContentId())
                .name(route.getName())
                .routePlaces(routePlaceToRouteResponseDto(route.getRoutePlaces()))
                .totalPrice(route.getTotalPrice())
                .date(route.getDate())
                .build();
    }
    default RouteDto.RouteResponse routeToRouteResponse(Route route, RoutePlaceRepository routePlaceRepository)
    {
        Content content = route.getContent();
        List<RoutePlace> routePlaces = routePlaceRepository.findAllByRouteId(route.getRouteId());

        return RouteDto.RouteResponse.builder()
                .routeId(route.getRouteId())
                .contentId(content.getContentId())
                .name(route.getName())
                .routePlaces(routePlaceToRouteResponseDto(routePlaceRepository.findAllByRouteId(route.getRouteId())))
                //.totalPrice(route.getTotalPrice())
                .totalPrice(routePlaces.stream().mapToLong(RoutePlace::getPrice).sum())
                .date(route.getDate())
                .build();
    }
    List<RouteDto.RouteResponse> routesToRouteResponse(List<Route> routes);
    default List<RouteDto.RoutePlaceResponseDto> routePlaceToRouteResponseDto(List<RoutePlace> routePlaces){
        return routePlaces
                .stream()
                .map(routePlace -> RouteDto.RoutePlaceResponseDto
                        .builder()
                        .placeId(routePlace.getPlaceId())
                        .price(routePlace.getPrice())
                        .body(routePlace.getBody())
                        .vehicle(routePlace.getVehicle())
                        .x(routePlace.getX())
                        .y(routePlace.getY())
                        .build())
                .collect(Collectors.toList());
    }
}
