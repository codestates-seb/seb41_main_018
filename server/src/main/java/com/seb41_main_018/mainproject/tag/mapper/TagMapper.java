package com.seb41_main_018.mainproject.tag.mapper;

import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag tagPostDtoToTag(TagDto.TagPost requestBody);
    Tag tagPatchDtoToTag(TagDto.TagPatch requestBody);
    TagDto.TagResponse tagToTagResponse(Tag tag);
    List<TagDto.TagResponse> tagsToTagResponse(List<Tag> tags);
}
