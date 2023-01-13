package com.seb41_main_018.mainproject.heart.service;

import com.seb41_main_018.mainproject.constant.HeartType;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.heart.repository.HeartRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class HeartService {
    private HeartRepository heartRepository;
    private ContentRepository contentRepository;
    private UserRepository userRepository;
    private ContentService contentService;
    private UserService userService;

    public Heart createHeart(Heart heart, Long contentId, Long userId) {
        User findUser = userService.findVerifiedUser(userId);
        Content findContent = contentRepository.findById(contentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND));
        verifiedContent(findContent, userId);
        heart.addUser(findUser);
        heart.addContent(findContent);

        return heartRepository.save(heart);
    }

    public Heart updateHeart(Heart heart, Long heartId) {
        return null;
    }

    public Heart findVerifiedHeart(Long heartId) {
        Optional<Heart> optionalHeart = heartRepository.findById(heartId);
        Heart heart = optionalHeart.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.HEART_NOT_FOUND)
        );
        return heart;
    }

    private void verifiedContent(Content content, Long userId) {
        Optional<Heart> first = content.getHearts().stream()
                .filter(heart -> heart.getUser().getUserId().equals(userId))
                .findFirst();
        if (first.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.HEART_EXISTS);
        }
    }
}



