package com.seb41_main_018.mainproject.route.mapper;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.route.dto.RouteDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RouteMapper {
    default Route routePostDtoToRoute(RouteDto.RoutePost requestBody)
    {
    Content content = new Content();
    content.setContentId(requestBody.getContentId());

    Route route = new Route();
    route.setContent(content);
    route.setName(requestBody.getName());

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

        return route;
    }
    default RouteDto.RouteResponse routeToRouteResponse(Route route)
    {
        Content content = route.getContent();

        return RouteDto.RouteResponse.builder()
                .routeId(route.getRouteId())
                .contentId(content.getContentId())
                .name(route.getName())
                .build();
    }
    List<RouteDto.RouteResponse> routesToRouteResponse(List<Route> routes);
}
