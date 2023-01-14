import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaPencilAlt } from "react-icons/fa";
import { PALETTE } from "../../Common";
import Button from "../Button";

const MyInfo = () => {
    return (
        <ul css={MyInfo_Wrap}>
            <li css={ListItem}>
                <span css={ListName}>이메일</span>
                <span>hello123@gmail.com</span>
            </li>
            <li css={ListItem}>
                <span css={ListName}>비밀번호</span>
                <span>●●●●●●●●</span>
                <span>
                    {/* 수정 아이콘 클릭 시 수정/취소 버튼 */}
                    <FaPencilAlt size="15" />
                </span>
            </li>
            <li css={ListItem}>
                <span css={ListName}>전화번호</span>
                <span>010-1234-5678</span>
            </li>

            <li css={ListItem}>
                <Button width="80px" height="30px" text="회원탈퇴" />
            </li>
        </ul>
    );
};

const MyInfo_Wrap = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 50px;
`;

const ListItem = css`
    padding: 10px;

    svg {
        margin-left: 8px;
    }

    button {
        position: relative;
        left: 540px;
        top: 115px;
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
`;

export default MyInfo;
