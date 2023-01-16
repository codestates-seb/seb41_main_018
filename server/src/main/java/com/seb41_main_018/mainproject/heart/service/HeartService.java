package com.seb41_main_018.mainproject.heart.service;

import com.seb41_main_018.mainproject.constant.HeartType;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.content.service.ContentService;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.heart.dto.HeartDto;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.heart.repository.HeartRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final ContentRepository contentRepository;


    public Heart createHeart(User user, Content content){
        Heart heart;
        int heartStatus =0;
        //좋아요 안했을 경우
        if (isNotAlreadyHeart(user, content)) {
            heart = new Heart(user,content);
            heart.setHeartType(HeartType.ADD);
            heartStatus = 1;
        }else{//좋아요를 했지만 취소했을 경우
            heart = findVerifiedHeart(user,content);
            switch(heart.getHeartType()){
                case ADD:
                    heart.setHeartType(HeartType.REMOVE);
                    heartStatus = -1;
                    break;
                case REMOVE:
                    heart.setHeartType(HeartType.ADD);
                    heartStatus = 1;
                    break;
                default:
            }
        }
        int heartCount = content.getHeartCount();
        heartCount+=heartStatus;
        content.setHeartCount(heartCount);
        contentRepository.save(content);
        Heart SavedHeart = heartRepository.save(heart);
        return SavedHeart;
    }

    public Heart findVerifiedHeart(User user,Content content) {
        Optional<Heart> optionalHeart = heartRepository.findByUserAndContent(user, content);
        Heart heart = optionalHeart.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.HEART_NOT_FOUND)
        );
        return heart;
    }

    private boolean isNotAlreadyHeart(User user, Content content) {
        return heartRepository.findByUserAndContent(user, content).isEmpty();
    }
}



