package com.seb41_main_018.mainproject.tag.controller;

import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.mapper.TagMapper;
import com.seb41_main_018.mainproject.tag.service.TagService;
import com.seb41_main_018.mainproject.user.dto.UserAllResponseDto;
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

import javax.validation.constraints.Positive;
import java.util.List;
@ApiOperation(value = "테그 API", tags = {"Tag Controller"})
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    // 태그 생성 //
    @ApiOperation(value = "테그 등록", notes = "테그를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Tag not found")})
    @PostMapping
    public ResponseEntity postTag(@RequestBody TagDto.TagPost requestBody) {
        Tag tag = tagService.createTag(tagMapper.tagPostDtoToTag(requestBody), requestBody.getContentId());
        TagDto.TagResponse tagResponse = tagMapper.tagToTagResponse(tag);

        return new ResponseEntity<>(tagResponse, HttpStatus.CREATED);
    }

    // 태그 단건 조회 //
    @ApiOperation(value = "테그 조회", notes = "테그를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved",response = TagDto.TagResponse.class),
            @ApiResponse(code = 404, message = "Tag not found")})
    @GetMapping("/{tagId}")
    public ResponseEntity getTag(@ApiParam(name = "TagId", value = "테그 식별자", example = "1")
                                     @PathVariable("tagId") @Positive Long tagId) {
        Tag tag = tagService.findTag(tagId);
        TagDto.TagResponse tagResponse = tagMapper.tagToTagResponse(tag);

        return new ResponseEntity<>(tagResponse, HttpStatus.OK);
    }

    // 태그 전체 조회 //
    @ApiOperation(value = "테그 전체 조회", notes = "테그를 전체 조회 합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved",response = TagDto.TagResponse.class),
            @ApiResponse(code = 404, message = "Tag not found")})
    @GetMapping
    public ResponseEntity getTags(@RequestParam("page") int page,
                                  @RequestParam("size") int size) {
        Page<Tag> pageTags = tagService.findTags(page-1, size);
        List<Tag> tags = pageTags.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        tagMapper.tagsToTagResponse(tags),
                        pageTags),
                        HttpStatus.OK);
    }

    // 태그 수정 //
    @ApiOperation(value = "테그 수정", notes = "테그를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Tag not found")})
    @PatchMapping("/{tagId}")
    public ResponseEntity patchTag(@RequestBody TagDto.TagPatch requestBody,
                                   @PathVariable("tagId") Long tagId) {
        Tag tag = tagService.updateTag(
                tagId,
                tagMapper.tagPatchDtoToTag(requestBody));

        tag.setTagId(tagId);
        TagDto.TagResponse tagResponse = tagMapper.tagToTagResponse(tag);

        return new ResponseEntity<>(tagResponse, HttpStatus.OK);
    }

    // 태그 삭제 //
    @ApiOperation(value = "테그 삭제", notes = "테그를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Tag not found")})
    @DeleteMapping("/{tagId}")
    public ResponseEntity deleteTag(@PathVariable("tagId") Long tagId) {
        tagService.deleteTag(tagId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
