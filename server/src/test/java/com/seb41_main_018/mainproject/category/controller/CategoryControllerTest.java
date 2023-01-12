package com.seb41_main_018.mainproject.category.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.category.dto.CategoryDto;
import com.seb41_main_018.mainproject.category.entity.Category;
import com.seb41_main_018.mainproject.category.mapper.CategoryMapper;
import com.seb41_main_018.mainproject.category.service.CategoryService;
import com.seb41_main_018.mainproject.user.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CategoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private CategoryMapper categoryMapper;
    @Test
    void postCategory() throws Exception {
        // given
        User user = new User("hgd@gmail.com","1234",
                "홍길동",
                true);

        CategoryDto.Post post = new CategoryDto.Post( "홍길동");
        CategoryDto.Response responseBody = new CategoryDto.Response(1L,
                "홍길동");

        // Stubbing by Mockito
        given(categoryMapper.categoryPostDtoToCategory(Mockito.any(CategoryDto.Post.class))).willReturn(new Category());

        given(categoryService.createCategory(Mockito.any(Category.class))).willReturn(new Category());

        given(categoryMapper.categoryToCategoryResponseDto(Mockito.any(Category.class))).willReturn(responseBody);

        Gson gson = new Gson();
        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/categorys").build().toUri();

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
                .andExpect(jsonPath("$.data.text").value(post.getName()))
                .andReturn();
    }

    @Test
    void patchCategory() throws Exception {
        // given
        long categoryId = 1L;

        CategoryDto.Patch patch = new CategoryDto.Patch(1L, "홍길동");

        CategoryDto.Response response = new CategoryDto.Response(1L,
                "홍길동");

        // Stubbing by Mockito
        given(categoryMapper.categoryPatchDtoToCategory(Mockito.any(CategoryDto.Patch.class))).willReturn(new Category());

        given(categoryService.updateCategory(Mockito.any(Category.class))).willReturn(new Category());

        given(categoryMapper.categoryToCategoryResponseDto(Mockito.any(Category.class))).willReturn(response);

        Gson gson = new Gson();
        String content = gson.toJson(patch);

        URI uri = UriComponentsBuilder.newInstance().path("/categorys/{categoryId}").buildAndExpand(categoryId).toUri();

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
                .andExpect(jsonPath("$.data.text").value(patch.getName()));

    }

    @Test
    void getCategory() throws Exception {
        // given
        long categoryId = 1L;
        Category category = new Category();
        category.setCategoryId(categoryId);

        CategoryDto.Response response = new CategoryDto.Response(1L,
                "홍길동");
        // Stubbing by Mockito
        given(categoryService.findCategory(Mockito.anyLong())).willReturn(new Category());
        given(categoryMapper.categoryToCategoryResponseDto(Mockito.any(Category.class))).willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/categorys/{categoryId}").buildAndExpand(categoryId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.text").value(category.getName()));

    }

    @Test
    void getCategories() {
    }

    @Test
    void deleteCategory() throws Exception {
        // given
        long categoryId = 1L;

        // Stubbing by Mockito
        doNothing().when(categoryService).deleteCategory(categoryId);

        // when
        ResultActions actions = mockMvc.perform(delete("/categories/" + categoryId));

        // then
        actions.andExpect(status().isNoContent());
    }
}