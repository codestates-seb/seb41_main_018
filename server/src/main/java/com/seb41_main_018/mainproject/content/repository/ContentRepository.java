package com.seb41_main_018.mainproject.content.repository;

import com.seb41_main_018.mainproject.content.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
