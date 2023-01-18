package com.seb41_main_018.mainproject.tag.controller;

import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.mapper.TagMapper;
import com.seb41_main_018.mainproject.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    // 태그 생성 //
    @PostMapping
    public ResponseEntity postTag(@RequestBody TagDto.TagPost requestBody) {
        Tag tag = tagService.createTag(tagMapper.tagPostDtoToTag(requestBody));
        TagDto.TagResponse tagResponse = tagMapper.tagToTagResponse(tag);

        return new ResponseEntity<>(tagResponse, HttpStatus.CREATED);
    }

    // 태그 단건 조회 //
    @GetMapping("/{tagId}")
    public ResponseEntity getTag(@PathVariable("tagId") @Positive Long tagId) {
        Tag tag = tagService.findTag(tagId);
        TagDto.TagResponse tagResponse = tagMapper.tagToTagResponse(tag);

        return new ResponseEntity<>(tagResponse, HttpStatus.OK);
    }

    // 태그 전체 조회 //
    @GetMapping
    public ResponseEntity getTags(@RequestParam int page,
                                  @RequestParam int size) {
        Page<Tag> pageTags = tagService.findTags(page-1, size);
        List<Tag> tags = pageTags.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        tagMapper.tagsToTagResponse(tags),
                        pageTags),
                        HttpStatus.OK);
    }

    // 태그 수정 //
    @PatchMapping("/{tagId}")
    public ResponseEntity patchTag(@RequestBody TagDto.TagPatch requestBody,
                                   @PathVariable("tagId") Long tagId) {
        Tag tag = tagService.updateTag(
                tagId,
                tagMapper.tagPatchDtoToTag(requestBody));

        TagDto.TagResponse tagResponse = tagMapper.tagToTagResponse(tag);

        return new ResponseEntity<>(tagResponse, HttpStatus.OK);
    }

    // 태그 삭제 //
    @DeleteMapping("/{tagId}")
    public ResponseEntity deleteTag(@PathVariable("tagId") Long tagId) {
        tagService.deleteTag(tagId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
