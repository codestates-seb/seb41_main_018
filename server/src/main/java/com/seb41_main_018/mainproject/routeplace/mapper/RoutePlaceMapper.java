package com.seb41_main_018.mainproject.routeplace.mapper;

import com.seb41_main_018.mainproject.routeplace.dto.RoutePlaceDto;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;

import java.util.List;

public interface RoutePlaceMapper {
    RoutePlace routePlacePostDtoToRoutePlace(RoutePlaceDto.Post requestBody);
    RoutePlace routePlacePatchDtoToRoutePlace(RoutePlaceDto.Patch requestBody);
    RoutePlaceDto.Response routePlaceToRoutePlaceResponseDto(RoutePlace routePlace);
    List<RoutePlaceDto.Response> routePlaceToRoutePlaceResponseDtos(List<RoutePlace> routePlaces);
}
