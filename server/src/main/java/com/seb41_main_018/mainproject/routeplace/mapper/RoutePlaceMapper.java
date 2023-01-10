package com.seb41_main_018.mainproject.routeplace.mapper;

import com.seb41_main_018.mainproject.routeplace.dto.RoutePlaceDto;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoutePlaceMapper {
    RoutePlace routePlacePostDtoToRoutePlace(RoutePlaceDto.Post requestBody);
    RoutePlace routePlacePatchDtoToRoutePlace(RoutePlaceDto.Patch requestBody);
    RoutePlaceDto.Response routePlaceToRoutePlaceResponseDto(RoutePlace routePlace);
    List<RoutePlaceDto.Response> routePlaceToRoutePlaceResponseDtos(List<RoutePlace> routePlaces);
}
