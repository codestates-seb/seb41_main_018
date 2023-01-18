package com.seb41_main_018.mainproject.category.repository;

import com.seb41_main_018.mainproject.category.entity.Category;
import com.seb41_main_018.mainproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategoryId(String categoryId);
}
