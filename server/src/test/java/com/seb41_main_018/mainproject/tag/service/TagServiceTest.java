package com.seb41_main_018.mainproject.tag.service;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.repository.TagRepository;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
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
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class TagServiceTest {
    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private TagService tagService;

    @InjectMocks
    private UserRepository userRepository;

    @Test
    @DisplayName("tagService 검증 로직 TEST")
    void verifyLogic() {
        // Given
        Tag testTag = createTestTag(1L);
        given(userRepository.findByEmail(anyString())).willReturn();
        // null 발생
        //given(tagRepository.findBytagId(anyLong())).willReturn(testTag);

        // When
        Throwable throwableByCreate = Assertions.catchThrowable(() -> tagService.createTag(testTag));
        Throwable throwableByFind = Assertions.catchThrowable(() -> tagService.findTag(testTag.getTagId()));
        Throwable throwableByDelete = Assertions.catchThrowable(() -> tagService.deleteTag(testTag.getTagId()));

        // Then
        assertThat(throwableByCreate)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.TAG_EXISTS.getMessage());
        assertThat(throwableByFind)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.TAG_NOT_FOUND.getMessage());
        assertThat(throwableByDelete)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.TAG_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("테그 등록 테스트")
    void postTest() {
        // Given
        Tag testTag = createTestTag(1L);
        // When
        given(tagRepository.findByEmail(Mockito.anyString())).willReturn(Optional.of(testTag));
        // Then
        assertThrows(BusinessLogicException.class, () -> tagService.createTag(testTag));
    }

    @Test
    @DisplayName("테그 수정 테스트")
    void updateTest() {
        // Given
        Tag testTag = createTestTag(1L);
        Tag patchTag = createPatchTag(2L);
        given(tagRepository.findById(Mockito.anyLong())).willReturn(Optional.of(patchTag));

        Tag tag = tagService.updateTag(2L,patchTag);
        assertThat(tag.getName()).isEqualTo(patchTag.getName());
    }

    @Test
    @DisplayName("테그 조회 테스트")
    void findTest() {
        // Given
        Tag testTag = createTestTag(1L);
        given(tagRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testTag));

        Tag tag = tagService.findTag(testTag.getTagId());

        assertThat(tag.getName()).isEqualTo(testTag.getName());
    }

    @Test
    @DisplayName("테그 삭제 테스트")
    void deleteTest() {
        // Given
        Tag testTag = createTestTag(1L);
        given(tagRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testTag));
        // When
        tagService.deleteTag(testTag.getTagId());
        // Then

    }

    private Tag createTestTag(Long tagId) {
        Tag testTag = new Tag("제주");
        testTag.setTagId(tagId);

        return testTag;
    }

    private Tag createPatchTag(Long tagId) {
        Tag testTag = new Tag("서울");
        testTag.setTagId(tagId);

        return testTag;
    }
}