package com.seb41_main_018.mainproject.category.controller;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.seb41_main_018.mainproject.category.dto.CategoryDto;
import com.seb41_main_018.mainproject.category.entity.Category;
import com.seb41_main_018.mainproject.category.mapper.CategoryMapper;
import com.seb41_main_018.mainproject.category.service.CategoryService;
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
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
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
        URI uri = UriComponentsBuilder.newInstance().path("/categories").build().toUri();

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
                .andExpect(jsonPath("$.name").value(post.getName()))
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

        URI uri = UriComponentsBuilder.newInstance().path("/categories/{categoryId}").buildAndExpand(categoryId).toUri();

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
                .andExpect(jsonPath("$.name").value(patch.getName()));

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

        URI uri = UriComponentsBuilder.newInstance().path("/categories/{categoryId}").buildAndExpand(categoryId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(category.getName()));

    }

    @Test
    void getCategories() throws Exception {
        // given: categoryController의 getcategorys()를 테스트하기 위해 postcategory()를 이용해 테스트 데이터(2건)를 생성 후, DB에 저장
        CategoryDto.Post post1 = new CategoryDto.Post("제주");
        String postContent1 = gson.toJson(post1);
        URI postUri = UriComponentsBuilder.newInstance().path("/categories").build().toUri();

        mockMvc.perform(
                post(postUri)
                        .accept(MediaType.APPLICATION_JSON)    /** 중복 */
                        .contentType(MediaType.APPLICATION_JSON)  /** 중복 */
                        .content(postContent1)   /** 중복 */
        );

        CategoryDto.Post post2 = new CategoryDto.Post("제주2");
        String postContent2 = gson.toJson(post2);

        mockMvc.perform(
                post(postUri)
                        .accept(MediaType.APPLICATION_JSON)    /** 중복 */
                        .contentType(MediaType.APPLICATION_JSON)  /** 중복 */
                        .content(postContent2)   /** 중복 */
        );
        /** 중복 코드 끝 */

        String page = "1";
        String size = "10";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        /** 중복 */
        URI getUri = UriComponentsBuilder.newInstance().path("/categories").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                        get(getUri)
                                .params(queryParams)
                                .accept(MediaType.APPLICATION_JSON)   /** 중복 */
                );

        // then
        MvcResult result = actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");

        assertThat(list.size(), is(2));

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