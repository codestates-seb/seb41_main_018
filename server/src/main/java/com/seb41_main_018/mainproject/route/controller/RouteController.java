package com.seb41_main_018.mainproject.route.controller;

import com.seb41_main_018.mainproject.content.dto.ContentAllResponseDto;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.response.SingleResponseDto;
import com.seb41_main_018.mainproject.route.dto.RoutePatchDto;
import com.seb41_main_018.mainproject.route.dto.RoutePostDto;
import com.seb41_main_018.mainproject.route.dto.RouteResponseDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.mapper.RouteMapper;
import com.seb41_main_018.mainproject.route.service.RouteService;
import com.seb41_main_018.mainproject.user.dto.UserResponseDto;
import io.swagger.annotations.*;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
@ApiOperation(value = "경로 API", tags = {"Route Controller"})
@RestController
@Validated
@RequestMapping("/contents")
public class RouteController {
    private final RouteService routeService;
    private final RouteMapper routeMapper;

    public RouteController(RouteService routeService, RouteMapper routeMapper) {
        this.routeService = routeService;
        this.routeMapper = routeMapper;
    }

    // 경로 생성 //
    @ApiOperation(value = "경로 등록", notes = "경로를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Route not found")})
    @PostMapping("/{contentId}/routes")
    public ResponseEntity postRoute(@PathVariable("contentId") Long contentId,
                                    @Valid @RequestBody RoutePostDto requestBody) {
        requestBody.updateContentId(contentId);
        Route route = routeService.createRoute(
                routeMapper.routePostDtoToRoute(requestBody));

        RouteResponseDto routeResponseDto =
                routeMapper.routeToRouteResponseDto(route);

        return new ResponseEntity(
                new SingleResponseDto<>(routeResponseDto),HttpStatus.OK
        );
    }
    //컨텐츠 별 경로 전체 조회
    @ApiOperation(value = "컨텐츠 별 경로 전체 조회", notes = "컨텐츠 별 경로 전체 조회합니다.")
    @ApiImplicitParam(name = "id", value = "컨텐츠 아이디", paramType = "path")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved", response = RouteResponseDto.class),
            @ApiResponse(code = 404, message = "User not found")})
    @GetMapping("/{contentId}/routes")
    public ResponseEntity getTags(){
        List<Route> routeList = routeService.findRoutes();

        return new ResponseEntity<>(routeMapper.routeToRouteResponseDtos(routeList), HttpStatus.OK);
    }

    // 경로 수정 //
    @ApiOperation(value = "경로 수정", notes = "경로를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Route not found")})
    @PatchMapping("/{contentId}/routes/{routeId}")
    public ResponseEntity patchRoute(@Valid @RequestBody RoutePatchDto requestBody,
                                     @PathVariable("routeId") @Positive Long routeId)
    {
        Route route = routeService.updateRoute(
                routeId,
                routeMapper.routePatchDtoToRoute(requestBody));

        route.setRouteId(routeId);
        RouteResponseDto routeResponseDto =
                routeMapper.routeToRouteResponseDto(route);

        return new ResponseEntity<>(routeResponseDto, HttpStatus.OK);
    }

    // 경로 단건 조회 //
    @ApiOperation(value = "경로 조회", notes = "경로를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved", response = RouteResponseDto.class),
            @ApiResponse(code = 404, message = "Route not found")})
    @GetMapping("/{contentId}/routes/{routeId}")
    public ResponseEntity getRoute(@ApiParam(name = "routeId", value = "상세 경로 식별자", example = "1")
                                   @PathVariable("routeId") Long routeId) {
        Route route = routeService.findRoute(routeId);
        return routeService.detail(route);
    }
//
//    // 상세 경로 전체 조회 //
//    @ApiOperation(value = "상세 경로 전체 조회", notes = "상세 경로를 전체 조회 합니다.")
//    @ApiResponses(value = {
//            @ApiResponse(code = 404, message = "Route not found")})
//    @GetMapping("/{contentId}/routes")
//    public ResponseEntity getRoutes(@Positive @RequestParam("page") int page,
//                                         @Positive @RequestParam("size") int size) {
//        Page<Route> pageRoutes = routeService.findRoutes(page - 1, size);
//        List<Route> routes = pageRoutes.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(routeMapper.routeToRouteResponseDtos(routes),
//                        pageRoutes),
//                HttpStatus.OK);
//    }

    // 경로 삭제 //
    @ApiOperation(value = "상세 경로 삭제", notes = "상세 경로를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved"),
            @ApiResponse(code = 404, message = "Route not found")})
    @DeleteMapping("/{contentId}/routes/{routeId}")
    public ResponseEntity deleteRoute(@PathVariable("contentId") @Positive Long contentId,
                                      @PathVariable("routeId") @Positive Long routeId) {

        routeService.deleteRoute(routeId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}