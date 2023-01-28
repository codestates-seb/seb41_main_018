package com.seb41_main_018.mainproject.content.service;

import com.seb41_main_018.mainproject.comment.repository.CommentRepository;
import com.seb41_main_018.mainproject.content.dto.ContentAllResponseDto;
import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.content.mapper.ContentMapper;
import com.seb41_main_018.mainproject.content.repository.ContentRepository;
import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.response.SingleResponseDto;
import com.seb41_main_018.mainproject.route.repository.RouteRepository;
import com.seb41_main_018.mainproject.route.service.RouteService;
import com.seb41_main_018.mainproject.tag.repository.TagRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ContentService {
    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final UserService userService;

    private final ContentMapper contentMapper;

    private final CommentRepository commentRepository;
    private final TagRepository tagRepository;
    private final RouteService routeService;
    private final RouteRepository routeRepository;

    public ContentService(UserRepository userRepository, ContentRepository contentRepository, UserService userService, ContentMapper contentMapper, CommentRepository commentRepository, TagRepository tagRepository, RouteService routeService, RouteRepository routeRepository) {
        this.userRepository = userRepository;
        this.contentRepository = contentRepository;
        this.userService = userService;
        this.contentMapper = contentMapper;
        this.commentRepository = commentRepository;
        this.tagRepository = tagRepository;
        this.routeService = routeService;
        this.routeRepository = routeRepository;
    }

    // 게시글 생성 //
    public Content createContent(Content content) {
        content.setUser(userService.getLoginMember());

        return contentRepository.save(content);
    }

    // 게시글 수정 //
    public Content updateContent(Content content) {
        Content findContent = findVerifiedContent(content.getContentId());

        User writer = userService.findVerifiedUser(findContent.getUser().getUserId()); // 작성자 찾기
        if(userService.getLoginMember().getUserId() != writer.getUserId()) // 작성자와 로그인한 사람이 다를 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)

        Optional.ofNullable(content.getTitle())
                .ifPresent(findContent::setTitle);

        Optional.ofNullable(content.getThemeType())
                .ifPresent(findContent::setThemeType);

        Optional.ofNullable(content.getTravelDate())
                .ifPresent(findContent::setTravelDate);

        Optional.ofNullable(content.getTag())
                .ifPresent(findContent::setTag);


        routeService.deleteRoutes(findContent);
        findContent.setRoutes(routeService.createRoutes(content.getRoutes()));

        return contentRepository.save(findContent);
    }

    // 게시글 단건 조회 //
    public Content findContent(Long contentId) {
        return findVerifiedContent(contentId);
    }

    // 게시글 전체 조회 //
    public Page<Content> findContents(int page, int size) {
        return contentRepository.findAll(PageRequest.of(page, size,
                Sort.by("contentId").descending()));
    }

    // 게시글 삭제 //
    public void deleteContent(Long contentId) {
        Content findContent = findVerifiedContent(contentId);

        User writer = userService.findVerifiedUser(findContent.getUser().getUserId()); // 작성자 찾기
        if(userService.getLoginMember().getUserId() != writer.getUserId()) // 작성자와 로그인한 사람이 다를 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)
        contentRepository.delete(findContent);
    }

    // 유저 검증 로직 //
    public User findVerifiedUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser =
                optionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    // 게시글 검증 로직 //
    public Content findVerifiedContent(Long contentId) {
        Optional<Content> optionalContent = contentRepository.findById(contentId);
        Content findContent =
                optionalContent.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND));

        return findContent;
    }
    public Content updateViewCount(Content content){
        return contentRepository.save(content);
    }

    @Transactional(readOnly = true)
    public ResponseEntity detail(Content content) {

        ContentAllResponseDto response = contentMapper.contentToContentAllResponse(content, commentRepository, tagRepository,routeRepository);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

}