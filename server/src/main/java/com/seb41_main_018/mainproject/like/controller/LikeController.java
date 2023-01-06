package com.seb41_main_018.mainproject.like.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/posts/{postId}/likes")
@AllArgsConstructor
public class LikeController {
    @PostMapping //@Valid @RequestBody VoteDto.Post post 추가
    public ResponseEntity vote(@PathVariable(name = "postId") long postId
                               ) {
        return null;
    }
}
