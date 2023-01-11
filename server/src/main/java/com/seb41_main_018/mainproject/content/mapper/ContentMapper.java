package com.seb41_main_018.mainproject.content.mapper;

import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContentMapper {
    Content contentPostDtoToContent(ContentDto.ContentPost requestBody);
    default Content contentPatchDtoToContent(ContentDto.ContentPatch requestBody){
        Content content = new Content();

        content.setContentId(requestBody.getContentId());

        content.setBody(requestBody.getBody());
        content.setTitle(requestBody.getTitle());
        return content;
    }
    default ContentDto.ContentResponse contentToContentResponse(Content content){
        User user = content.getUser();

        return ContentDto.ContentResponse.builder()
                .contentId(content.getContentId())
                .userId(user.getUserId())
                .title(content.getTitle())
                .body(content.getBody())
                .build();
    }
    List<ContentDto.ContentResponse> contentsToContentResponse(List<Content> contents);
}
