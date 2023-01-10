package com.seb41_main_018.mainproject.user.controller;

import com.seb41_main_018.mainproject.response.SingleResponseDto;
import com.seb41_main_018.mainproject.user.dto.UserAllResponseDto;
import com.seb41_main_018.mainproject.user.dto.UserPatchDto;
import com.seb41_main_018.mainproject.user.dto.UserPostDto;
import com.seb41_main_018.mainproject.user.dto.UserResponseDto;
import com.seb41_main_018.mainproject.user.mapper.UserMapper;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.seb41_main_018.mainproject.user.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    //private final BCryptPasswordEncoder bCryptPasswordEncoder;


    // 유저 생성 //
    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserPostDto userPostDto ){
        User user = userService.createUser(userMapper.userPostDtoToUser(userPostDto));
        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(user);

        return new ResponseEntity(userResponseDto, HttpStatus.CREATED);
    }
    // 유저 정보 수정 //
    @PatchMapping("/{userId}")
    public ResponseEntity patchUser(@PathVariable("userId") @Positive Long userId,
                                    @Valid @RequestBody UserPatchDto userPatchDto){
        userPatchDto.setUserId(userId);

        User user = userService.updateUser(userMapper.userPatchDtoToUser(userPatchDto));
        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(user);

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

//    // 유저 상세 정보 조회 //
//    @GetMapping("/{userId}/Info")
//    public ResponseEntity getUser(@PathVariable("userId") @Positive Long userId) {
//        User user = userService.findUser(userId);
//        return null;
////        UserAllResponseDto userAllResponseDto = userMapper.InfoResponse(member, questionRepository, answerRepository);
////        return new ResponseEntity<>(
////                new SingleResponseDto<>(userAllResponseDto), HttpStatus.OK
////        );
//    }
    // 유저 삭제 //
    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") @Positive Long userId){
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
