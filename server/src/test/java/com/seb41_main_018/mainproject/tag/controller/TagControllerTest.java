package com.seb41_main_018.mainproject.tag.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.tag.dto.TagDto;
import com.seb41_main_018.mainproject.tag.dto.tagDto;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.entity.tag;
import com.seb41_main_018.mainproject.tag.mapper.TagMapper;
import com.seb41_main_018.mainproject.tag.mapper.tagMapper;
import com.seb41_main_018.mainproject.tag.service.TagService;
import com.seb41_main_018.mainproject.tag.service.tagService;
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

        given(tagService.createTag(Mockito.any(Tag.class))).willReturn(new Tag());

        given(tagMapper.tagToTagResponse(Mockito.any(Tag.class))).willReturn(responseBody);

        String tag = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/tags").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(tag));
        // then
        MvcResult result = actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.contentId").value(post.getContentId()))
                .andExpect(jsonPath("$.data.name").value(post.getName()))
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

        URI uri = UriComponentsBuilder.newInstance().path("/tags/{tag-id}").buildAndExpand(tagId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.tagId").value(tag.getTagId()))
                .andExpect(jsonPath("$.data.name").value(tag.getName()));

    }

    @Test
    void getTags() {
    }

    @Test
    void patchTag() throws Exception {
        long tagId = 1L;
        TagDto.TagPatch patch = new TagDto.TagPatch(
                1L,1L, "제주");

        TagDto.TagResponse response = new TagDto.TagResponse(1L,1L, "제주");


        // Stubbing by Mockito
        given(tagMapper.tagPatchDtoToTag(Mockito.any(TagDto.TagPatch.class))).willReturn(new Tag());

        given(tagService.updateTag(Mockito.any(Tag.class))).willReturn(new Tag());

        given(tagMapper.tagToTagResponse(Mockito.any(Tag.class))).willReturn(response);

        Gson gson = new Gson();
        String tag = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/tags/{tag-id}").buildAndExpand(tagId).toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        MockMvcRequestBuilders
                                .patch(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(tag));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.tagId").value(patch.getTagId()))
                .andExpect(jsonPath("$.data.contentId").value(patch.getContentId()))
                .andExpect(jsonPath("$.data.name").value(patch.getName()));

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