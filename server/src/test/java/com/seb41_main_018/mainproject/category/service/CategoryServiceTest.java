package com.seb41_main_018.mainproject.category.service;

import com.seb41_main_018.mainproject.category.entity.Category;
import com.seb41_main_018.mainproject.category.repository.CategoryRepository;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.category.entity.category;
import com.seb41_main_018.mainproject.category.repository.categoryRepository;
import com.seb41_main_018.mainproject.category.service.categoryService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @Test
    @DisplayName("categoryService 검증 로직 TEST")
    void verifyLogic() {
        // Given
        Category testCategory = createTestCategory(1L);
        given(categoryRepository.findByEmail(anyString())).willReturn(Optional.of(testCategory));
        // null 발생
        //given(categoryRepository.findBycategoryId(anyLong())).willReturn(testcategory);

        // When
        Throwable throwableByCreate = Assertions.catchThrowable(() -> categoryService.createCategory(testCategory));
        Throwable throwableByFind = Assertions.catchThrowable(() -> categoryService.findCategory(testCategory.getCategoryId()));
        Throwable throwableByDelete = Assertions.catchThrowable(() -> categoryService.deleteCategory(testCategory.getCategoryId()));

        // Then
        assertThat(throwableByCreate)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.CATEGORY_EXISTS.getMessage());
        assertThat(throwableByFind)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.CATEGORY_NOT_FOUND.getMessage());
        assertThat(throwableByDelete)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.CATEGORY_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("테그 등록 테스트")
    void postTest() {
        // Given
        Category testCategory = createTestCategory(1L);
        // When
        given(categoryRepository.findByEmail(Mockito.anyString())).willReturn(Optional.of(testCategory));
        // Then
        assertThrows(BusinessLogicException.class, () -> categoryService.createCategory(testCategory));
    }

    @Test
    @DisplayName("테그 수정 테스트")
    void updateTest() {
        // Given
        Category testCategory = createTestCategory(1L);
        Category patchCategory = createPatchCategory(2L);
        given(categoryRepository.findById(Mockito.anyLong())).willReturn(Optional.of(patchCategory));

        Category category = categoryService.updateCategory(patchCategory);

        assertThat(category.getNickname()).isEqualTo(patchCategory.getNickname());
    }
    @Test
    @DisplayName("테그 조회 테스트")
    void findTest() {
        // Given
        Category testCategory = createTestCategory(1L);
        given(categoryRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testCategory));

        Category category = categoryService.findCategory(testCategory.getCategoryId());

        assertThat(category.getNickname()).isEqualTo(testCategory.getNickname());
    }

    @Test
    @DisplayName("테그 삭제 테스트")
    void deleteTest() {
        // Given
        Category testCategory = createTestCategory(1L);
        given(categoryRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testCategory));
        // When
        categoryService.deleteCategory(testCategory.getCategoryId());
        // Then

    }

    private Category createTestCategory(Long categoryId) {
        Category testCategory = new Category(
                "test@test.com",
                "1111",
                "testcategory",
                true);
        testCategory.setCategoryId(categoryId);

        return testCategory;
    }

    private Category createPatchCategory(Long categoryId) {
        Category testCategory = new Category(
                "test@test.com",
                "1111",
                "patchcategory",
                true);
        testcategory.setCategoryId(categoryId);

        return testcategory;
    }
}