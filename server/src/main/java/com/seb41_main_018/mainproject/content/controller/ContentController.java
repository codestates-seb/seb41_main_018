package com.seb41_main_018.mainproject.content.controller;

import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.mapper.ContentMapper;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.response.SingleResponseDto;
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

import java.util.List;
@ApiOperation(value = "컨텐트 API", tags = {"Content Controller"})
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper contentMapper;
    private final ContentRepository contentRepository;

    // 게시글 생성 //
    @ApiOperation(value = "컨텐트 등록", notes = "컨텐트를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Content not found")})
    @PostMapping
    public ResponseEntity postContent(@RequestBody ContentDto.ContentPost requestBody) {
        Content content = contentService.createContent(contentMapper.contentPostDtoToContent(requestBody));
        ContentDto.ContentResponse contentResponse = contentMapper.contentToContentResponse(content);

        return new ResponseEntity<>(contentResponse, HttpStatus.CREATED);
    }

    // 게시글 단건 조회 //
    @ApiOperation(value = "컨텐트 조회", notes = "컨텐트를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Content not found")})
    @GetMapping("/{contentId}")
    public ResponseEntity getContent( @ApiParam(name = "ContentId", value = "컨텐트 식별자", example = "1")
            @PathVariable("contentId") Long contentId) {
        Content content = contentService.findContent(contentId);
        int view = content.getViewCount();
        content.setViewCount(++view); //조회수 증가
        contentRepository.save(content);
        ContentDto.ContentResponse contentResponse = contentMapper.contentToContentResponse(content);

        return new ResponseEntity<>(contentResponse, HttpStatus.OK);
    }

    // 게시글 전체 조회 //
    @ApiOperation(value = "컨텐트 전체 조회", notes = "컨텐트를 전체 조회 합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Content not found")})
    @GetMapping
    public ResponseEntity getContents(@RequestParam("page") int page,
                                      @RequestParam("size") int size) {
        Page<Content> pageContents = contentService.findContents(page-1, size);
        List<Content> contents = pageContents.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        contentMapper.contentsToContentResponse(contents),
                        pageContents),
                        HttpStatus.OK);
    }

    // 게시글 수정 //
    @ApiOperation(value = "컨텐트 수정", notes = "컨텐트를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Content not found")})
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
    @ApiOperation(value = "컨텐트 삭제", notes = "컨텐트를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Content not found")})
    @DeleteMapping("/{contentId}")
    public ResponseEntity deleteContent(@PathVariable("contentId") Long contentId) {
        contentService.deleteContent(contentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{themeType}")
    public ResponseEntity getContentFromThemeType(@PathVariable("themeType")ThemeType themeType){
        ContentDto.ThemeTypeResponse response = contentMapper.themeTypeResponse(themeType, contentRepository);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }
}
