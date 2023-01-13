package com.seb41_main_018.mainproject.routePlace.service;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import com.seb41_main_018.mainproject.routeplace.repository.RoutePlaceRepository;
import com.seb41_main_018.mainproject.routeplace.service.RoutePlaceService;
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
public class RoutePlaceServiceTest {
    @Mock
    private RoutePlaceRepository routePlaceRepository;

    @InjectMocks
    private RoutePlaceService routePlaceService;

    @Test
    @DisplayName("routePlaceService 검증 로직 TEST")
    void verifyLogic() {
        // Given
        RoutePlace testRoutePlace = createTestRoutePlace(1L);
        given(routePlaceRepository.findByEmail(anyString())).willReturn(Optional.of(testRoutePlace));
        // null 발생
        //given(routePlaceRepository.findByroutePlaceId(anyLong())).willReturn(testroutePlace);

        // When
        Throwable throwableByCreate = Assertions.catchThrowable(() -> routePlaceService.createRoutePlace(testRoutePlace));
        Throwable throwableByFind = Assertions.catchThrowable(() -> routePlaceService.findRoutePlace(testRoutePlace.getPlaceId()));
        Throwable throwableByDelete = Assertions.catchThrowable(() -> routePlaceService.deleteRoutePlace(testRoutePlace.getPlaceId()));

        // Then
        assertThat(throwableByCreate)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.ROUTE_EXISTS.getMessage());
        assertThat(throwableByFind)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.ROUTE_PLACE_NOT_FOUND.getMessage());
        assertThat(throwableByDelete)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.ROUTE_PLACE_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("테그 등록 테스트")
    void postTest() {
        // Given
        RoutePlace testRoutePlace = createTestRoutePlace(1L);
        // When
        given(routePlaceRepository.findByEmail(Mockito.anyString())).willReturn(Optional.of(testRoutePlace));
        // Then
        assertThrows(BusinessLogicException.class, () -> routePlaceService.createRoutePlace(testRoutePlace));
    }

    @Test
    @DisplayName("테그 수정 테스트")
    void updateTest() {
        // Given
        RoutePlace testRoutePlace = createTestRoutePlace(1L);
        RoutePlace patchRoutePlace = createPatchRoutePlace(2L);
        given(routePlaceRepository.findById(Mockito.anyLong())).willReturn(Optional.of(patchRoutePlace));

        RoutePlace routePlace = routePlaceService.updateRoutePlace(patchRoutePlace);

        assertThat(routePlace.getNickname()).isEqualTo(patchRoutePlace.getNickname());
    }
    @Test
    @DisplayName("테그 조회 테스트")
    void findTest() {
        // Given
        RoutePlace testRoutePlace = createTestRoutePlace(1L);
        given(routePlaceRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testRoutePlace));

        RoutePlace routePlace = routePlaceService.findRoutePlace(testRoutePlace.getPlaceId());

        assertThat(routePlace.getNickname()).isEqualTo(testRoutePlace.getNickname());
    }

    @Test
    @DisplayName("테그 삭제 테스트")
    void deleteTest() {
        // Given
        RoutePlace testRoutePlace = createTestRoutePlace(1L);
        given(routePlaceRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testRoutePlace));
        // When
        routePlaceService.deleteRoutePlace(testRoutePlace.getPlaceId());
        // Then

    }

    private RoutePlace createTestRoutePlace(Long placeId) {
        RoutePlace testRoutePlace = new RoutePlace(
                "test@test.com",
                "1111",
                "testroutePlace",
                true);
        testRoutePlace.setPlaceId(placeId);

        return testRoutePlace;
    }

    private RoutePlace createPatchRoutePlace(Long placeId) {
        RoutePlace testRoutePlace = new RoutePlace(
                "test@test.com",
                "1111",
                "patchroutePlace",
                true);
        testRoutePlace.setPlaceId(placeId);
        testRoutePlace.setRoutePlaceStatus(RoutePlace.ACTIVITY);

        return testRoutePlace;
    }
}