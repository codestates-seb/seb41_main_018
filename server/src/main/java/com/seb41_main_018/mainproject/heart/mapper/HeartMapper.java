package com.seb41_main_018.mainproject.heart.mapper;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.heart.dto.HeartPatchDto;
import com.seb41_main_018.mainproject.heart.dto.HeartResponseDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HeartMapper {
    Heart heartPatchDtoToEntity(HeartPatchDto requestBody);
    default HeartResponseDto heartToHeartResponseDto(Heart heart) {
        User user = heart.getUser();
        Content content = heart.getContent();

        return HeartResponseDto.builder()
                .userId(user.getUserId())
                .heartId(heart.getHeartId())
                .contentId(content.getContentId())
                .heartType(heart.getHeartType().toString())

                .build();
    }
    List<HeartResponseDto> heartsToHeartResponseDtos(List<Heart> heart);
}
