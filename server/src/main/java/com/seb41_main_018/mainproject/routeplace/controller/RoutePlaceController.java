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
    private final RoutePlaceRepository routePlaceRepository;


    @PostMapping("/{adimright}")
    public ResponseEntity postroutePlace(@Valid @RequestBody RoutePlaceDto.Post requestBody, @PathVariable("adimright") @Positive Long placeId
    ){
        RoutePlace routePlace = routePlaceService.createRoutePlace(routePlaceMapper.routePlacePostDtoToRoutePlace(requestBody));
        RoutePlaceDto.Response routePlaceResponseDto = routePlaceMapper.routePlaceToRoutePlaceResponseDto(routePlace);

        return new ResponseEntity(routePlaceResponseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{placeId}")
    public ResponseEntity patchRoutePlace(@Valid @RequestBody RoutePlaceDto.Patch requestBody,
                                        @PathVariable("placeId") @Positive Long placeId)
    {
        RoutePlace routePlace = routePlaceService.updateRoutePlace(placeId,routePlaceMapper.routePlacePatchDtoToRoutePlace(requestBody));
        RoutePlaceDto.Response routePlaceResponseDto = routePlaceMapper.routePlaceToRoutePlaceResponseDto(routePlace);

        return new ResponseEntity<>(routePlaceResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{placeId}")
    public ResponseEntity getroutePlace(@PathVariable("placeId") Long placeId) {
        RoutePlace routePlace = routePlaceService.findRoutePlace(placeId);
        return null;
    }

    @GetMapping
    public ResponseEntity getCategories(@Positive @RequestParam int page,
                                        @Positive @RequestParam int size) {
        Page<RoutePlace> pageRoutePlaces = routePlaceService.findRoutePlaces(page - 1, size);
        List<RoutePlace> routePlaces = pageRoutePlaces.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(routePlaceMapper.routePlaceToRoutePlaceResponseDtos(routePlaces),
                        pageRoutePlaces),
                HttpStatus.OK);
    }

    @DeleteMapping("/{routePlaceId}")
    public ResponseEntity deleteRoutePlace(@PathVariable("placeId") @Positive Long placeId) {

        routePlaceService.deleteRoutePlace(placeId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
