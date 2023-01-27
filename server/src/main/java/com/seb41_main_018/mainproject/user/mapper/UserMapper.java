package com.seb41_main_018.mainproject.user.mapper;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.heart.repository.HeartRepository;
import com.seb41_main_018.mainproject.tag.repository.TagRepository;
import com.seb41_main_018.mainproject.user.dto.UserAllResponseDto;
import com.seb41_main_018.mainproject.user.dto.UserPatchDto;
import com.seb41_main_018.mainproject.user.dto.UserPostDto;
import com.seb41_main_018.mainproject.user.dto.UserResponseDto;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToUser(UserPostDto userPostDto);
    User userPatchDtoToUser(UserPatchDto userPatchDto);
    UserResponseDto userToUserResponseDto(User user);

    default UserAllResponseDto InfoResponse(User user, ContentRepository contentRepository, CommentRepository commentRepository, HeartRepository heartRepository){
        List<Content> contents = contentRepository.findAllByUserId(user.getUserId());
        List<Comment> comments = commentRepository.findAllByUserId(user.getUserId());
        List<Heart> hearts = heartRepository.findAllByUserId(user.getUserId());

        return UserAllResponseDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .password(user.getPassword())
                .nickname(user.getNickname())
                .phone(user.getPhone())
                .image(user.getImage())
                .createdAt(user.getCreatedAt())
                .modifiedAt(user.getModifiedAt())
                .comments(commentsToCommentResponseDtos(commentRepository.findAllByUserId(user.getUserId())))
                .contents(contentsToContentResponseDtos(contentRepository.findAllByUserId(user.getUserId())))
                .hearts(heartsToHeartResponseDtos(heartRepository.findAllByUserId(user.getUserId())))
                .build();
    }
    default List<CommentDto.UserCommentResponse> commentsToCommentResponseDtos(List<Comment> comments){
        return comments.stream()
                .map(comment -> CommentDto.UserCommentResponse.builder()
                        .commentId(comment.getCommentId())
                        .contentId(comment.getContent().getContentId())
                        .title(comment.getContent().getTitle())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .body(comment.getBody())
                        .ratingType(comment.getRatingType())
                        .build())
                .collect(Collectors.toList());
    }
    default List<ContentDto.UserContentResponseDto> contentsToContentResponseDtos(List<Content> contents){
        return contents.stream()
                .map(content -> ContentDto.UserContentResponseDto.builder()
                        .contentId(content.getContentId())
                        .title(content.getTitle())
                        .createdAt(content.getCreatedAt())
                        .modifiedAt(content.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }
    default List<HeartDto.UserHeartResponse> heartsToHeartResponseDtos(List<Heart> hearts){
        return hearts.stream()
                .map(heart -> HeartDto.UserHeartResponse.builder()
                        .contentId(heart.getContent().getContentId())
                        .title(heart.getContent().getTitle())
                        .heartType(heart.getHeartType())
                        .build())
                .collect(Collectors.toList());
    }
}

