package com.seb41_main_018.mainproject.content.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.mapper.ContentMapper;
import com.seb41_main_018.mainproject.content.service.ContentService;
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
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private ContentService contentService;

    @MockBean
    private ContentMapper contentMapper;

    @Test
    void postContent() throws Exception {
        User user = new User("hgd@gmail.com", "1234",
                "홍길동",
                true);

        ContentDto.ContentPost post = new ContentDto.ContentPost(1L,
                "Algorithm to simplify a weighted directed graph of debts",
                "I've been using a little python script I wrote to manage debt amongst my roommates.");
        ContentDto.ContentResponse responseBody = new ContentDto.ContentResponse(1L,
                1L,
                "Algorithm to simplify a weighted directed graph of debts",
                "I've been using a little python script I wrote to manage debt amongst my roommates.");

        // Stubbing by Mockito
        given(contentMapper.contentPostDtoToContent(Mockito.any(ContentDto.ContentPost.class))).willReturn(new Content());

        given(contentService.createContent(Mockito.any(Content.class))).willReturn(new Content());

        given(contentMapper.contentToContentResponse(Mockito.any(Content.class))).willReturn(responseBody);

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/contents").build().toUri();

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
                .andExpect(jsonPath("$.data.userId").value(post.getUserId()))
                .andExpect(jsonPath("$.data.title").value(post.getTitle()))
                .andExpect(jsonPath("$.data.body").value(post.getBody()))
                .andReturn();
    }

    @Test
    void getContent() throws Exception {
        // given
        long contentId = 1L;

        Content content = new Content("Algorithm to simplify a weighted directed graph of debts",
                "I've been using a little python script I wrote to manage debt amongst my roommates.");
        content.setContentId(contentId);

        ContentDto.ContentResponse response = new ContentDto.ContentResponse(1L,
                1L,
                "Algorithm to simplify a weighted directed graph of debts",
                "I've been using a little python script I wrote to manage debt amongst my roommates.");


        // Stubbing by Mockito
        given(contentService.findContent(Mockito.anyLong())).willReturn(new Content());
        given(ContentMapper.contentToContentResponse(Mockito.any(Content.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/contents/{content-id}").buildAndExpand(contentId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value(content.getTitle()))
                .andExpect(jsonPath("$.data.body").value(content.getBody()));
    }

    @Test
    void getContents() {
    }

    @Test
    void patchContent() throws Exception {
        long contentId = 1L;
        ContentDto.ContentPatch patch = new ContentDto.ContentPatch(1L,
                1L,
                "Patch:Algorithm to simplify a weighted directed graph of debts",
                "Patch:I've been using a little python script I wrote to manage debt amongst my roommates.");

        ContentDto.ContentResponse response = new ContentDto.ContentResponse(1L,
                1L,
                "Patch:Algorithm to simplify a weighted directed graph of debts",
                "Patch:I've been using a little python script I wrote to manage debt amongst my roommates.");


        // Stubbing by Mockito
        given(ContentMapper.contentPatchDtoToContent(Mockito.any(ContentDto.ContentPatch.class))).willReturn(new Content());

        given(contentService.updateContent(1L,Mockito.any(Content.class),"제주")).willReturn(new Content());

        given(ContentMapper.contentToContentResponse(Mockito.any(Content.class))).willReturn(response);

        Gson gson = new Gson();
        String content = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/contents/{content-id}").buildAndExpand(contentId).toUri();

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
                .andExpect(jsonPath("$.data.title").value(patch.getTitle()))
                .andExpect(jsonPath("$.data.body").value(patch.getBody()));
    }

    @Test
    void deleteContent() throws Exception {
        // given
        long contentId = 1L;

        // Stubbing by Mockito
        doNothing().when(contentService).deleteContent(contentId);

        // when
        ResultActions actions = mockMvc.perform(delete("/contents/" + contentId));

        // then
        actions.andExpect(status().isNoContent());
    }
}