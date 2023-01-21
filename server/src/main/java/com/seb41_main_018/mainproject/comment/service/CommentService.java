package com.seb41_main_018.mainproject.comment.service;

import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ContentService contentService;

    private final UserService userService;

    public Comment createComment(
            Comment comment,
            Long contentId) {
        // 이미 등록된 이메일인지 확인
        Content content = contentService.findContent(contentId);
        User user = userService.getLoginMember();

        comment.setUser(user);
//        comment.setNickname(user.getNickname());
        comment.setContent(content);

        return commentRepository.save(comment);
    }
    // 코멘트 수정
    public Comment updateComment(
            Comment comment,
            Long commentId) {

        Comment findComment = findVerifiedComment(commentId); //ID로 멤버 존재 확인하고 comment 정보 반환

        Optional.ofNullable(comment.getBody())
                .ifPresent(findComment::setBody);

        Optional.ofNullable(comment.getRatingType())
                .ifPresent(findComment::setRatingType);

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

    /*private void verifyExistsId(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent())
            throw new BusinessLogicException(ExceptionCode.COMMENT_EXISTS);
    }*/
}