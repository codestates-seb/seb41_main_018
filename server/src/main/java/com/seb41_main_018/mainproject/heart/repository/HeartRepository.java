package com.seb41_main_018.mainproject.heart.repository;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HeartRepository extends JpaRepository<Heart, Long> {
//    List<Heart> findAllByUserAndContent(User user, Content content);
//    List<Heart> findAllByContent(Content content);
Optional<Heart> findByUserAndContent(User user, Content content);

    @Query(value = "select * from heart where user_id = :userId", nativeQuery = true)
    List<Heart> findAllByUserId(long userId);
}
