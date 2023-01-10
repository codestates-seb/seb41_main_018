package com.seb41_main_018.mainproject.content.controller;

import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.mapper.ContentMapper;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/contents")
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper contentMapper;

    // 게시글 생성 //
    @PostMapping
    public ResponseEntity postContent(@RequestBody ContentDto.ContentPost requestBody) {
        Content content = contentService.createContent(contentMapper.contentPostDtoToContent(requestBody));
        ContentDto.ContentResponse contentResponse = contentMapper.contentToContentResponse(content);

        return new ResponseEntity<>(contentResponse, HttpStatus.CREATED);
    }

    // 게시글 단건 조회 //
    @GetMapping("/{contentId}")
    public ResponseEntity getContent(@PathVariable("contentId") Long contentId) {
        Content content = contentService.findContent(contentId);
        ContentDto.ContentResponse contentResponse = contentMapper.contentToContentResponse(content);

        return new ResponseEntity<>(contentResponse, HttpStatus.OK);
    }

    // 게시글 전체 조회 //
    @GetMapping
    public ResponseEntity getContents(@RequestParam int page,
                                      @RequestParam int size) {
        Page<Content> pageContents = contentService.findContents(page-1, size);
        List<Content> contents = pageContents.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        contentMapper.contentsToContentResponse(contents),
                        pageContents),
                        HttpStatus.OK);
    }

    // 게시글 수정 //
    @PatchMapping("/{contentId}")
    public ResponseEntity patchContent(@RequestBody ContentDto.ContentPatch requestBody,
                                       @PathVariable("contentId") Long contentId) {
        Content content = contentService.updateContent(
                contentId,
                contentMapper.contentPatchDtoToContent(requestBody));

        ContentDto.ContentResponse contentResponse = contentMapper.contentToContentResponse(content);

        return new ResponseEntity<>(contentResponse, HttpStatus.OK);
    }

    // 게시글 삭제 //
    @DeleteMapping("/{contentId}")
    public ResponseEntity deleteContent(@PathVariable("contentId") Long contentId) {
        contentService.deleteContent(contentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
