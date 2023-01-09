package com.seb41_main_018.mainproject.category.mapper;

import com.seb41_main_018.mainproject.category.dto.CategoryDto;
import com.seb41_main_018.mainproject.category.entity.Category;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.user.entity.User;

import java.util.List;

public interface CategoryMapper {
    Category categoryPostDtoToCategory(CategoryDto.Post requestBody);
    Category categoryPatchDtoToCategory(CategoryDto.Patch requestBody);
    CategoryDto.Response categoryToCategoryResponseDto(Category category);
    List<CategoryDto.Response> categoryToCategoryResponseDtos(List<Category> category);
}
