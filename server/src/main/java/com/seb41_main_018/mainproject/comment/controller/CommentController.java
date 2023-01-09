package com.seb41_main_018.mainproject.comment.controller;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.mapper.CommentMapper;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.comment.service.CommentService;
import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.response.SingleResponseDto;
import com.seb41_main_018.mainproject.user.dto.UserPatchDto;
import com.seb41_main_018.mainproject.user.dto.UserResponseDto;
import com.seb41_main_018.mainproject.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;

    public CommentController(CommentService commentService, CommentMapper commentMapper, CommentRepository commentRepository) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.commentRepository = commentRepository;
    }

    @PostMapping("/{contentId}")
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestBody,  @PathVariable("contentId") @Positive Long contentId
    ){
        Comment comment = commentService.createcomment(commentMapper.commentPostDtoToComment(requestBody));
        CommentDto.Response commentResponseDto = commentMapper.commentToCommentResponseDto(comment);

        return new ResponseEntity(commentResponseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentDto.Patch requestBody, @PathVariable("commentId") @Positive Long commentId)
    {
        Comment comment = commentService.updateComment(commentMapper.commentPatchDtoToComment(requestBody));
        CommentDto.Response userResponseDto = commentMapper.commentToCommentResponseDto(comment);

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{commentId}/Info")
    public ResponseEntity getComment(@PathVariable("commentId") @Positive Long commentId)
    {
        Comment comment = commentService.findComment(commentId);
        return null;
//        CommentDto commentDto = commentMapper.InfoResponse(user, contentRepository, commentRepository);
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(commentDto), HttpStatus.OK
//        );
    }

    @GetMapping
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<Comment> pageComments = commentService.findComments(page - 1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(commentMapper.commentsToCommentResponseDtos(comments),
                        pageComments),
                HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") @Positive Long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
