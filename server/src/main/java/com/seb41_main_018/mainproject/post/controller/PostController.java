package com.seb41_main_018.mainproject.post.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/post")
public class PostController {

    // 게시글 생성
    @PostMapping
    public ResponseEntity postPost(
            // TODO: DTO
    ) {
        return null;
    }

    // 게시글 단건 조회
    @GetMapping("/{postId}")
    public ResponseEntity getPost(@PathVariable("postId") Long postId
                                  // TODO: DTO
    ) {
        return null;
    }

    // 게시글 전체 조회
    @GetMapping
    public ResponseEntity getPosts(
    ) {
        return null;
    }

    // 게시글 수정
    @PatchMapping("/{postId}")
    public ResponseEntity patchPost(@PathVariable("postId") Long postId
                                    // TODO: DTO
    ) {
        return null;
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity deletePost(@PathVariable("postId") Long postId
                                     // TODO: DTO
    ) {
        return null;
    }
}
