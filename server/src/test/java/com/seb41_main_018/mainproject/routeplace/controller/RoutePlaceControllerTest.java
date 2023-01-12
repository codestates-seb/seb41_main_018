package com.seb41_main_018.mainproject.routeplace.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.routeplace.dto.RoutePlaceDto;
import com.seb41_main_018.mainproject.routeplace.entity.RoutePlace;
import com.seb41_main_018.mainproject.routeplace.mapper.RoutePlaceMapper;
import com.seb41_main_018.mainproject.routeplace.service.RoutePlaceService;
import com.seb41_main_018.mainproject.user.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest
@AutoConfigureMockMvc
class RoutePlaceControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private RoutePlaceService routePlaceService;

    @MockBean
    private RoutePlaceMapper routePlaceMapper;
    @Test
    void postRoutePlace() throws Exception {
        User user = new User("hgd@gmail.com", "1234",
                "홍길동",
                true);

        RoutePlaceDto.Post post = new RoutePlaceDto.Post(1L,
                100L,
                "자동차", "서울");
        RoutePlaceDto.Response responseBody = new RoutePlaceDto.Response(1L,
                1l,100L,
                "자동차", "서울");

        // Stubbing by Mockito
        given(routePlaceMapper.routePlacePostDtoToRoutePlace(Mockito.any(RoutePlaceDto.Post.class))).willReturn(new RoutePlace());

        given(routePlaceService.createRoutePlace(Mockito.any(RoutePlace.class))).willReturn(new RoutePlace());

        given(routePlaceMapper.routePlaceToRoutePlaceResponseDto(Mockito.any(RoutePlace.class))).willReturn(responseBody);

        String routePlace = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/routePlaces").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(routePlace));
        // then
        MvcResult result = actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.routeId").value(post.getRouteId()))
                .andExpect(jsonPath("$.data.price").value(post.getPrice()))
                .andExpect(jsonPath("$.data.vehicle").value(post.getVehicle()))
                .andExpect(jsonPath("$.data.body").value(post.getBody()))
                .andReturn();
    }

    @Test
    void patchRoutePlace() throws Exception {
        long routePlaceId = 1L;
        RoutePlaceDto.Patch patch = new RoutePlaceDto.Patch(1L,
                1L,
                100L,
                "자동차", "서울");

        RoutePlaceDto.Response response = new RoutePlaceDto.Response(1L,
                1L,
                100L,
                "자동차", "서울");


        // Stubbing by Mockito
        given(routePlaceMapper.routePlacePatchDtoToRoutePlace(Mockito.any(RoutePlaceDto.Patch.class))).willReturn(new RoutePlace());

        given(routePlaceService.updateRoutePlace(Mockito.any(RoutePlace.class))).willReturn(new RoutePlace());

        given(routePlaceMapper.routePlaceToRoutePlaceResponseDto(Mockito.any(RoutePlace.class))).willReturn(response);

        Gson gson = new Gson();
        String routePlace = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/routePlaces/{routePlace-id}").buildAndExpand(routePlaceId).toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .patch(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(routePlace));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.routeId").value(patch.getRouteId()))
                .andExpect(jsonPath("$.data.placeId").value(patch.getPlaceId()))
                .andExpect(jsonPath("$.data.price").value(patch.getPrice()))
                .andExpect(jsonPath("$.data.vehicle").value(patch.getVehicle()))
                .andExpect(jsonPath("$.data.body").value(patch.getBody()));
    }

    @Test
    void getRoutePlace() throws Exception {
        // given
        long routePlaceId = 1L;

        RoutePlace routePlace = new RoutePlace(
                100L,
                "자동차", "서울");
        RoutePlace.setRoutePlaceId(routePlaceId);

        RoutePlaceDto.Response response = new RoutePlaceDto.Response( 1L,1L,100L,
                "자동차", "서울");


        // Stubbing by Mockito
        given(routePlaceService.findRoutePlace(Mockito.anyLong())).willReturn(new RoutePlace());
        given(routePlaceMapper.routePlaceToRoutePlaceResponseDto(Mockito.any(RoutePlace.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/routePlaces/{routePlace-id}").buildAndExpand(routePlaceId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.placeId").value(routePlace.getPlaceId()))
                .andExpect(jsonPath("$.data.price").value(routePlace.getPrice()))
                .andExpect(jsonPath("$.data.vehicle").value(routePlace.getVehicle()))
                .andExpect(jsonPath("$.data.body").value(routePlace.getBody()));

    }

    @Test
    void getRoutePlaces() {
    }

    @Test
    void deleteRoutePlace() throws Exception {
        long routePlaceId = 1L;

        // Stubbing by Mockito
        doNothing().when(routePlaceService).deleteRoutePlace(routePlaceId);

        // when
        ResultActions actions = mockMvc.perform(delete("/routePlaces/" + routePlaceId));

        // then
        actions.andExpect(status().isNoContent());
    }
}