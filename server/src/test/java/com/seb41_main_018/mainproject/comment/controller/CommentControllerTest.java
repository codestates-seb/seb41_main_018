package com.seb41_main_018.mainproject.comment.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.auth.jwt.JwtTokenizer;
import com.seb41_main_018.mainproject.comment.dto.CommentPatchDto;
import com.seb41_main_018.mainproject.comment.dto.CommentPostDto;
import com.seb41_main_018.mainproject.comment.dto.CommentResponseDto;
import com.seb41_main_018.mainproject.comment.entity.Comment;
import com.seb41_main_018.mainproject.comment.mapper.CommentMapper;
import com.seb41_main_018.mainproject.comment.service.CommentService;
import com.seb41_main_018.mainproject.constant.RatingType;
import com.seb41_main_018.mainproject.user.entity.User;
import org.junit.jupiter.api.BeforeAll;
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
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class CommentControllerTest {

    private static JwtTokenizer jwtTokenizer;
    private String secretKey;
    private String base64EncodedSecretKey;
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

        User user = new User("hgd@gmail.com","1234"
                ,"홍길동");



        CommentPostDto post = new CommentPostDto( 1L,"좋은 여행 정보 공유해주셔서 감사합니다!", RatingType.FIVE);
        CommentResponseDto responseBody = new CommentResponseDto(1L,
                1L,1L,"좋은 여행 정보 공유해주셔서 감사합니다!", "좋은 여행 정보 공유해주셔서 감사합니다!", RatingType.FIVE, "홍길동", LocalDateTime.now() , LocalDateTime.now(), "셀카.png");

        // Stubbing by Mockito
        given(commentMapper.commentPostDtoToComment(Mockito.any(CommentPostDto.class))).willReturn(new Comment());

        given(commentService.createComment(Mockito.any(Comment.class),anyLong())).willReturn(new Comment());

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
                .andExpect(jsonPath("$.title").value(post.getBody()))
                .andExpect(jsonPath("$.body").value(post.getBody()))
                .andReturn();

//        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void patchCommentTest() throws Exception {
        // given
        long commentId = 1L;

        CommentPatchDto patch = new CommentPatchDto(1L,
                1L,1L,"좋은 여행 정보 군요!",RatingType.FOUR);
        CommentResponseDto response = new CommentResponseDto(1L,
                1L,1L,"좋은 여행 정보 군요!", "좋은 여행 정보 군요!", RatingType.FOUR, "홍길동", LocalDateTime.now() , LocalDateTime.now(), "셀카.png");

        // Stubbing by Mockito
        given(commentMapper.commentPatchDtoToComment(Mockito.any(CommentPatchDto.class))).willReturn(new Comment());

        given(commentService.updateComment(Mockito.any(Comment.class),anyLong())).willReturn(new Comment());

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
                .andExpect(jsonPath("$.body").value(patch.getBody()));
    }

    @Test
    void getCommentTest() throws Exception {
        // given
        long commentId = 1L;
        Comment comment = new Comment("홍길동");
        comment.setCommentId(commentId);

        CommentResponseDto response = new CommentResponseDto(1L,
                1L,1L,"홍길동", "홍길동",RatingType.FOUR, "홍길동", LocalDateTime.now() , LocalDateTime.now(), "셀카.png");
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
                .andExpect(jsonPath("$.body").value(comment.getBody()));
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
