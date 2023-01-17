package com.seb41_main_018.mainproject.comment.controller;

import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.mapper.CommentMapper;
import com.seb41_main_018.mainproject.comment.service.CommentService;
import com.seb41_main_018.mainproject.response.MultiResponseDto;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
@ApiOperation(value = "코멘트 API", tags = {"Comment Controller"})
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    // 코멘트 생성 //
    @ApiOperation(value = "코멘트 등록", notes = "코멘트를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Comment not found")})
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestBody
    ){
        Comment comment = commentService.createComment(
                commentMapper.commentPostDtoToComment(requestBody),
                requestBody.getContentId()
        );
        CommentDto.Response commentResponseDto = commentMapper.commentToCommentResponseDto(comment);

        return new ResponseEntity(commentResponseDto, HttpStatus.CREATED);
    }

    // 코멘트 수정 //
    @ApiOperation(value = "코멘트 수정", notes = "코멘트를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Comment not found")})
    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentDto.Patch requestBody,
                                       @PathVariable("commentId") @Positive Long commentId)
    {
        Comment comment = commentService.updateComment(
                commentMapper.commentPatchDtoToComment(requestBody),
                commentId);

        comment.setCommentId(commentId);
        CommentDto.Response userResponseDto = commentMapper.commentToCommentResponseDto(comment);

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    // 코멘트 조회 //
    @ApiOperation(value = "코멘트 조회", notes = "코멘트를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Comment not found")})
    @GetMapping("/{commentId}")
    public ResponseEntity getComment(@ApiParam(name = "commentId", value = "코멘트 식별자", example = "1")
                                         @PathVariable("commentId") @Positive Long commentId)
    {
        Comment comment = commentService.findComment(commentId);
        CommentDto.Response commentResponse = commentMapper.commentToCommentResponseDto(comment);

        return new ResponseEntity<>(commentResponse, HttpStatus.OK);
    }

    // 코멘트 전체 조회 //
    @ApiOperation(value = "코멘트 전체 조회", notes = "코멘트를 전체 조회 합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Comment not found")})
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

    // 코멘트 삭제 //
    @ApiOperation(value = "코멘트 삭제", notes = "코멘트를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Comment not found")})
    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") @Positive Long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
