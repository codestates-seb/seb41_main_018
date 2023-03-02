package com.seb41_main_018.mainproject.comment.mapper;

import com.seb41_main_018.mainproject.comment.dto.CommentPatchDto;
import com.seb41_main_018.mainproject.comment.dto.CommentPostDto;
import com.seb41_main_018.mainproject.comment.dto.CommentResponseDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentPostDtoToComment(CommentPostDto requestBody)
        {
        // content id, comment id 받아오기 + body 받아오기
        Content content = new Content();
        content.setContentId(requestBody.getContentId());

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setBody(requestBody.getBody());
        comment.setRatingType(requestBody.getRatingType());

        return comment;
    }

    default Comment commentPatchDtoToComment(CommentPatchDto requestBody)
    {
        // content id, comment id 받아오기 + body 받아오기
        Content content = new Content();
        content.setContentId(requestBody.getContentId());

        Comment comment = new Comment();
        content.setContentId(requestBody.getContentId());
        comment.setContent(content);
        comment.setBody(requestBody.getBody());
        comment.setRatingType(requestBody.getRatingType());

        return comment;
    }
    default CommentResponseDto commentToCommentResponseDto(Comment comment)
    {
        User user = comment.getUser();
        Content content = comment.getContent();

        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
                .userId(user.getUserId())
                .contentId(content.getContentId())
                .title(content.getTitle())
                .body(comment.getBody())
                .ratingType(comment.getRatingType())
                .nickName(user.getNickname())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .image(user.getImage())
                .build();
    }
    List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comment);
}