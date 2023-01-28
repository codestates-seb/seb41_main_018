import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyPostItem from "./MyPostItem";
import { userInfoState } from "../../state/atom";
import { useRecoilState } from "recoil";

const MyPost = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    return (
        <div css={MyPost_Wrap}>
            {console.log(userInfo.contents)}
            {userInfo.contents.map((post) => (
                <MyPostItem key={post.contentId} post={post}></MyPostItem>
            ))}
        </div>
    );
};

const MyPost_Wrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

export default MyPost;
