package com.seb41_main_018.mainproject.routeplace.controller;

import com.seb41_main_018.mainproject.response.MultiResponseDto;
import com.seb41_main_018.mainproject.routeplace.dto.RoutePlaceDto;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import com.seb41_main_018.mainproject.routeplace.mapper.RoutePlaceMapper;
import com.seb41_main_018.mainproject.routeplace.repository.RoutePlaceRepository;
import com.seb41_main_018.mainproject.routeplace.service.RoutePlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/routeplaces")
public class RoutePlaceController {
    private final RoutePlaceService routePlaceService;
    private final RoutePlaceMapper routePlaceMapper;

    // 상세 경로 생성 //
    @PostMapping
    public ResponseEntity postRoutePlace(@Valid @RequestBody RoutePlaceDto.Post requestBody) {
        RoutePlace routePlace = routePlaceService.createRoutePlace(
                routePlaceMapper.routePlacePostDtoToRoutePlace(requestBody),
                requestBody.getRouteId());

        RoutePlaceDto.Response routePlaceResponseDto =
                routePlaceMapper.routePlaceToRoutePlaceResponseDto(routePlace);

        return new ResponseEntity(routePlaceResponseDto, HttpStatus.CREATED);
    }

    // 상세 경로 수정 //
    @PatchMapping("/{placeId}")
    public ResponseEntity patchRoutePlace(@Valid @RequestBody RoutePlaceDto.Patch requestBody,
                                          @PathVariable("placeId") @Positive Long placeId)
    {
        RoutePlace routePlace = routePlaceService.updateRoutePlace(
                placeId,
                routePlaceMapper.routePlacePatchDtoToRoutePlace(requestBody));

        routePlace.setPlaceId(placeId);
        RoutePlaceDto.Response routePlaceResponseDto =
                routePlaceMapper.routePlaceToRoutePlaceResponseDto(routePlace);

        return new ResponseEntity<>(routePlaceResponseDto, HttpStatus.OK);
    }

    // 상세 경로 단건 조회 //
    @GetMapping("/{placeId}")
    public ResponseEntity getRoutePlace(@PathVariable("placeId") Long placeId) {
        RoutePlace routePlace = routePlaceService.findRoutePlace(placeId);
        RoutePlaceDto.Response routePlaceResponse =
                routePlaceMapper.routePlaceToRoutePlaceResponseDto(routePlace);

        return new ResponseEntity<>(routePlaceResponse, HttpStatus.OK);
    }

    // 상세 경로 전체 조회 //
    @GetMapping
    public ResponseEntity getRoutePlaces(@Positive @RequestParam int page,
                                        @Positive @RequestParam int size) {
        Page<RoutePlace> pageRoutePlaces = routePlaceService.findRoutePlaces(page - 1, size);
        List<RoutePlace> routePlaces = pageRoutePlaces.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(routePlaceMapper.routePlaceToRoutePlaceResponseDtos(routePlaces),
                        pageRoutePlaces),
                HttpStatus.OK);
    }

    // 상세 경로 삭제 //
    @DeleteMapping("/{placeId}")
    public ResponseEntity deleteRoutePlace(@PathVariable("placeId") @Positive Long placeId) {

        routePlaceService.deleteRoutePlace(placeId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
