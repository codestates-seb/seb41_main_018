package com.seb41_main_018.mainproject.comment.repository;

import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "SELECT c FROM Comment c WHERE c.commentId = :commentId")
    Optional<Comment> findByEmail(String email);
}
