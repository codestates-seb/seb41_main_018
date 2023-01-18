package com.seb41_main_018.mainproject.route.controller;

import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.response.SingleResponseDto;
import com.seb41_main_018.mainproject.route.dto.RouteDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.mapper.RouteMapper;
import com.seb41_main_018.mainproject.route.service.RouteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;
@ApiOperation(value = "경로 API", tags = {"Route Controller"})
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/routes")
public class RouteController {
    private final RouteService routeService;
    private final RouteMapper routeMapper;

    // 경로 생성 //
    @ApiOperation(value = "경로 등록", notes = "경로를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Route not found")})
    @PostMapping
    public ResponseEntity postRoute(@RequestBody RouteDto.RoutePost requestBody){
        Route route = routeService.createRoute(routeMapper.routePostDtoToRoute(requestBody), requestBody.getContentId());
        RouteDto.RouteResponse routeResponse = routeMapper.routeToRouteResponse(route);

        return new ResponseEntity<>(routeResponse, HttpStatus.CREATED);
    }

    // 경로 단건 조회 //
    @ApiOperation(value = "경로 조회", notes = "경로를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Route not found")})
    @GetMapping("/{routeId}")
    public ResponseEntity getRoute(@ApiParam(name = "RouteId", value = "경로 식별자", example = "1")
                                         @PathVariable("routeId") Long routeId) {
        Route route = routeService.findRoute(routeId);
        RouteDto.RouteResponse routeResponse = routeMapper.routeToRouteResponse(route);

        return new ResponseEntity<>(
                new SingleResponseDto<>(routeResponse), HttpStatus.OK
        );
    }

    // 경로 전체 조회 //
    @ApiOperation(value = "경로 전체 조회", notes = "경로를 전체 조회 합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Route not found")})
    @GetMapping
    public ResponseEntity getRoutes(@RequestParam("page") int page,
                                    @RequestParam("size") int size) {
        Page<Route> pageRoutes = routeService.findRoutes(page-1, size);
        List<Route> routes = pageRoutes.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        routeMapper.routesToRouteResponse(routes),
                        pageRoutes),
                HttpStatus.OK);
    }

    // 경로 수정 //
    @ApiOperation(value = "경로 수정", notes = "경로를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Route not found")})
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
    @ApiOperation(value = "경로 삭제", notes = "경로를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Route not found")})
    @DeleteMapping("/{routeId}")
    public ResponseEntity deleteUser(@PathVariable("routeId") Long routeId){
        routeService.deleteRoute(routeId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
