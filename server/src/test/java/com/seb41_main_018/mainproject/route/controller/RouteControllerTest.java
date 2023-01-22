//package com.seb41_main_018.mainproject.route.controller;
//
//import com.google.gson.Gson;
//import com.jayway.jsonpath.JsonPath;
//import com.seb41_main_018.mainproject.route.dto.RouteDto;
//import com.seb41_main_018.mainproject.route.entity.Route;
//import com.seb41_main_018.mainproject.route.mapper.RouteMapper;
//import com.seb41_main_018.mainproject.route.repository.RouteRepository;
//import com.seb41_main_018.mainproject.route.service.RouteService;
//import com.seb41_main_018.mainproject.user.entity.User;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import java.net.URI;
//import java.util.List;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.is;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//@SpringBootTest
//@AutoConfigureMockMvc
//class RouteControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private RouteService routeService;
//
//    @MockBean
//    private RouteMapper routeMapper;
//    @Autowired
//    private RouteRepository routeRepository;
//
//    @Test
//    void postRoute() throws Exception {
//        User user = new User("hgd@gmail.com", "1234",
//                "홍길동",
//                true);
//
//        RouteDto.RoutePost post = new RouteDto.RoutePost(1L,
//                "제주");
//        RouteDto.RouteResponse responseBody = new RouteDto.RouteResponse(1L,
//                1L,
//                "제주"
//               );
//
//        // Stubbing by Mockito
//        given(routeMapper.routePostDtoToRoute(Mockito.any(RouteDto.RoutePost.class))).willReturn(new Route());
//
//        given(routeService.createRoute(Mockito.any(Route.class),anyLong())).willReturn(new Route());
//
//        given(routeMapper.routeToRouteResponse(Mockito.any(Route.class))).willReturn(responseBody);
//
//        String route = gson.toJson(post);
//        URI uri = UriComponentsBuilder.newInstance().path("/routes").build().toUri();
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        MockMvcRequestBuilders
//                                .post(uri)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(route));
//        // then
//        MvcResult result = actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.contentId").value(post.getContentId()))
//                .andExpect(jsonPath("$.name").value(post.getName()))
//                .andReturn();
//    }
//
//    @Test
//    void getRoute() throws Exception {
//        // given
//        long routeId = 1L;
//
//        Route route = new Route(1L,"제주");
//        route.setRouteId(routeId);
//
//        RouteDto.RouteResponse response = new RouteDto.RouteResponse(1L,
//                1L,
//                "제주");
//
//
//        // Stubbing by Mockito
//        given(routeService.findRoute(Mockito.anyLong())).willReturn(new Route());
//        given(routeMapper.routeToRouteResponse(Mockito.any(Route.class))).willReturn(response);
//
//        URI uri = UriComponentsBuilder.newInstance().path("/routes/{route-id}").buildAndExpand(routeId).toUri();
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                MockMvcRequestBuilders
//                        .get(uri)
//                        .accept(MediaType.APPLICATION_JSON));
//
//        // then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.routeId").value(route.getRouteId()))
//                .andExpect(jsonPath("$.name").value(route.getName()));
//    }
//
//   /* @Test
//    void getRoutes() throws Exception {
//        // given: routeController의 getroutes()를 테스트하기 위해 postroute()를 이용해 테스트 데이터(2건)를 생성 후, DB에 저장
//        RouteDto.RoutePost post1 = new RouteDto.RoutePost(1L,"제주");
//        String postContent1 = gson.toJson(post1);
//        URI postUri = UriComponentsBuilder.newInstance().path("/routes").build().toUri();
//
//        mockMvc.perform(
//                post(postUri)
//                        .accept(MediaType.APPLICATION_JSON)    *//** 중복 *//*
//                        .contentType(MediaType.APPLICATION_JSON)  *//** 중복 *//*
//                        .content(postContent1)   *//** 중복 *//*
//        );
//
//        RouteDto.RoutePost post2 = new RouteDto.RoutePost(1L,"제주2");
//        String postContent2 = gson.toJson(post2);
//
//        mockMvc.perform(
//                post(postUri)
//                        .accept(MediaType.APPLICATION_JSON)    *//** 중복 *//*
//                        .contentType(MediaType.APPLICATION_JSON)  *//** 중복 *//*
//                        .content(postContent2)   *//** 중복 *//*
//        );
//        *//** 중복 코드 끝 *//*
//
//        String page = "1";
//        String size = "10";
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("page", page);
//        queryParams.add("size", size);
//
//        *//** 중복 *//*
//        URI getUri = UriComponentsBuilder.newInstance().path("/routes").build().toUri();
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        get(getUri)
//                                .params(queryParams)
//                                .accept(MediaType.APPLICATION_JSON)   *//** 중복 *//*
//                );
//
//        // then
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").isArray())
//                .andReturn();
//
//        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");
//
//        assertThat(list.size(), is(2));
//
//
//    }*/
//
//    @Test
//    void patchRoute() throws Exception {
//        long routeId = 1L;
//        RouteDto.RoutePatch patch = new RouteDto.RoutePatch(1L,
//                1L,
//                "제주");
//
//        RouteDto.RouteResponse response = new RouteDto.RouteResponse(1L,
//                1L,
//                "제주");
//
//
//        // Stubbing by Mockito
//        given(routeMapper.routePatchDtoToRoute(Mockito.any(RouteDto.RoutePatch.class))).willReturn(new Route());
//
//        given(routeService.updateRoute(anyLong(),Mockito.any(Route.class))).willReturn(new Route());
//
//        given(routeMapper.routeToRouteResponse(Mockito.any(Route.class))).willReturn(response);
//
//        Gson gson = new Gson();
//        String route = gson.toJson(patch);
//
//        URI uri = UriComponentsBuilder.newInstance().path("/routes/{route-id}").buildAndExpand(routeId).toUri();
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        MockMvcRequestBuilders
//                                .patch(uri)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(route));
//
//        // then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.routeId").value(patch.getRouteId()))
//                .andExpect(jsonPath("$.contentId").value(patch.getContentId()))
//                .andExpect(jsonPath("$.name").value(patch.getName()));
//    }
//
//    @Test
//    void deleteUser() throws Exception {
//        long routeId = 1L;
//
//        // Stubbing by Mockito
//        doNothing().when(routeService).deleteRoute(routeId);
//
//        // when
//        ResultActions actions = mockMvc.perform(delete("/routes/" + routeId));
//
//        // then
//        actions.andExpect(status().isNoContent());
//    }
//}