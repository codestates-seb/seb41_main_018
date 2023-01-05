/*
package com.seb41_main_018.mainproject.comment;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class CommentController {
    private CommentService commentService;
    private PostService postService;
    private CommentMapper mapper;

    public CommentController(CommentService commentService, PostService postService, CommentMapper mapper) {
        this.commentService = commentService;
        this.postService = postService;
        this.mapper = mapper;
    }

    @PostMapping("/reply/{post-id}")
    public ResponseEntity postComment(@Valid @RequestBody commentDto.Post requestBody,
                                     @PathVariable("post-id") @Positive long postId) {
        Comment comment = mapper.commentPostDtoToComment(requestBody);

        long commentWriterId = comment.getCommentWriterId();
        Post post = postService.findPost(postId);

        comment.setpost(post);

        Comment createdcomment = commentService.createcomment(comment,commentWriterId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentTocommentResponseDto(createdcomment))
                , HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchcomment(@PathVariable("comment-id") @Positive long commentId,
                                      @Valid @RequestBody commentDto.Patch requestBody) {
        requestBody.setcommentId(commentId);
        comment comment =
                commentService.updatecomment(mapper.commentPatchDtoTocomment(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentTocommentResponseDto(comment)),
                HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getcomment(@PathVariable("comment-id") long commentId) {
        comment comment = commentService.findcomment(commentId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentTocommentResponseDto(comment)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getcomments(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<comment> pagecomments = commentService.findcomments(page - 1, size);
        List<comment> comments = pagecomments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.commentsTocommentResponseDtos(comments),
                        pagecomments),
                HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deletecomment(@PathVariable("comment-id") long commentId) {
        commentService.deletecomment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
*/
