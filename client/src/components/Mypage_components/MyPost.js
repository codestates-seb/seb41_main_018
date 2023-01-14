import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import dayjs from "dayjs";
import MyPostItem from "./MyPostItem";

const reviewDummy = [
    {
        reviewId: 1,
        content: "review1",
        postId: 1,
        postTitle: "postTitle1 제목이 얼마나 길어지나 보자고오오오오오ㅗ오오오오오오오오오오ㅗㅇ",
        displayName: "displayName1",
        email: "test1@gmail.com",
        rate: 3,
        createdAt: "2022-12-30T08:32:07.625506082",
        modifiedAt: "2022-12-30T08:32:07.625506082",
    },
    {
        reviewId: 2,
        content: "review2",
        postId: 2,
        postTitle: "postTitle2",
        displayName: "displayName1",
        email: "test1@gmail.com",
        rate: 2,
        createdAt: "2022-12-30T08:32:07.625506082",
        modifiedAt: "2022-12-30T08:32:07.625506082",
    },
    {
        reviewId: 3,
        content: "review3",
        postId: 3,
        postTitle: "postTitle3",
        displayName: "displayName3",
        email: "test3@gmail.com",
        rate: 5,
        createdAt: `${dayjs().format()}`,
        modifiedAt: "2022-12-30T08:32:07.625506082",
    },
];

const MyPost = () => {
    return (
        <div css={MyPost_Wrap}>
            {reviewDummy.map((review) => (
                <MyPostItem review={review} key={review.reviewId}></MyPostItem>
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
