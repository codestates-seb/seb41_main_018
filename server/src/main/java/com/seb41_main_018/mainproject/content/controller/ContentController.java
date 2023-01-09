package com.seb41_main_018.mainproject.content.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/content")
public class ContentController {

    // 게시글 생성
    @PostMapping
    public ResponseEntity postContent(
            // TODO: DTO
    ) {
        return null;
    }

    // 게시글 단건 조회
    @GetMapping("/{contentId}/Info")
    public ResponseEntity getContent(@PathVariable("contentId") Long contentId
                                  // TODO: DTO
    ) {
        return null;
    }

    // 게시글 전체 조회
    @GetMapping
    public ResponseEntity getContents(
    ) {
        return null;
    }

    // 게시글 수정
    @PatchMapping("/{contentId}")
    public ResponseEntity patchContent(@PathVariable("contentId") Long contentId
                                    // TODO: DTO
    ) {
        return null;
    }

    // 게시글 삭제
    @DeleteMapping("/{contentId}")
    public ResponseEntity deleteContent(@PathVariable("contentId") Long contentId
                                     // TODO: DTO
    ) {
        return null;
    }
}
