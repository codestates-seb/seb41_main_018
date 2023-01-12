package com.seb41_main_018.mainproject.comment.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.comment.dto.CommentDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.mapper.CommentMapper;
import com.seb41_main_018.mainproject.comment.service.CommentService;
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

import javax.transaction.Transactional;
import java.net.URI;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
class CommentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private CommentService commentService;

    @MockBean
    private CommentMapper commentMapper;
    @Test
    void postCommentTest() throws Exception {
        // given
        User user = new User("hgd@gmail.com","1234",
                "홍길동",
                true);

        CommentDto.Post post = new CommentDto.Post( 1L,1L,"홍길동은 아버지를 아버지라 부르지 못했다.");
        CommentDto.Response responseBody = new CommentDto.Response(1L,
                1L,1L,"홍길동은 아버지를 아버지라 부르지 못했다.");

        // Stubbing by Mockito
        given(commentMapper.commentPostDtoToComment(Mockito.any(CommentDto.Post.class))).willReturn(new Comment());

        given(commentService.createComment(Mockito.any(Comment.class),1L,1L)).willReturn(new Comment());

        given(commentMapper.commentToCommentResponseDto(Mockito.any(Comment.class))).willReturn(responseBody);

        Gson gson = new Gson();
        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/comments").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));
        // then
        MvcResult result = actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.text").value(post.getBody()))
                .andReturn();

//        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void patchCommentTest() throws Exception {
        // given
        long commentId = 1L;

        CommentDto.Patch patch = new CommentDto.Patch(1L,
                1L,1L,"홍길동은 아버지를 아버지라 부르지 못했다. 어머니는 어머니라 불렀을까? 형은 뭐라고 불렀을까?");

        CommentDto.Response response = new CommentDto.Response(1L,
                1L,1L,"홍길동은 아버지를 아버지라 부르지 못했다. 어머니는 어머니라 불렀을까? 형은 뭐라고 불렀을까?");

        // Stubbing by Mockito
        given(commentMapper.commentPatchDtoToComment(Mockito.any(CommentDto.Patch.class))).willReturn(new Comment());

        given(commentService.updateComment(Mockito.any(Comment.class),1L)).willReturn(new Comment());

        given(commentMapper.commentToCommentResponseDto(Mockito.any(Comment.class))).willReturn(response);

        Gson gson = new Gson();
        String content = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/comments/{commentId}").buildAndExpand(commentId).toUri();

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
                .andExpect(jsonPath("$.data.text").value(patch.getBody()));
    }

    @Test
    void getCommentTest() throws Exception {
        // given
        long commentId = 1L;
        Comment comment = new Comment();
        comment.setCommentId(commentId);

        CommentDto.Response response = new CommentDto.Response(1L,
                1L,1L,"홍길동");
        // Stubbing by Mockito
        given(commentService.findComment(Mockito.anyLong())).willReturn(new Comment());
        given(commentMapper.commentToCommentResponseDto(Mockito.any(Comment.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/comments/{commentId}").buildAndExpand(commentId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.text").value(comment.getBody()));
    }

    @Test
    void deleteCommentTest() throws Exception {
        // given
        long commentId = 1L;

        // Stubbing by Mockito
        doNothing().when(commentService).deleteComment(commentId);

        // when
        ResultActions actions = mockMvc.perform(delete("/comments/" + commentId));

        // then
        actions.andExpect(status().isNoContent());
    }
}
