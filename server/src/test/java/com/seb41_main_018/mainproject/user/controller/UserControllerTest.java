package com.seb41_main_018.mainproject.user.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.constant.UserStatus;
import com.seb41_main_018.mainproject.user.dto.UserPatchDto;
import com.seb41_main_018.mainproject.user.dto.UserPostDto;
import com.seb41_main_018.mainproject.user.dto.UserResponseDto;
import com.seb41_main_018.mainproject.user.mapper.UserMapper;
import com.seb41_main_018.mainproject.user.service.UserService;
import com.seb41_main_018.mainproject.user.entity.User;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.Test;
import com.jayway.jsonpath.JsonPath;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;
import java.net.URI;
import org.springframework.web.util.UriComponentsBuilder;

import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.ArgumentMatchers.startsWith;
import static org.mockito.BDDMockito.given;

import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private UserService userService;

    @MockBean
    private UserMapper userMapper;

    @Test
    void postUserTest() throws Exception {
        //given
        UserPostDto post = new UserPostDto("hgd@gmail.com","qwer1234!","길동길동",true);
//

        given(userMapper.userPostDtoToUser(Mockito.any(UserPostDto.class))).willReturn(new User());

        // Stubbing by Mockito
        User mockResultUser = new User();
        mockResultUser.setUserId(1L);
        given(userService.createUser(Mockito.any(User.class))).willReturn(mockResultUser);

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/users").build().toUri();
        //when
        ResultActions actions = mockMvc.perform(
                        MockMvcRequestBuilders
                        .post(uri)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));
                //then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location",is(startsWith("/users"))));

    }

    @Test
        void pathchUserTest() throws Exception{
        //given
        long userId = 1L;
        UserPatchDto patch = new UserPatchDto(1L, "hgd@gmail.com","qwer1234!","길동길동",true, UserStatus.ACTIVITY);
        UserResponseDto response = new UserResponseDto(1L, "hgd@gmail.com", "qwer1234!", "길동길동", true, UserStatus.ACTIVITY);

    // Stubbing by Mockito
    given(userMapper.userPatchDtoToUser(Mockito.any(UserPatchDto.class))).willReturn(new User());
    given(userService.updateUser(Mockito.any(User.class))).willReturn(new User());
    given(userMapper.userToUserResponseDto(Mockito.any(User.class))).willReturn(response);

    Gson gson = new Gson();
    String content = gson.toJson(patch);

    URI uri = UriComponentsBuilder.newInstance().path("/users/{userId}").buildAndExpand(userId).toUri();

    // when
    ResultActions actions =
            mockMvc.perform(
                    MockMvcRequestBuilders
                            .patch(uri)
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(content));

    // then
        actions.andExpect(status().isOk())
            .andExpect(jsonPath("$.data.userId").value(patch.getUserId()))
            .andExpect(jsonPath("$.data.email").value(patch.getEmail()))
            .andExpect(jsonPath("$.data.nickname").value(patch.getNickname()))
            .andExpect(jsonPath("$.data.password").value(patch.getPassword()));
    }
    @Test
    void getUserTest() throws Exception{
        //given
        long userId = 1L;
        User user = new User();
        user.setUserId(userId);

        UserResponseDto responseDto = new UserResponseDto(1L, "hgd@gmail.com", "qwer1234!", "길동길동", true, UserStatus.ACTIVITY);
        given(userService.findUser(Mockito.anyLong())).willReturn(new User());
        given(userMapper.userToUserResponseDto(Mockito.any(User.class))).willReturn(responseDto);

        URI uri = UriComponentsBuilder.newInstance().path("/users/{userId}").buildAndExpand(userId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.email").value(user.getEmail()))
                .andExpect(jsonPath("$.data.nickname").value(user.getNickname()))
                .andExpect(jsonPath("$.data.password").value(user.getPassword()));
    }
    @Test
    void deleteUserTest() throws Exception {
        //given
        long userId = 1L;

        // Stubbing by Mockito
        doNothing().when(userService).deleteUser(userId);

        // when
        ResultActions actions = mockMvc.perform(delete("/users/" + userId));

        // then
        actions.andExpect(status().isNoContent());

    }
}