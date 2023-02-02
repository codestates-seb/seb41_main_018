import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import { useState } from "react";
import Button from "../Button";
import UserDeleteModal from "./UserDeleteModal";
import { userInfoState } from "../../state/atom";
import { useRecoilState } from "recoil";

const MyInfo = () => {
    const [passEditClick, setPassEditClick] = useState(false);
    const [inputPass, setInputPass] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const editButtonHandler = () => {
        setPassEditClick(!passEditClick);
    };

    const inputPassHandler = (e) => {
        setInputPass(e.target.value);
    };

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <ul css={MyInfo_Wrap}>
            <li css={ListItem}>
                <span css={ListName}>이메일</span>
                <span>{userInfo.email}</span>
            </li>
            <li css={ListItem}>
                <span css={ListName} className="password">
                    비밀번호
                </span>

                {passEditClick ? (
                    <div css={PassInput}>
                        <input type="password" onChange={inputPassHandler} />
                        <div>
                            <input type="password" onChange={inputPassHandler} />
                            {/* 수정 기능 버튼 */}
                            <span type="button" className={passEditClick ? "" : "hidden"}>
                                수정
                            </span>
                            <span
                                className={passEditClick ? "" : "none"}
                                onClick={editButtonHandler}
                            >
                                취소
                            </span>
                        </div>
                    </div>
                ) : (
                    <div css={PassContent}>
                        <span>●●●●●●●●</span>
                        <span className={passEditClick ? "none" : ""} onClick={editButtonHandler}>
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
                {passEditClick ? (
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
            {modalOpen && (
                <UserDeleteModal text="정말 탈퇴하시겠습니까?" setModalOpen={setModalOpen} />
            )}
        </ul>
    );
};

const MyInfo_Wrap = css`
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

const PassInput = css`
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

const PassContent = css`
    span {
        margin-right: 10px;
    }
`;

export default MyInfo;
