package com.seb41_main_018.mainproject.tag.mapper;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag tagPostDtoToTag(TagDto.TagPost requestBody);
    default Tag tagPatchDtoToTag(TagDto.TagPatch requestBody) {
        Tag tag = new Tag();

        tag.setTagId(requestBody.getTagId());
        tag.setName(requestBody.getName());

        return tag;
    }
    default TagDto.TagResponse tagToTagResponse(Tag tag) {
        Content content = tag.getContent();

        return TagDto.TagResponse.builder()
                .contentId(content.getContentId())
                .tagId(tag.getTagId())
                .name(tag.getName())
                .build();
    }
    List<TagDto.TagResponse> tagsToTagResponse(List<Tag> tags);
}
