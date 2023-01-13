package com.seb41_main_018.mainproject.tag.controller;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.mapper.TagMapper;
import com.seb41_main_018.mainproject.tag.service.TagService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
class TagControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private TagService tagService;

    @MockBean
    private TagMapper tagMapper;
    @Test
    void postTag() throws Exception {
        User user = new User("hgd@gmail.com", "1234",
                "홍길동",
                true);

        TagDto.TagPost post = new TagDto.TagPost(1L,
                "제주");
        TagDto.TagResponse responseBody = new TagDto.TagResponse(1L,
                1L,
                "제주");

        // Stubbing by Mockito
        given(tagMapper.tagPostDtoToTag(Mockito.any(TagDto.TagPost.class))).willReturn(new Tag());

        given(tagService.createTag(Mockito.any(Tag.class),anyLong())).willReturn(new Tag());

        given(tagMapper.tagToTagResponse(Mockito.any(Tag.class))).willReturn(responseBody);

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/tags").build().toUri();

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
                .andExpect(jsonPath("$.contentId").value(post.getContentId()))
                .andExpect(jsonPath("$.name").value(post.getName()))
                .andReturn();
    }

    @Test
    void getTag() throws Exception {
        // given
        long tagId = 1L;

        Tag tag = new Tag("제주");
        tag.setTagId(tagId);

        TagDto.TagResponse response = new TagDto.TagResponse(1L,1L,"제주");


        // Stubbing by Mockito
        given(tagService.findTag(Mockito.anyLong())).willReturn(new Tag());
        given(tagMapper.tagToTagResponse(Mockito.any(Tag.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/tags/{tagId}").buildAndExpand(tagId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.tagId").value(tag.getTagId()))
                .andExpect(jsonPath("$.name").value(tag.getName()));

    }

    /*@Test
    void getTags() throws Exception {
        // given: tagController의 gettags()를 테스트하기 위해 posttag()를 이용해 테스트 데이터(2건)를 생성 후, DB에 저장
        TagDto.TagPost post1 = new TagDto.TagPost(1L,"제주");
        String postContent1 = gson.toJson(post1);
        URI postUri = UriComponentsBuilder.newInstance().path("/tags").build().toUri();

        mockMvc.perform(
                post(postUri)
                        .accept(MediaType.APPLICATION_JSON)    *//** 중복 *//*
                        .contentType(MediaType.APPLICATION_JSON)  *//** 중복 *//*
                        .content(postContent1)   *//** 중복 *//*
        );

        TagDto.TagPost post2 = new TagDto.TagPost(1L,"제주2");
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
        URI getUri = UriComponentsBuilder.newInstance().path("/tags").build().toUri();

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
                .andExpect(jsonPath("$.").isArray())
                .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");

        assertThat(list.size(), is(2));

//        System.out.println(result.getResponse().getContentAsString());
    }*/

    @Test
    void patchTag() throws Exception {
        long tagId = 1L;
        TagDto.TagPatch patch = new TagDto.TagPatch(
                1L,1L, "제주");

        TagDto.TagResponse response = new TagDto.TagResponse(1L,1L, "제주");


        // Stubbing by Mockito
        given(tagMapper.tagPatchDtoToTag(Mockito.any(TagDto.TagPatch.class))).willReturn(new Tag());

        given(tagService.updateTag(anyLong(),Mockito.any(Tag.class))).willReturn(new Tag());

        given(tagMapper.tagToTagResponse(Mockito.any(Tag.class))).willReturn(response);

        Gson gson = new Gson();
        String content = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/tags/{tag-id}").buildAndExpand(tagId).toUri();

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
                .andExpect(jsonPath("$.tagId").value(patch.getTagId()))
                .andExpect(jsonPath("$.contentId").value(patch.getContentId()))
                .andExpect(jsonPath("$.name").value(patch.getName()));

    }

    @Test
    void deleteTag() throws Exception {
        long tagId = 1L;

        // Stubbing by Mockito
        doNothing().when(tagService).deleteTag(tagId);

        // when
        ResultActions actions = mockMvc.perform(delete("/tags/" + tagId));

        // then
        actions.andExpect(status().isNoContent());
    }
}