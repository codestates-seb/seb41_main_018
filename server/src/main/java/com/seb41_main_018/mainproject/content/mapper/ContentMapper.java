package com.seb41_main_018.mainproject.content.mapper;

import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
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

}
