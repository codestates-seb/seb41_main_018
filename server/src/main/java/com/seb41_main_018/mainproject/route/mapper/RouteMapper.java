package com.seb41_main_018.mainproject.route.mapper;

import com.seb41_main_018.mainproject.route.dto.RouteDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RouteMapper {
    Route routePostDtoToRoute(RouteDto.RoutePost routePost);
    Route routePatchDtoToRoute(RouteDto.RoutePatch routePatch);
    RouteDto.RouteResponse routeToRouteResponse(Route route);
    List<RouteDto.RouteResponse> routesToRouteResponse(List<Route> routes);
}
