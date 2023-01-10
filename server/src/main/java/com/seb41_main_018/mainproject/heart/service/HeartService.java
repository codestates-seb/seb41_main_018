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

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class HeartService {
    private HeartRepository heartRepository;
    private ContentRepository contentRepository;
    private UserRepository userRepository;
    private ContentService contentService;
    private UserService userService;

    public HeartDto.Response saveHeart(Long contentId, Long userId) {
        Content findContent = contentService.findVerifiedContent(contentId);
        User findUser = userService.findVerifiedUser(userId);
        List<Heart> hearts = heartRepository.findAllByUserAndContent(findUser, findContent);

        if(hearts.isEmpty()) { //좋아요 목록이 없을 경우
            Heart createdHeart = createHeart(findUser, findContent);
            heartRepository.save(createdHeart);
        } else {
            heartRepository.deleteAll(hearts);
        }
        return HeartDto.Response.builder()
                .userId(userId)
                .heartCount(heartRepository
                        .findAllByContent(findContent)
                        .size())
                .contentId(contentId)
                .build();
    }
        private Heart createHeart(User user, Content content){
            return Heart.builder()
                    .user(user)
                    .content(content)
                    .build();
        }
    }


