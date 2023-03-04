package com.seb41_main_018.mainproject.content.controller;

import com.seb41_main_018.mainproject.config.S3Uploader;
import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.content.dto.*;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.mapper.ContentMapper;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.response.SingleResponseDto;
import com.seb41_main_018.mainproject.route.service.RouteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@ApiOperation(value = "컨텐트 API", tags = {"Content Controller"})
@RestController
@Validated
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper contentMapper;
    private final ContentRepository contentRepository;
    private final RouteService routeService;
    private final S3Uploader s3Uploader;

    public ContentController(ContentService contentService, ContentMapper contentMapper, ContentRepository contentRepository, RouteService routeService, S3Uploader s3Uploader) {
        this.contentService = contentService;
        this.contentMapper = contentMapper;
        this.contentRepository = contentRepository;
        this.routeService = routeService;
        this.s3Uploader = s3Uploader;
    }


    // 게시글 생성 //
    @ApiOperation(value = "컨텐트 등록", notes = "컨텐트를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Content not found")})
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postContent(@Valid @RequestPart(value="requestBody") ContentPostDto requestBody,
                                      @RequestPart(value = "imgFiles0") MultipartFile[] imgFiles0,
                                      @RequestPart(value = "imgFiles1", required = false) MultipartFile[] imgFiles1,
                                      @RequestPart(value = "imgFiles2", required = false) MultipartFile[] imgFiles2,
                                      @RequestPart(value = "imgFiles3", required = false) MultipartFile[] imgFiles3,
                                      @RequestPart(value = "imgFiles4", required = false) MultipartFile[] imgFiles4,
                                      @RequestPart(value = "imgFiles5", required = false) MultipartFile[] imgFiles5,
                                      @RequestPart(value = "imgFiles6", required = false) MultipartFile[] imgFiles6,
                                      @RequestPart(value = "imgFiles7", required = false) MultipartFile[] imgFiles7) throws IOException {
        List<List<String>> imgList = new ArrayList<>();
        List<String> imgUrls = s3Uploader.uploadRouteImages(imgFiles0);
        imgList.add(imgUrls);
        if(imgFiles1!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles1);
            imgList.add(imgUrls);
        }
        if(imgFiles2!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles2);
            imgList.add(imgUrls);
        }
        if(imgFiles3!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles3);
            imgList.add(imgUrls);
        }
        if(imgFiles4!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles4);
            imgList.add(imgUrls);
        }
        if(imgFiles5!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles5);
            imgList.add(imgUrls);
        }
        if(imgFiles6!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles6);
            imgList.add(imgUrls);
        }
        if(imgFiles7!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles7);
            imgList.add(imgUrls);
        }

        Content content = contentService.createContent(contentMapper.contentPostDtoToContent(requestBody,imgList));
        ContentResponseDto contentResponse = contentMapper.contentToContentResponse(content);

        return new ResponseEntity<>(
                new SingleResponseDto<>(contentResponse) , HttpStatus.CREATED
        );
    }

    // 게시글 단건 조회 //
    @ApiOperation(value = "컨텐트 조회", notes = "컨텐트를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved", response = ContentAllResponseDto.class),
            @ApiResponse(code = 404, message = "Content not found")})
    @GetMapping("/{contentId}")
    public ResponseEntity getContent( @ApiParam(name = "ContentId", value = "컨텐트 식별자", example = "1")
                                      @PathVariable("contentId") Long contentId) {
        Content content = contentService.findContent(contentId);
        int viewCount = content.getViewCount();
        content.setViewCount(++viewCount);
        contentService.updateViewCount(content);

        return contentService.detail(content);
    }

    // 게시글 전체 조회 //
    @ApiOperation(value = "컨텐트 전체 조회", notes = "컨텐트를 전체 조회 합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved", response = ContentResponseDto.class),
            @ApiResponse(code = 404, message = "Content not found")})
    @GetMapping
    public ResponseEntity getContents(@RequestParam("page") int page,
                                      @RequestParam("size") int size) {
        Page<Content> pageContents = contentService.findContents(page-1, size);
        List<Content> contents = pageContents.getContent();
        contents.stream().forEach(content -> content.setRoutes(routeService.findRoutesByContentId(content.getContentId())));

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        contentMapper.contentsToContentResponse(contents),
                        pageContents),
                HttpStatus.OK);
    }

    // 게시글 수정 //
    @ApiOperation(value = "컨텐트 수정", notes = "컨텐트를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Content not found")})
    @PatchMapping("/{contentId}")
    public ResponseEntity patchContent(@RequestPart ContentPatchDto requestBody,
                                       @PathVariable("contentId") Long contentId,
                                       @RequestPart(value = "imgFiles0") MultipartFile[] imgFiles0,
                                       @RequestPart(value = "imgFiles1", required = false) MultipartFile[] imgFiles1,
                                       @RequestPart(value = "imgFiles2", required = false) MultipartFile[] imgFiles2,
                                       @RequestPart(value = "imgFiles3", required = false) MultipartFile[] imgFiles3,
                                       @RequestPart(value = "imgFiles4", required = false) MultipartFile[] imgFiles4,
                                       @RequestPart(value = "imgFiles5", required = false) MultipartFile[] imgFiles5,
                                       @RequestPart(value = "imgFiles6", required = false) MultipartFile[] imgFiles6,
                                       @RequestPart(value = "imgFiles7", required = false) MultipartFile[] imgFiles7) throws IOException {
        requestBody.updateId(contentId);
        List<List<String>> imgList = new ArrayList<>();
        List<String> imgUrls = s3Uploader.uploadRouteImages(imgFiles0);
        imgList.add(imgUrls);
        if(imgFiles1!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles1);
            imgList.add(imgUrls);
        }
        if(imgFiles2!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles2);
            imgList.add(imgUrls);
        }
        if(imgFiles3!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles3);
            imgList.add(imgUrls);
        }
        if(imgFiles4!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles4);
            imgList.add(imgUrls);
        }
        if(imgFiles5!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles5);
            imgList.add(imgUrls);
        }
        if(imgFiles6!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles6);
            imgList.add(imgUrls);
        }
        if(imgFiles7!=null){
            imgUrls = s3Uploader.uploadRouteImages(imgFiles7);
            imgList.add(imgUrls);
        }
        Content content = contentService.updateContent(
                contentMapper.contentPatchDtoToContent(requestBody,imgList));

        ContentResponseDto contentResponse = contentMapper.contentToContentResponse(content);

        return new ResponseEntity<>(contentResponse, HttpStatus.OK);
    }

    // 게시글 삭제 //
    @ApiOperation(value = "컨텐트 삭제", notes = "컨텐트를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Content not found")})
    @DeleteMapping("/{contentId}")
    public ResponseEntity deleteContent(@PathVariable("contentId") Long contentId) {
        contentService.deleteContent(contentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "카테고리 별 컨텐트 조회", notes = "카테고리 별 컨텐트를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Content not found")})
    @GetMapping("/category/{themeType}")
    public ResponseEntity getContentFromThemeType(@PathVariable("themeType")ThemeType themeType){
        ContentDto.ThemeTypeResponse response = contentMapper.themeTypeResponse(themeType, contentRepository);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }
}
