package com.seb41_main_018.mainproject.comment.mapper;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentPostDtoToComment(CommentDto.Post requestBody)
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

    default Comment commentPatchDtoToComment(CommentDto.Patch requestBody)
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
    default CommentDto.Response commentToCommentResponseDto(Comment comment)
    {
        User user = comment.getUser();
        Content content = comment.getContent();

        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .userId(user.getUserId())
                .contentId(content.getContentId())
                .title(content.getTitle())
                .body(comment.getBody())
                .ratingType(comment.getRatingType())
                .build();
    }
    List<CommentDto.Response> commentsToCommentResponseDtos(List<Comment> comment);
}