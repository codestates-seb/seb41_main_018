package com.seb41_main_018.mainproject.tag.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/tag")
public class TagController {
    // 태그 생성
    @PostMapping
    public ResponseEntity postTag(
            // TODO: DTO
    ) {
        return null;
    }

    // 태그 단건 조회
    @GetMapping("/{tagId}")
    public ResponseEntity getTag(@PathVariable("tagId") Long tagId
    ) {
        return null;
    }

    // 태그 전체 조회
    @GetMapping
    public ResponseEntity getTags(
    ) {
        return null;
    }

    // 태그 수정
    @PatchMapping("/{tagId}")
    public ResponseEntity patchTag(@PathVariable("tagId") Long tagId
            // TODO: DTO
    ) {
        return null;
    }

    // 태그 삭제
    @DeleteMapping("/{tagId}")
    public ResponseEntity deleteTag(@PathVariable("tagId") Long tagId
                                     // TODO: DTO
    ) {
        return null;
    }
}
