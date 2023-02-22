import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../state/atom";

import MyPostItem from "./MyPostItem";

const MyPost = () => {
    const userInfo = useRecoilValue(userInfoState);

    return (
        <div css={MyPostWrap}>
            {userInfo.contents.map((post) => (
                <MyPostItem key={post.contentId} post={post}></MyPostItem>
            ))}
        </div>
    );
};

const MyPostWrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

export default MyPost;
