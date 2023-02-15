package com.seb41_main_018.mainproject.content.mapper;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.content.dto.*;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.route.dto.RoutePostDto;
import com.seb41_main_018.mainproject.route.dto.RouteResponseDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import com.seb41_main_018.mainproject.tag.dto.TagResponseDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.repository.TagRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ContentMapper {
    default Content contentPostDtoToContent(ContentPostDto requestBody){
        Content content = new Content();

        List<Route> routes = routesDtosToRoutes(requestBody.getRoutes(),content);
        content.setRoutes(routes);
        content.setTitle(requestBody.getTitle());
        //content.setRouteName(requestBody.getRouteName());
        content.setTravelDate(requestBody.getTravelDate());
        content.setThemeType(requestBody.getThemeType());
        content.setTag(requestBody.getTag());

        return content;
    }
    default Content contentPatchDtoToContent(ContentPatchDto requestBody){
        Content content = new Content();

        content.setContentId(requestBody.getContentId());
        List<Route> routes = routesDtosToRoutes(requestBody.getRoutes(),content);

        content.setTitle(requestBody.getTitle());
        content.setThemeType(requestBody.getThemeType());
        content.setTravelDate(requestBody.getTravelDate());
        content.setTag(requestBody.getTag());
        //content.setRouteName(requestBody.getRouteName());
        content.setRoutes(routes);
        return content;
    }
    default ContentResponseDto contentToContentResponse(Content content){
        User user = content.getUser();

        return ContentResponseDto.builder()
                .contentId(content.getContentId())
                .userId(user.getUserId())
                .title(content.getTitle())
                .heartCount(content.getHeartCount())
                .themeType(content.getThemeType())
                .viewCount(content.getViewCount())
                .amount(content.getRoutes().stream().mapToInt(Route::getPrice).sum())
                .travelDate(content.getTravelDate())
                //.routeName(content.getRouteName())
                .image(user.getImage())
                .createdAt(content.getCreatedAt())
                .modifiedAt(content.getModifiedAt())
                .tag(content.getTag())
                .routes(routesToRouteResponseDtos(content.getRoutes()))
                .build();
    }
    default List<Route> routesDtosToRoutes(List<RoutePostDto> routePostDtos, Content content){

        return routePostDtos.stream().map(routePostDto -> {
            Route route = new Route();
            route.addContent(content);
            route.setPrice(routePostDto.getPrice());
            route.setVehicle(routePostDto.getVehicle());
            route.setPlace(routePostDto.getPlace());
            route.setBody(routePostDto.getBody());
            route.setX(routePostDto.getX());
            route.setY(routePostDto.getY());
            route.setAddress(routePostDto.getAddress());

            return route;
        }).collect(Collectors.toList());
    }
    default List<RouteResponseDto> routesToRouteResponseDtos(List<Route> routes){
        return routes.stream()
                .map(route-> RouteResponseDto.builder()
                        .contentId(route.getContent().getContentId())
                        .price(route.getPrice())
                        .vehicle(route.getVehicle())
                        .place(route.getPlace())
                        .body(route.getBody())
                        .x(route.getX())
                        .y(route.getY())
                        .routeId(route.getRouteId())
                        .address(route.getAddress())
                        .build())
                .collect(Collectors.toList());
    }

    List<ContentResponseDto> contentsToContentResponse(List<Content> contents);
    default ContentDto.ThemeTypeResponse themeTypeResponse(ThemeType themeType, ContentRepository contentRepository,RouteRepository routeRepository){
        List<Content> contents = contentRepository.findAllByThemeType(themeType);

        return ContentDto.ThemeTypeResponse.builder()
                .themeType(themeType)
                .contents(contentsToThemeTypeResponseDtos(contents,routeRepository))
                .build();
    }
    default List<ContentDto.themeTypeResponseDto> contentsToThemeTypeResponseDtos(List<Content> contents,RouteRepository routeRepository){
        return contents.stream()
                .map(content -> ContentDto.themeTypeResponseDto.builder()
                        .contentId(content.getContentId())
                        .userId(content.getUser().getUserId())
                        .nickName(content.getUser().getNickname())
                        .title(content.getTitle())
                        .heartCount(content.getHeartCount())
                        .themeType(content.getThemeType())
                        .createdAt(content.getCreatedAt())
                        .modifiedAt(content.getModifiedAt())
                        .amount(routeRepository.findAllByContentId(content.getContentId()).stream().mapToInt(Route::getPrice).sum())
                        .travelDate(content.getTravelDate())
                        .routes(routesToRouteResponseDtos(routeRepository.findAllByContentId(content.getContentId())))
                        .viewCount(content.getViewCount())
                        .build())
                .collect(Collectors.toList());
    }

    default ContentAllResponseDto contentToContentAllResponse(Content content, CommentRepository commentRepository, TagRepository tagRepository,RouteRepository routeRepository){
        User user = content.getUser();
        List<Comment> comments = commentRepository.findAllByContentId(content.getContentId());
        Collections.reverse(comments);
        List<Route> routes = routeRepository.findAllByContentId(content.getContentId());

        return ContentAllResponseDto.builder()
                .contentId(content.getContentId())
                .userId(user.getUserId())
                .nickName(user.getNickname())
                .title(content.getTitle())
                .heartCount(content.getHeartCount())
                .themeType(content.getThemeType())
                .comments(commentsToCommentResponseDtos(comments))
                .tags(tagsToTagResponseDtos(tagRepository.findAllByContentId(content.getContentId())))
                .createdAt(content.getCreatedAt())
                .modifiedAt(content.getModifiedAt())
                .amount(routes.stream().mapToInt(Route::getPrice).sum())
                .travelDate(content.getTravelDate())
                .image(user.getImage())
                .tag(content.getTag())
                //.routeName(content.getRouteName())
                .routes(routesToRouteResponseDtos(routeRepository.findAllByContentId(content.getContentId())))
                .viewCount(content.getViewCount())
                .build();
    }
    default List<CommentDto.Response> commentsToCommentResponseDtos(List<Comment> comments){
        return comments.stream()
                .map(comment -> CommentDto.Response.builder()
                        .commentId(comment.getCommentId())
                        .contentId(comment.getContent().getContentId())
                        .userId(comment.getUser().getUserId())
                        .body(comment.getBody())
                        .ratingType(comment.getRatingType())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .image(comment.getUser().getImage())
                        .title(comment.getContent().getTitle())
                        .nickName(comment.getUser().getNickname())
                        .build())
                .collect(Collectors.toList());
    }

    default List<TagResponseDto> tagsToTagResponseDtos(List<Tag> tags){
        // tag
        return tags.stream()
                .map(tag -> TagResponseDto.builder()
                        .tagId(tag.getTagId())
                        .contentId(tag.getContent().getContentId())
                        .name(tag.getName())
                        .build())
                .collect(Collectors.toList());
    }


}