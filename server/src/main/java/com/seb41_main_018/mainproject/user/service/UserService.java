package com.seb41_main_018.mainproject.user.service;

import com.seb41_main_018.mainproject.auth.utils.CustomAuthorityUtils;
import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.content.dto.ContentDto;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.heart.repository.HeartRepository;
import com.seb41_main_018.mainproject.response.SingleResponseDto;
import com.seb41_main_018.mainproject.user.dto.UserAllResponseDto;
import com.seb41_main_018.mainproject.user.mapper.UserMapper;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.exception.ExceptionCode;

import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final UserMapper userMapper;
    private final HeartRepository heartRepository;
    private final ContentRepository contentRepository;
    private final CommentRepository commentRepository;
    //private final CustomBeanUtils<Member> beanUtils;

    public User createUser(User user) {
        // 이미 등록된 이메일인지 확인
        verifyExistsEmail(user.getEmail());
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        return savedUser;
    }
    //유저 수정
    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId()); //ID로 멤버 존재 확인하고 User 정보 반환

        if(getLoginMember().getUserId() != findUser.getUserId()) // 다른 사람의 정보를 수정할 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)

        Optional.ofNullable(user.getNickname())
                .ifPresent(nickname -> findUser.setNickname(nickname));
        Optional.ofNullable(user.getPhone())
                .ifPresent(phone -> findUser.setPhone(phone));
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> findUser.setPassword(passwordEncoder.encode(password)));
//        Optional.ofNullable(user.getImage())
//                .ifPresent(image -> findUser.setImage(image));

        return userRepository.save(findUser);
    }

    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    public Page<User> findMembers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size,
                Sort.by("userId").descending()));
    }

    //유저 삭제
    public void deleteUser(long userId) {
        User findUser = findVerifiedUser(userId);
        if(getLoginMember().getUserId() != findUser.getUserId()) // 다른 사람을 탈퇴시킬 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)

        userRepository.delete(findUser);
    }

    public User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser =
                optionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }
    public boolean emailCheck(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()){
            return false;
        }
        return true;
    }
    //로그인된 유저 정보 조회
    public User getLoginMember() { // 로그인된 유저 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null || authentication.getName().equals("anonymousUser"))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return user;
    }
    @Transactional(readOnly = true)
    public ResponseEntity detail(User user) {

        UserAllResponseDto userAllResponseDto = userMapper.InfoResponse(user, contentRepository, commentRepository, heartRepository);
        return new ResponseEntity<>(
                new SingleResponseDto<>(userAllResponseDto), HttpStatus.OK
        );
    }


}