package com.seb41_main_018.mainproject.content.mapper;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.repository.TagRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ContentMapper {
    Content contentPostDtoToContent(ContentDto.ContentPost requestBody);
    default Content contentPatchDtoToContent(ContentDto.ContentPatch requestBody){
        Content content = new Content();

        content.setContentId(requestBody.getContentId());

        content.setBody(requestBody.getBody());
        content.setTitle(requestBody.getTitle());
        content.setThemeType(requestBody.getThemeType());
        content.setDate(requestBody.getDate());
        content.setRouteName(requestBody.getRouteName());
        return content;
    }
    default ContentDto.ContentResponse contentToContentResponse(Content content){
        User user = content.getUser();

        return ContentDto.ContentResponse.builder()
                .contentId(content.getContentId())
                .userId(user.getUserId())
                .title(content.getTitle())
                .body(content.getBody())
                .heartCount(content.getHeartCount())
                .themeType(content.getThemeType())
                .viewCount(content.getViewCount())
                .totalPrice(content.getTotalPrice())
                .date(content.getDate())
                .routeName(content.getRouteName())
                .createdAt(content.getCreatedAt())
                .modifiedAt(content.getModifiedAt())
                .build();
    }
    List<ContentDto.ContentResponse> contentsToContentResponse(List<Content> contents);
    default ContentDto.ThemeTypeResponse themeTypeResponse(ThemeType themeType, ContentRepository contentRepository){
        List<Content> contents = contentRepository.findAllByThemeType(themeType);

        return ContentDto.ThemeTypeResponse.builder()
                .themeType(themeType)
                .contents(contentsToThemeTypeResponseDtos(contents))
                .build();
    }
    default List<ContentDto.themeTypeResponseDto> contentsToThemeTypeResponseDtos(List<Content> contents){
        return contents.stream()
                .map(content -> ContentDto.themeTypeResponseDto.builder()
                        .contentId(content.getContentId())
                        .title(content.getTitle())
                        .build())
                .collect(Collectors.toList());
    }

    default ContentDto.ContentAllResponse contentToContentAllResponse(Content content, CommentRepository commentRepository, TagRepository tagRepository){
        User user = content.getUser();
        List<Comment> comments = commentRepository.findAllByContentId(content.getContentId());
        //List<Route> routes = routeRepository.findAllByContentId(content.getContentId());

        return ContentDto.ContentAllResponse.builder()
                .contentId(content.getContentId())
                .userId(user.getUserId())
                .title(content.getTitle())
                .body(content.getBody())
                .heartCount(content.getHeartCount())
                .themeType(content.getThemeType())
                .comments(commentsToCommentResponseDtos(commentRepository.findAllByContentId(content.getContentId())))
                .tags(tagsToTagResponseDtos(tagRepository.findAllByContentId(content.getContentId())))
                .createdAt(content.getCreatedAt())
                .modifiedAt(content.getModifiedAt())
                //.totalPrice(routes.stream().mapToLong(Route::getPrice).sum())
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
                        .build())
                .collect(Collectors.toList());
    }

    default List<TagDto.TagResponse> tagsToTagResponseDtos(List<Tag> tags){
        // tag
        return tags.stream()
                .map(tag -> TagDto.TagResponse.builder()
                        .tagId(tag.getTagId())
                        .contentId(tag.getContent().getContentId())
                        .name(tag.getName())
                        .build())
                .collect(Collectors.toList());
    }


}
