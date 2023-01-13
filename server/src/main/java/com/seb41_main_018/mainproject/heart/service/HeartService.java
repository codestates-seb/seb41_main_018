package com.seb41_main_018.mainproject.heart.service;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.heart.repository.HeartRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
import org.springframework.stereotype.Service;

import javax.management.ServiceNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import com.seb41_main_018.mainproject.exception.ExceptionCode

@Service
public class HeartService {
    private HeartRepository heartRepository;
    private ContentRepository contentRepository;
    private UserRepository userRepository;
    private ContentService contentService;
    private UserService userService;

    public HeartDto.Response saveHeart(Heart heart,Long contentId, Long userId) {
        User fineUser = userService.findVerifiedUser(userId);
        Content findContent = contentService.findVerifiedContent(contentId)
                .orElseThrow(() -> new ServiceNotFoundException(ExceptionCode.CONTENT_NOT_FOUND));

    }


