package com.seb41_main_018.mainproject.content.mapper;

import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContentMapper {
    Content contentPostDtoToContent(ContentDto.ContentPost requestBody);
    Content contentPatchDtoToContent(ContentDto.ContentPatch requestBody);
    ContentDto.ContentResponse contentToContentResponse(Content content);
    List<ContentDto.ContentResponse> contentsToContentResponse(List<Content> contents);
}
