package com.seb41_main_018.mainproject.user.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.constant.UserStatus;
import com.seb41_main_018.mainproject.user.dto.UserPatchDto;
import com.seb41_main_018.mainproject.user.dto.UserPostDto;
import com.seb41_main_018.mainproject.user.dto.UserResponseDto;
import com.seb41_main_018.mainproject.user.mapper.UserMapper;
import com.seb41_main_018.mainproject.user.service.UserService;
import com.seb41_main_018.mainproject.user.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import static org.mockito.BDDMockito.given;
import org.springframework.http.MediaType;
import java.net.URI;
import org.springframework.web.util.UriComponentsBuilder;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
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
                .andExpect(status().isCreated());
                //.andExpect(header().string("Location",is(startsWith("/users"))));

    }

    @Test
        void patchUserTest() throws Exception{
        long userId = 1L;
        UserPatchDto patch = new UserPatchDto(userId, "hgd@naver.com", "qwer1234!","길동길동",true,UserStatus.ACTIVITY);

        UserResponseDto response = new UserResponseDto(userId, "hgd@naver.com", "길동길동","qwer1234!",true,UserStatus.ACTIVITY);;

        Gson gson = new Gson();
        String requestToJson = gson.toJson(patch);

        given(userMapper.userPatchDtoToUser(Mockito.any(UserPatchDto.class))).willReturn(new User());
        given(userService.updateUser(Mockito.any(User.class))).willReturn(new User());
        given(userMapper.userToUserResponseDto(Mockito.any(User.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/users/{userId}").buildAndExpand(userId).toUri();

        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .patch(uri)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestToJson)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value(patch.getNickname()));

    }
    @Test
    void getUserTest() throws Exception{
        //given
        long userId = 1L;
        User user = new User("hgd@gmail.com","qwer1234!", "길동길동", true);
        user.setUserStatus(UserStatus.ACTIVITY);

        UserResponseDto response = new UserResponseDto(1L,
                "hgd@gmail.com",
                "길동길동",
                "qwer1234!",
                true,
                UserStatus.ACTIVITY);

        // Stubbing by Mockito
        given(userService.findUser(Mockito.anyLong())).willReturn(new User());
        given(userMapper.userToUserResponseDto(Mockito.any(User.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/users/{userId}").buildAndExpand(userId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.password").value(user.getPassword()))
                .andExpect(jsonPath("$.nickname").value(user.getNickname()))
                .andExpect(jsonPath("$.email_subscribe").value(user.getEmail_subscribe()));
                //.andExpect(jsonPath("$.userStatus").value(user.getUserStatus()));
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