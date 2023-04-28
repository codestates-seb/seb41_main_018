package com.seb41_main_018.mainproject.route.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.constant.ThemeType;
import com.seb41_main_018.mainproject.content.dto.ContentPostDto;
import com.seb41_main_018.mainproject.route.dto.RoutePatchDto;
import com.seb41_main_018.mainproject.route.dto.RoutePostDto;
import com.seb41_main_018.mainproject.route.dto.RouteResponseDto;
import com.seb41_main_018.mainproject.route.entity.Route;
import com.seb41_main_018.mainproject.route.mapper.RouteMapper;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import com.seb41_main_018.mainproject.route.service.RouteService;
import com.seb41_main_018.mainproject.user.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
@Transactional
class RouteControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private RouteService routeService;

    @MockBean
    private RouteMapper routeMapper;
    @Autowired
    private RouteRepository routeRepository;

    @Test
    void postRoute() throws Exception {
        User user = new User("hgd@gmail.com",  "1234", "홍길동");

//        ContentPostDto contentPost = new ContentPostDto("서울가자", "22.11.09", "서울", ThemeType.DOMESTIC, );

        RoutePostDto post = new RoutePostDto(1L, 1000, "자동차", "서울", "서울 대구 부산", 124.3,123.4,"서울시");

        RouteResponseDto responseBody = new RouteResponseDto(1L, 1L,1000, "자동차", "서울", "서울 대구 부산", 124.3,123.4,"서울시"
               );

        // Stubbing by Mockito
        given(routeMapper.routePostDtoToRoute(Mockito.any(RoutePostDto.class))).willReturn(new Route());

        given(routeService.createRoute(Mockito.any(Route.class))).willReturn(new Route());

        given(routeMapper.routeToRouteResponseDto(Mockito.any(Route.class))).willReturn(responseBody);

        String route = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/{contentId}/routes").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(route));
        // then
        MvcResult result = actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.contentId").value(post.getContentId()))
                .andExpect(jsonPath("$.price").value(post.getPrice()))
                .andExpect(jsonPath("$.vehicle").value(post.getVehicle()))
                .andExpect(jsonPath("$.place").value(post.getPlace()))
                .andExpect(jsonPath("$.body").value(post.getBody()))
                .andExpect(jsonPath("$.x").value(post.getX()))
                .andExpect(jsonPath("$.y").value(post.getY()))
                .andExpect(jsonPath("$.address").value(post.getAddress()))
                .andReturn();
    }

    @Test
    void getRoute() throws Exception {
        // given
        long routeId = 1L;

        Route route = new Route(1000, "자동차", "서울", "서울 대구 부산", 124.3,123.4,"서울시");
        route.setRouteId(routeId);

        RouteResponseDto response = new RouteResponseDto(1L, 1L,1000, "자동차", "서울", "서울 대구 부산", 124.3,123.4,"서울시");


        // Stubbing by Mockito
        given(routeService.findRoute(Mockito.anyLong())).willReturn(new Route());
        given(routeMapper.routeToRouteResponseDto(Mockito.any(Route.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/{contentId}/routes/{routeId}").buildAndExpand(routeId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.routeId").value(route.getRouteId()))
                .andExpect(jsonPath("$.price").value(route.getPrice()))
                .andExpect(jsonPath("$.vehicle").value(route.getVehicle()))
                .andExpect(jsonPath("$.place").value(route.getPlace()))
                .andExpect(jsonPath("$.body").value(route.getBody()))
                .andExpect(jsonPath("$.X").value(route.getX()))
                .andExpect(jsonPath("$.Y").value(route.getY()))
                .andExpect(jsonPath("$.Address").value(route.getAddress()));
    }

   /* @Test
    void getRoutes() throws Exception {
        // given: routeController의 getroutes()를 테스트하기 위해 postroute()를 이용해 테스트 데이터(2건)를 생성 후, DB에 저장
        RouteDto.RoutePost post1 = new RouteDto.RoutePost(1L,"제주");
        String postContent1 = gson.toJson(post1);
        URI postUri = UriComponentsBuilder.newInstance().path("/routes").build().toUri();

        mockMvc.perform(
                post(postUri)
                        .accept(MediaType.APPLICATION_JSON)    *//** 중복 *//*
                        .contentType(MediaType.APPLICATION_JSON)  *//** 중복 *//*
                        .content(postContent1)   *//** 중복 *//*
        );

        RouteDto.RoutePost post2 = new RouteDto.RoutePost(1L,"제주2");
        String postContent2 = gson.toJson(post2);

        mockMvc.perform(
                post(postUri)
                        .accept(MediaType.APPLICATION_JSON)    *//** 중복 *//*
                        .contentType(MediaType.APPLICATION_JSON)  *//** 중복 *//*
                        .content(postContent2)   *//** 중복 *//*
        );
        *//** 중복 코드 끝 *//*

        String page = "1";
        String size = "10";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        *//** 중복 *//*
        URI getUri = UriComponentsBuilder.newInstance().path("/routes").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        get(getUri)
                                .params(queryParams)
                                .accept(MediaType.APPLICATION_JSON)   *//** 중복 *//*
                );

        // then
        MvcResult result = actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");

        assertThat(list.size(), is(2));


    }*/

    @Test
    void patchRoute() throws Exception {
        long routeId = 1L;
        RoutePatchDto patch = new RoutePatchDto(1L,1L,10000, "택시", "비둘기가 많네용", "서울", 13.44,15.22,"신정동");

        RouteResponseDto response = new RouteResponseDto(1L,1L,10000, "택시", "비둘기가 많네용", "서울", 13.44,15.22,"신정동");


        // Stubbing by Mockito
        given(routeMapper.routePatchDtoToRoute(Mockito.any(RoutePatchDto.class))).willReturn(new Route());

        given(routeService.updateRoute(anyLong(),Mockito.any(Route.class))).willReturn(new Route());

        given(routeMapper.routeToRouteResponseDto(Mockito.any(Route.class))).willReturn(response);

        Gson gson = new Gson();
        String route = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/{contentId}/routes/{routeId}").buildAndExpand(routeId).toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .patch(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(route));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.contentId").value(patch.getContentId()))
                .andExpect(jsonPath("$.routeId").value(patch.getRouteId()))
                .andExpect(jsonPath("$.price").value(patch.getPrice()))
                .andExpect(jsonPath("$.vehicle").value(patch.getVehicle()))
                .andExpect(jsonPath("$.place").value(patch.getPlace()))
                .andExpect(jsonPath("$.body").value(patch.getBody()))
                .andExpect(jsonPath("$.X").value(patch.getX()))
                .andExpect(jsonPath("$.Y").value(patch.getY()))
                .andExpect(jsonPath("$.Address").value(patch.getAddress()));
    }

    @Test
    void deleteUser() throws Exception {
        long routeId = 1L;

        // Stubbing by Mockito
        doNothing().when(routeService).deleteRoute(routeId);

        // when
        ResultActions actions = mockMvc.perform(delete("/{contentId}/routes/{routeId}" + routeId));

        // then
        actions.andExpect(status().isNoContent());
    }
}