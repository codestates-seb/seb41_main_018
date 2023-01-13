package com.seb41_main_018.mainproject.route.service;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.entity.route;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import com.seb41_main_018.mainproject.route.repository.routeRepository;
import com.seb41_main_018.mainproject.route.service.routeService;
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
public class RouteServiceTest {
    @Mock
    private RouteRepository routeRepository;

    @InjectMocks
    private RouteService routeService;

    @Test
    @DisplayName("routeService 검증 로직 TEST")
    void verifyLogic() {
        // Given
        Route testRoute = createTestRoute(1L);
        given(routeRepository.findByEmail(anyString())).willReturn(Optional.of(testRoute));
        // null 발생
        //given(routeRepository.findByrouteId(anyLong())).willReturn(testroute);

        // When
        Throwable throwableByCreate = Assertions.catchThrowable(() -> routeService.createRoute(testRoute));
        Throwable throwableByFind = Assertions.catchThrowable(() -> routeService.findRoute(testRoute.getRouteId()));
        Throwable throwableByDelete = Assertions.catchThrowable(() -> routeService.deleteRoute(testRoute.getRouteId()));

        // Then
        assertThat(throwableByCreate)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.ROUTE_EXISTS.getMessage());
        assertThat(throwableByFind)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.ROUTE_NOT_FOUND.getMessage());
        assertThat(throwableByDelete)
                .isInstanceOf(BusinessLogicException.class)
                .hasMessageContaining(ExceptionCode.ROUTE_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("테그 등록 테스트")
    void postTest() {
        // Given
        Route testRoute = createTestRoute(1L);
        // When
        given(routeRepository.findByEmail(Mockito.anyString())).willReturn(Optional.of(testRoute));
        // Then
        assertThrows(BusinessLogicException.class, () -> routeService.createRoute(testRoute));
    }

    @Test
    @DisplayName("테그 수정 테스트")
    void updateTest() {
        // Given
        Route testRoute = createTestRoute(1L);
        Route patchRoute = createPatchRoute(2L);
        given(routeRepository.findById(Mockito.anyLong())).willReturn(Optional.of(patchRoute));

        Route route = routeService.updateRoute(patchRoute);

        assertThat(route.getNickname()).isEqualTo(patchRoute.getNickname());
    }
    @Test
    @DisplayName("테그 조회 테스트")
    void findTest() {
        // Given
        Route testroute = createTestRoute(1L);
        given(routeRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testRoute));

        Route route = routeService.findRoute(testRoute.getRouteId());

        assertThat(route.getNickname()).isEqualTo(testRoute.getNickname());
    }

    @Test
    @DisplayName("테그 삭제 테스트")
    void deleteTest() {
        // Given
        Route testRoute = createTestRoute(1L);
        given(routeRepository.findById(Mockito.anyLong())).willReturn(Optional.of(testRoute));
        // When
        routeService.deleteRoute(testRoute.getRouteId());
        // Then

    }

    private Route createTestRoute(Long routeId) {
        Route testRoute = new Route(
                "test@test.com",
                "1111",
                "testroute",
                true);
        testroute.setRouteId(routeId);

        return testroute;
    }

    private Route createPatchRoute(Long routeId) {
        Route testRoute = new Route(
                "test@test.com",
                "1111",
                "patchroute",
                true);
        testroute.setRouteId(routeId);

        return testRoute;
    }
}