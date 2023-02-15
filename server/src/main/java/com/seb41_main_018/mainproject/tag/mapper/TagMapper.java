package com.seb41_main_018.mainproject.tag.mapper;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.tag.dto.TagPatchDto;
import com.seb41_main_018.mainproject.tag.dto.TagPostDto;
import com.seb41_main_018.mainproject.tag.dto.TagResponseDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag tagPostDtoToTag(TagPostDto requestBody);
    default Tag tagPatchDtoToTag(TagPatchDto requestBody) {
        Tag tag = new Tag();

        tag.setTagId(requestBody.getTagId());
        tag.setName(requestBody.getName());

        return tag;
    }
    default TagResponseDto tagToTagResponse(Tag tag) {
        Content content = tag.getContent();

        return TagResponseDto.builder()
                .contentId(content.getContentId())
                .tagId(tag.getTagId())
                .name(tag.getName())
                .build();
    }
    List<TagResponseDto> tagsToTagResponse(List<Tag> tags);
}
