package com.seb41_main_018.mainproject.comment.repository;

import com.seb41_main_018.mainproject.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "select * from comment where content_id = :contentId", nativeQuery = true)
    List<Comment> findAllByContentId(long contentId);
}
