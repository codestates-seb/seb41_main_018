package com.seb41_main_018.mainproject.content.repository;

import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.content.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {
    //@Query(value = "select * from content where theme_type = :themeType", nativeQuery = true)
    List<Content> findAllByThemeType(ThemeType themeType);

    @Query(value = "select * from contents where user_id = :userId", nativeQuery = true)
    List<Content> findAllByUserId(long userId);
}