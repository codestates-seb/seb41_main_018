import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";

import { useRecoilState } from "recoil";
import { userInfoState } from "../../../state/atom";

import Button from "../../components/Button";
import DeleteUserModal from "./DeleteUserModal";

import { EditUserPassword, getUserInfo } from "../../../util/axiosUser";

const MyInfo = () => {
    const [isClickEditPassword, setIsClickEditPassword] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLength, setPasswordLength] = useState();
    const [b, setb] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const editButtonHandler = () => {
        setIsClickEditPassword(!isClickEditPassword);
    };

    //비밀 번호 수정 및 8자리 이상 비밀번호 검증
    const inputPasswordHandler = (e) => {
        setInputPassword(e.target.value);
        e.target.value.length < 8 ? setPasswordLength(false) : setPasswordLength(true);
    };

    //비밀 번호 2차 확인
    const ConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
        inputPassword === e.target.value ? setb(true) : setb(false);
    };

    const showModal = () => {
        setOpenModal(true);
    };

    const EditPasswordHandler = () => {
        EditUserPassword(userInfo.userId, confirmPassword).then((data) => {
            if (data) {
                getUserInfo(userInfo.userId).then((data) => {
                    setUserInfo(data.data);
                });
            }
        });
        editButtonHandler();
        setInputPassword("");
        setConfirmPassword("");
    };

    return (
        <ul css={MyInfoWrap}>
            <li css={ListItem}>
                <span css={ListName}>이메일</span>
                <span>{userInfo.email}</span>
            </li>
            <li css={ListItem}>
                <span css={ListName} className="password">
                    비밀번호
                </span>

                {isClickEditPassword ? (
                    <div css={EditPasswordContainer}>
                        <div css={PasswordInput}>
                            <input type="password" onChange={inputPasswordHandler} />
                            {inputPassword ? (
                                passwordLength ? (
                                    <span css={PasswordValidationMessage}>
                                        사용가능한 비밀번호 입니다.
                                    </span>
                                ) : (
                                    <span css={PasswordValidationMessage}>
                                        8자리 이상 비밀번호를 사용하세요.
                                    </span>
                                )
                            ) : null}
                            <input type="password" onChange={ConfirmPasswordHandler} />
                            {confirmPassword ? (
                                b ? (
                                    <span css={PasswordValidationMessage}>
                                        비밀번호가 일치합니다.
                                    </span>
                                ) : (
                                    <span css={PasswordValidationMessage}>
                                        비밀번호가 일치하지 않습니다.
                                    </span>
                                )
                            ) : null}
                            {/* 수정 기능 버튼 */}
                        </div>
                        <div css={EditPasswordButton}>
                            <span
                                type="button"
                                css={isClickEditPassword ? "" : "hidden"}
                                onClick={EditPasswordHandler}
                            >
                                수정
                            </span>
                            <span
                                css={isClickEditPassword ? "" : "none"}
                                onClick={editButtonHandler}
                            >
                                취소
                            </span>
                        </div>
                    </div>
                ) : (
                    <div css={PasswordContent}>
                        <span>●●●●●●●●</span>
                        <span
                            className={isClickEditPassword ? "none" : ""}
                            onClick={editButtonHandler}
                        >
                            수정
                        </span>
                    </div>
                )}
            </li>
            <li css={ListItem}>
                <span css={ListName}>전화번호</span>
                <span>{userInfo.phone}</span>
            </li>
            <li css={ListItem}>
                {isClickEditPassword ? (
                    <Button
                        width="80px"
                        height="30px"
                        text="회원탈퇴"
                        onClick={showModal}
                        left="540px"
                        top="105px"
                        transition="none"
                        color="white"
                    />
                ) : (
                    <Button
                        width="80px"
                        height="30px"
                        text="회원탈퇴"
                        onClick={showModal}
                        left="540px"
                        top="165px"
                        transition="none"
                        color="white"
                    />
                )}
            </li>
            {openModal && (
                <DeleteUserModal text="정말 탈퇴하시겠습니까?" setOpenModal={setOpenModal} />
            )}
        </ul>
    );
};

const MyInfoWrap = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 50px;
    width: 100%;
    height: 100%;

    .none {
        display: none;
    }
    .hidden {
        visibility: hidden;
    }
`;

const ListItem = css`
    display: flex;
    padding: 10px;
    align-items: center;

    svg {
        margin-left: 8px;
    }
`;

// Button.js 수정 후 css 동일하게 수정
const ListName = css`
    display: inline-block;
    margin-right: 30px;
    border: solid 2px ${PALETTE.default_color};
    border-radius: 5px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;

    &.password {
        align-self: flex-start;
    }
`;

const PasswordInput = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    input {
        width: 200px;
        height: 30px;
        margin: 0 10px 15px 0;
    }
    span {
        margin-right: 10px;
    }
`;

const EditPasswordContainer = css`
    display: flex;
    align-items: end;
`;

const PasswordValidationMessage = css`
    display: flex;

    color: red;
    margin: -10px 0 10px 0;
`;

const EditPasswordButton = css`
    margin-bottom: 17px;

    span {
        cursor: pointer;
        margin: 0 5px;
    }
`;

const PasswordContent = css`
    span {
        cursor: pointer;
        margin-right: 10px;
    }
`;

export default MyInfo;
