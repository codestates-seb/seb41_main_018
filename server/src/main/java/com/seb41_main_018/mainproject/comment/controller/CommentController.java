package com.seb41_main_018.mainproject.comment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    @PostMapping("/{contentId}")
    public ResponseEntity postComment( @PathVariable("contentId") Long contentId
    ){
        return null;
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity patchComment(@PathVariable("commentId") Long commentId){
        return null;
    }

    @GetMapping("/{commentId}/Info")
    public ResponseEntity getComment(@PathVariable("commentId") Long commentId) {
        return null;
    }

    @GetMapping
    public ResponseEntity getComments() {
        return null;
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") Long commentId) {
        return null;
    }
}
