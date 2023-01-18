package com.seb41_main_018.mainproject.tag.service;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import com.seb41_main_018.mainproject.exception.ExceptionCode;
import com.seb41_main_018.mainproject.tag.entity.Tag;
import com.seb41_main_018.mainproject.tag.repository.TagRepository;
import com.seb41_main_018.mainproject.user.entity.User;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    // 태그 생성 //
    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }

    // 태그 수정 //
    public Tag updateTag(Long tagId, Tag tag) {
        Tag findTag = findVerifiedTag(tagId);

        Optional.ofNullable(findTag.getName())
                .ifPresent(findTag::setName);

        return tagRepository.save(findTag);
    }

    // 태그 단건 조회 //
    public Tag findTag(Long tagId) {
        return findVerifiedTag(tagId);
    }

    // 태그 전체 조회 //
    public Page<Tag> findTags(int page, int size) {
        return tagRepository.findAll(PageRequest.of(page, size,
                Sort.by("tagId").descending()));
    }

    // 태그 삭제 //
    public void deleteTag(Long tagId) {
        Tag findTag = findVerifiedTag(tagId);
        tagRepository.delete(findTag);
    }

    // 유저 검증 로직 //
    public User findVerifiedUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser =
                optionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    // 태그 검증 로직 //
    public Tag findVerifiedTag(Long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        Tag findTag =
                optionalTag.orElseThrow(NullPointerException::new);

        return findTag;
    }

}
