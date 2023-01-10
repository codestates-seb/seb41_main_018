package com.seb41_main_018.mainproject.comment.service;

import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
    public Comment createcomment(Comment comment) {
        // 이미 등록된 이메일인지 확인
        User user = userRepository.findByUserId(comment.getUserId());
        comment.setUser(user);

        return commentRepository.save(comment);
    }
    // 코멘트 수정
    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId()); //ID로 멤버 존재 확인하고 comment 정보 반환

        Optional.ofNullable(comment.getBody())
                .ifPresent(body -> findComment.setBody(body));

        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size,
                Sort.by("commentId").descending()));
    }

    //코멘트 삭제
    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);

        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    private void verifyExistsEmail(String email) {
        Optional<Comment> comment = commentRepository.findByEmail(email);
        if (comment.isPresent())
            throw new BusinessLogicException(ExceptionCode.COMMENT_EXISTS);
    }
}