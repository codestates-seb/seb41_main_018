package com.seb41_main_018.mainproject.route.controller;

import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.route.dto.RouteDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.mapper.RouteMapper;
import com.seb41_main_018.mainproject.route.service.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/routes")
public class RouteController {
    private final RouteService routeService;
    private final RouteMapper routeMapper;

    // 경로 생성 //
    @PostMapping
    public ResponseEntity postRoute(@RequestBody RouteDto.RoutePost requestBody){
        Route route = routeService.createRoute(routeMapper.routePostDtoToRoute(requestBody));
        RouteDto.RouteResponse routeResponse = routeMapper.routeToRouteResponse(route);

        return new ResponseEntity<>(routeResponse, HttpStatus.CREATED);
    }

    // 경로 단건 조회 //
    @GetMapping("/{routeId}")
    public ResponseEntity getRoute(@PathVariable("routeId") Long routeId) {
        Route route = routeService.findRoute(routeId);
        RouteDto.RouteResponse routeResponse = routeMapper.routeToRouteResponse(route);

        return new ResponseEntity<>(routeResponse, HttpStatus.OK);
    }

    // 경로 전체 조회 //
    @GetMapping
    public ResponseEntity getRoutes(@RequestParam int page,
                                    @RequestParam int size) {
        Page<Route> pageRoutes = routeService.findRoutes(page-1, size);
        List<Route> routes = pageRoutes.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        routeMapper.routesToRouteResponse(routes),
                        pageRoutes),
                HttpStatus.OK);
    }

    // 경로 수정 //
    @PatchMapping("/{routeId}")
    public ResponseEntity patchRoute(@RequestBody RouteDto.RoutePatch requestBody,
                                     @PathVariable("routeId") Long routeId) {
        Route route = routeService.updateRoute(
                routeId,
                routeMapper.routePatchDtoToRoute(requestBody));

        RouteDto.RouteResponse routeResponse = routeMapper.routeToRouteResponse(route);

        return new ResponseEntity<>(routeResponse, HttpStatus.OK);
    }

    // 경로 삭제 //
    @DeleteMapping("/{routeId}")
    public ResponseEntity deleteUser(@PathVariable("routeId") Long routeId){
        routeService.deleteRoute(routeId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
