package com.seb41_main_018.mainproject.user.controller;

import com.seb41_main_018.mainproject.user.dto.UserPatchDto;
import com.seb41_main_018.mainproject.user.dto.UserPostDto;
import com.seb41_main_018.mainproject.user.dto.UserResponseDto;
import com.seb41_main_018.mainproject.user.mapper.UserMapper;
import com.seb41_main_018.mainproject.user.repository.UserRepository;
import com.seb41_main_018.mainproject.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.seb41_main_018.mainproject.user.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
@ApiOperation(value = "유저 API", tags = {"User Controller"})
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
    @ApiOperation(value = "유저 등록", notes = "유저를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "User not found")})
    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserPostDto userPostDto ){
        User user = userService.createUser(userMapper.userPostDtoToUser(userPostDto));
        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(user);

        return new ResponseEntity(userResponseDto, HttpStatus.CREATED);
    }
    // 유저 정보 수정 //
    @ApiOperation(value = "유저 수정", notes = "유저를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "User not found")})
    @PatchMapping("/{userId}")
    public ResponseEntity patchUser(@PathVariable("userId") @Positive Long userId,
                                    @Valid @RequestBody UserPatchDto userPatchDto){
        userPatchDto.setUserId(userId);

        User user = userService.updateUser(userMapper.userPatchDtoToUser(userPatchDto));
        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(user);

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    // 유저 단건 조회 //
    @ApiOperation(value = "유저 조회", notes = "유저를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "User not found")})
    @GetMapping("/{userId}")
    public ResponseEntity getUser(@ApiParam(name = "UserId", value = "유저 식별자", example = "1")
                                      @PathVariable("userId") Long userId) {
        User user = userService.findUser(userId);
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
    @ApiOperation(value = "유저 삭제", notes = "유저를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "User not found")})
    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") @Positive Long userId){
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    // 이메일 검사 //
    @ApiOperation(value = "유저 이메일 유효성 검사", notes = "유저 이메일 유효성을 검사합니다.")
    @GetMapping("/emailCheck/{email}")
    public ResponseEntity<Boolean> verifyExistsEmail(@PathVariable("email") String email){
        return ResponseEntity.ok(userService.emailCheck(email));
    }

}
