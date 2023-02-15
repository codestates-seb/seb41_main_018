package com.seb41_main_018.mainproject.tag.repository;

import com.seb41_main_018.mainproject.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query(value = "select * from tag where content_id = :contentId", nativeQuery = true)
    List<Tag> findAllByContentId(long contentId);
}
