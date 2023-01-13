package com.seb41_main_018.mainproject.heart.mapper;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HeartMapper {
    Heart heartPostDtoToEntity(HeartDto.Post requestBody);
    Heart heartPatchDtoToEntity(HeartDto.Patch requestBody);
    default HeartDto.Response heartToHeartResponseDto(Heart heart) {
        User user = heart.getUser();
        Content content = heart.getContent();

        return HeartDto.Response.builder()
                .userId(user.getUserId())
                .heartId(heart.getHeartId())
                .heartType(heart.getHeartType().toString())
                .build();
    }
    List<HeartDto.Response> heartsToHeartResponseDtos(List<Heart> heart);
}
