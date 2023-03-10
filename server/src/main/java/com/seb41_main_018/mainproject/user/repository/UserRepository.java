package com.seb41_main_018.mainproject.user.repository;

import com.seb41_main_018.mainproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByUserId(long userId);
}
