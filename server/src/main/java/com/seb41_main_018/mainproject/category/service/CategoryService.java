package com.seb41_main_018.mainproject.category.service;


import com.seb41_main_018.mainproject.category.entity.Category;
import com.seb41_main_018.mainproject.category.repository.CategoryRepository;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Category category) {
           return category;
    }
    //카테고리 수정
    public Category updateCategory(Category category) {
        Category findCategory = findVerifiedCategory(category.getCategoryId()); //ID로 멤버 존재 확인하고 category 정보 반환

        Optional.ofNullable(category.getName())
                .ifPresent(name -> findCategory.setName(name));

        return categoryRepository.save(findCategory);
    }

    public Category findCategory(long categoryId) {
        return findVerifiedCategory(categoryId);
    }

    //카테고리 삭제
    public void deleteCategory(long categoryId) {
        Category findCategory = findVerifiedCategory(categoryId);

        categoryRepository.delete(findCategory);
    }

    public Category findVerifiedCategory(long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        Category findCategory =
                optionalCategory.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        return findCategory;
    }
}
