package com.seb41_main_018.mainproject.category.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@Validated
public class CategoryController {
    @PostMapping
    public ResponseEntity postCategory(@PathVariable("categoryId") Long categoryId
    ){
        return null;
    }

    @PatchMapping("/{categoryId}")
    public ResponseEntity patchCategory(@PathVariable("categoryId") Long categoryId){
        return null;
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity getCategory(@PathVariable("categoryId") Long categoryId) {
        return null;
    }

    @GetMapping
    public ResponseEntity getCategories() {
        return null;
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity deleteCategory(@PathVariable("categoryId") Long categoryId) {
        return null;
    }
}
