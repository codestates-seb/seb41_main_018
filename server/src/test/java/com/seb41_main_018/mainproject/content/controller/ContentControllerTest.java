package com.seb41_main_018.mainproject.content.controller;

import com.google.gson.Gson;
import com.seb41_main_018.mainproject.content.mapper.ContentMapper;
import com.seb41_main_018.mainproject.content.service.ContentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

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
    void postContent() {
    }

    @Test
    void getContent() {
    }

    @Test
    void getContents() {
    }

    @Test
    void patchContent() {
    }

    @Test
    void deleteContent() {
    }
}