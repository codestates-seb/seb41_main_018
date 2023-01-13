package com.seb41_main_018.mainproject.content.service;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.content.entity.content;
import com.seb41_main_018.mainproject.content.repository.contentRepository;
import com.seb41_main_018.mainproject.content.service.contentService;
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
public class ContentServiceTest {
    @Mock
    private ContentRepository contentRepository;

    @InjectMocks
    private ContentService contentService;

    @Test
    @DisplayName("contentService 검증 로직 TEST")
    void verifyLogic() {
        // Given
        Content testContent = createTestContent(1L);
        given(contentRepository.findByEmail(anyString())).willReturn(Optional.of(testContent));
        // null 발생
        //given(contentRepository.findBycontentId(anyLong())).willReturn(testcontent);

        // When
        Throwable throwableByCreate = Assertions.catchThrowable(() -> contentService.createContent(testContent));
        Throwable throwableByFind = Assertions.catchThrowable(() -> contentService.findContent(testContent.getContentId()));
        Throwable throwableByDelete = Assertions.catchThrowable(() -> contentService.deleteContent(testContent.getContentId()));

        // Then
        assertThat(throwableByCreate)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.CONTENT_EXISTS.getMessage());
        assertThat(throwableByFind)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.CONTENT_NOT_FOUND.getMessage());
        assertThat(throwableByDelete)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.CONTENT_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("테그 등록 테스트")
    void postTest() {
        // Given
        Content testContent = createTestContent(1L);
        // When
        given(contentRepository.findByEmail(Mockito.anyString())).willReturn(Optional.of(testContent));
        // Then
        assertThrows(BusinessLogicException.class, () -> contentService.createContent(testContent));
    }

    @Test
    @DisplayName("테그 수정 테스트")
    void updateTest() {
        // Given
        Content testContent = createTestContent(1L);
        Content patchContent = createPatchContent(2L);
        given(contentRepository.findById(Mockito.anyLong())).willReturn(Optional.of(patchContent));

        Content content = contentService.updateContent(2L,이ㅓㄴㅁㅜ);

        assertThat(content.getTitle()).isEqualTo(patchContent.getTitle());
        assertThat(content.getBody()).isEqualTo(patchContent.getBody());
    }
    @Test
    @DisplayName("테그 조회 테스트")
    void findTest() {
        // Given
        Content testContent = createTestContent(1L);
        given(contentRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testContent));

        Content content = contentService.findContent(testContent.getContentId());

        assertThat(content.getTitle()).isEqualTo(testContent.getTitle());
        assertThat(content.getBody()).isEqualTo(testContent.getBody());
    }

    @Test
    @DisplayName("테그 삭제 테스트")
    void deleteTest() {
        // Given
        Content testContent = createTestContent(1L);
        given(contentRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testContent));
        // When
        contentService.deleteContent(testContent.getContentId());
        // Then

    }

    private Content createTestContent(Long contentId) {
        Content testContent = new Content("굿", "제주짱");
        testContent.setContentId(contentId);

        return testContent;
    }

    private Content createPatchContent(Long contentId) {
        Content testContent = new Content("굿", "서울짱");
        testContent.setContentId(contentId);

        return testContent;
    }
}