package com.seb41_main_018.mainproject.category.controller;


import com.seb41_main_018.mainproject.category.dto.CategoryDto;
import com.seb41_main_018.mainproject.category.entity.Category;
import com.seb41_main_018.mainproject.category.mapper.CategoryMapper;
import com.seb41_main_018.mainproject.category.repository.CategoryRepository;
import com.seb41_main_018.mainproject.category.service.CategoryService;
import com.seb41_main_018.mainproject.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;

    // 카테고리 생성 //
    @PostMapping("/{adimright}")
    public ResponseEntity postCategory(@Valid @RequestBody CategoryDto.Post requestBody, @PathVariable("adimright") @Positive Long categoryId
    ){
        Category category = categoryService.createCategory(categoryMapper.categoryPostDtoToCategory(requestBody));
        CategoryDto.Response categoryResponseDto = categoryMapper.categoryToCategoryResponseDto(category);

        return new ResponseEntity(categoryResponseDto, HttpStatus.CREATED);
    }

    // 카테고리 수정 //
    @PatchMapping("/{categoryId}")
    public ResponseEntity patchCategory(@Valid @RequestBody CategoryDto.Patch requestBody,
                                        @PathVariable("categoryId") @Positive Long categoryId)
    {
        Category category = categoryService.updateCategory(categoryMapper.categoryPatchDtoToCategory(requestBody));
        CategoryDto.Response categoryResponseDto = categoryMapper.categoryToCategoryResponseDto(category);

        return new ResponseEntity<>(categoryResponseDto, HttpStatus.OK);
    }

    // 카테고리 단건 조회 //
    @GetMapping("/{categoryId}")
    public ResponseEntity getCategory(@PathVariable("categoryId") Long categoryId) {
        Category category = categoryService.findCategory(categoryId);
        return null;
    }

    // 카테고리 전체 조회 //
    @GetMapping
    public ResponseEntity getCategories(@Positive @RequestParam int page,
                                        @Positive @RequestParam int size) {
        Page<Category> pageCategories = categoryService.findCategories(page - 1, size);
        List<Category> categories = pageCategories.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(categoryMapper.categoriesToCategoryResponseDtos(categories),
                        pageCategories),
                HttpStatus.OK);
    }

    // 카테고리 삭제 //
    @DeleteMapping("/{categoryId}")
    public ResponseEntity deleteCategory(@PathVariable("categoryId") @Positive Long categoryId) {

        categoryService.deleteCategory(categoryId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
