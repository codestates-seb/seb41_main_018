package com.seb41_main_018.mainproject.comment.service;

import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.comment.entity.comment;
import com.seb41_main_018.mainproject.comment.repository.commentRepository;
import com.seb41_main_018.mainproject.comment.service.commentService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {
    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @Test
    @DisplayName("commentService 검증 로직 TEST")
    void verifyLogic() {
        // Given
        Comment testcomment = createTestComment(1L);
        given(commentRepository.findByEmail(anyString())).willReturn(Optional.of(testComment));
        // null 발생
        //given(commentRepository.findBycommentId(anyLong())).willReturn(testcomment);

        // When
        Throwable throwableByCreate = Assertions.catchThrowable(() -> commentService.createComment(testComment));
        Throwable throwableByFind = Assertions.catchThrowable(() -> commentService.findComment(testComment.getCommentId()));
        Throwable throwableByDelete = Assertions.catchThrowable(() -> commentService.deleteComment(testComment.getCommentId()));

        // Then
        assertThat(throwableByCreate)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.COMMENT_EXISTS.getMessage());
        assertThat(throwableByFind)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.COMMENT_NOT_FOUND.getMessage());
        assertThat(throwableByDelete)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.COMMENT_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("테그 등록 테스트")
    void postTest() {
        // Given
        Comment testcomment = createTestComment(1L);
        // When
        given(commentRepository.findByEmail(Mockito.anyString())).willReturn(Optional.of(testComment));
        // Then
        assertThrows(BusinessLogicException.class, () -> commentService.createComment(testComment));
    }

    @Test
    @DisplayName("테그 수정 테스트")
    void updateTest() {
        // Given
        Comment testComment = createTestComment(1L);
        Comment patchComment = createPatchComment(2L);
        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.of(patchComment));

        Comment comment = commentService.updateComment(patchComment);

        assertThat(comment.getNickname()).isEqualTo(patchComment.getNickname());
    }
    @Test
    @DisplayName("테그 조회 테스트")
    void findTest() {
        // Given
        Comment testComment = createTestComment(1L);
        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testComment));

        Comment comment = commentService.findComment(testComment.getCommentId());

        assertThat(comment.getNickname()).isEqualTo(testComment.getNickname());
    }

    @Test
    @DisplayName("테그 삭제 테스트")
    void deleteTest() {
        // Given
        Comment testComment = createTestComment(1L);
        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testComment));
        // When
        commentService.deleteComment(testcomment.getCommentId());
        // Then

    }

    private Comment createTestComment(Long commentId) {
        Comment testcomment = new Comment(
                "test@test.com",
                "1111",
                "testcomment",
                true);
        testComment.setCommentId(commentId);

        return testComment;
    }

    private Comment createPatchComment(Long commentId) {
        Comment testComment = new Comment(
                "test@test.com",
                "1111",
                "patchcomment",
                true);
        testComment.setCommentId(commentId);

        return testComment;
    }
}