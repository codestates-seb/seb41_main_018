package com.seb41_main_018.mainproject.content.controller;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@Transactional
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

        given(contentService.createContent(Mockito.any(Content.class),anyLong())).willReturn(new Content());

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
                .andExpect(jsonPath("$.title").value(post.getTitle()))
                .andExpect(jsonPath("$.body").value(post.getBody()))
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
        given(contentMapper.contentToContentResponse(Mockito.any(Content.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/contents/{contentId}").buildAndExpand(contentId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(content.getTitle()))
                .andExpect(jsonPath("$.body").value(content.getBody()));
    }

    /*@Test
    void getContents() throws Exception {
        // given: contentController의 getcontents()를 테스트하기 위해 postcontent()를 이용해 테스트 데이터(2건)를 생성 후, DB에 저장
        ContentDto.ContentPost post1 = new ContentDto.ContentPost(1L,
                "Algorithm to simplify a weighted directed graph of debts",
                "I've been using a little python script I wrote to manage debt amongst my roommates.");
        String postContent1 = gson.toJson(post1);
        URI postUri = UriComponentsBuilder.newInstance().path("/contents").build().toUri();

        mockMvc.perform(
                post(postUri)
                        .accept(MediaType.APPLICATION_JSON)    *//** 중복 *//*
                        .contentType(MediaType.APPLICATION_JSON)  *//** 중복 *//*
                        .content(postContent1)   *//** 중복 *//*
        );

        ContentDto.ContentPost post2 = new ContentDto.ContentPost(2L,
                "Algorithm to simplify a weighted directed graph of debts2",
                "I've been using a little python script I wrote to manage debt amongst my roommates2");
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
        URI getUri = UriComponentsBuilder.newInstance().path("/contents").build().toUri();

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
                .andExpect(jsonPath("$.content").isArray())
                .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");

        assertThat(list.size(), is(2));

    }*/

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
        given(contentMapper.contentPatchDtoToContent(Mockito.any(ContentDto.ContentPatch.class))).willReturn(new Content());

        given(contentService.updateContent(anyLong(),Mockito.any(Content.class))).willReturn(new Content());

        given(contentMapper.contentToContentResponse(Mockito.any(Content.class))).willReturn(response);

        Gson gson = new Gson();
        String content = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/contents/{contentId}").buildAndExpand(contentId).toUri();

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
                .andExpect(jsonPath("$.title").value(patch.getTitle()))
                .andExpect(jsonPath("$.body").value(patch.getBody()));
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