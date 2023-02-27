import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";

import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../state/atom";

import Button from "../../components/Button";
import DeleteUserModal from "./DeleteUserModal";

const MyInfo = () => {
    const [isClickEditPassword, setIsClickEditPassword] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const userInfo = useRecoilValue(userInfoState);

    const editButtonHandler = () => {
        setIsClickEditPassword(!isClickEditPassword);
    };

    const inputPasswordHandler = (e) => {
        setInputPassword(e.target.value);
    };

    const showModal = () => {
        setOpenModal(true);
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
                    <div css={PasswordInput}>
                        <input type="password" onChange={inputPasswordHandler} />
                        <div>
                            <input type="password" onChange={inputPasswordHandler} />
                            {/* 수정 기능 버튼 */}
                            <span type="button" className={isClickEditPassword ? "" : "hidden"}>
                                수정
                            </span>
                            <span
                                className={isClickEditPassword ? "" : "none"}
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
    input {
        width: 200px;
        height: 30px;
        margin: 0 10px 15px 0;
    }
    span {
        margin-right: 10px;
    }
`;

const PasswordContent = css`
    span {
        margin-right: 10px;
    }
`;

export default MyInfo;
