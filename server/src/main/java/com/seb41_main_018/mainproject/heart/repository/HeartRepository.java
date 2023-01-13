package com.seb41_main_018.mainproject.heart.repository;

import com.seb41_main_018.mainproject.content.entity.Content;
import com.seb41_main_018.mainproject.heart.entity.Heart;
import com.seb41_main_018.mainproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {
//    List<Heart> findAllByUserAndContent(User user, Content content);
//    List<Heart> findAllByContent(Content content);
}
