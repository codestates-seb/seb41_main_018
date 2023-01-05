package com.seb41_main_018.mainproject.exception;

import lombok.Getter;

public enum ExceptionCode {
    ANSWER_NOT_FOUND(404, "Answer not found"),
    LIKE_NOT_FOUND(404, "LIKE not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    USER_NOT_FOUND(404, "USER not found"),
    POST_NOT_FOUND(404, "POST not found"),
    ANSWER_EXISTS(409, "Answer exists"),
    USER_EXISTS(409, "USER exists"),
    POST_EXISTS(409, "POST exists"),
    CANNOT_CHANGE_ANSWER(403, "Answer can not change"),
    CANNOT_CHANGE_POST(403, "POST can not change"),
    CANNOT_CHANGE_COMMENT(403,"Comment can not change"),
    CANNOT_CHANGE_USER(403, "USER can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_USER_STATUS(400, "Invalid USER status");  // TO 추가된 부분

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
