package com.seb41_main_018.mainproject.user.service;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("User Service 검증 로직 TEST")
    void verifyLogic() {
        // Given
        User createUser = createTestUser(1L);
        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(createUser));
        // When
        Throwable throwableByCreate = Assertions.catchThrowable(() -> userService.createUser(createUser));
        // Then
        assertThat(throwableByCreate)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.USER_EXISTS.getMessage());
    }

    private User createTestUser(Long userId) {
        User testUser = new User(
                "test@test.com",
                "1111",
                "testUser",
                true);
        testUser.setUserId(userId);

        return testUser;
    }

    private User createPatchUser(Long userId) {
        User testUser = new User(
                "test@test.com",
                "2222",
                "patchUser",
                false);
        testUser.setUserId(userId);

        return testUser;
    }
}
