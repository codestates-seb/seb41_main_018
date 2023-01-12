package com.seb41_main_018.mainproject.category.dto;

import com.seb41_main_018.mainproject.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class CategoryDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotSpace(message = "카테고리 이름은 필수입니다.")
        private String name;

    }

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private Long categoryId;
        @NotSpace(message = "카테고리 이름은 필수입니다.")
        private String name;
        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long categoryId;
        private String name;
    }
}

