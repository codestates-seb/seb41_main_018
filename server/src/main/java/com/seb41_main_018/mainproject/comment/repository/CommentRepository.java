package com.seb41_main_018.mainproject.comment.repository;

import com.seb41_main_018.mainproject.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
}
