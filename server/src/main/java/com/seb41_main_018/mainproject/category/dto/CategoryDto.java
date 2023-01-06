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

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long categoryId;
        @NotSpace(message = "카테고리 이름은 필수입니다.")
        private String name;
        public void setCategoryId(long categoryId) {
            this.categoryId = categoryId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long categoryId;
        private String name;
    }
}

