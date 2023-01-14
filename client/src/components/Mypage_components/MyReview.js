import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import dayjs from "dayjs";

// <나의 후기> 조회 가능한지 여부 확인
// 후기에서 해당 글의 제목 확인 가능한지 여부 확인
// API명세서 확인 후 경로 작성 가능한지 여부 확인

const reviewDummy = [
    {
        reviewId: 1,
        content: "review1",
        postId: 1,
        postTitle: "postTitle1",
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
const MyReview = () => {
    return (
        <div css={MyReview_Wrap}>
            {reviewDummy.map((review) => (
                <div css={MyReview_Item} key={review.reviewId}>
                    <div css={PostImg}>사진</div>
                    <div css={MyReview_Content}>
                        <h3 css={PostTitle}>{review.postTitle}</h3>
                        <div>나의 후기</div>
                        <div css={Right_Content}>{dayjs(review.createdAt).format("YY.MM.DD")}</div>
                        <div css={Right_Content}>{review.displayName}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MyReview_Wrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const MyReview_Item = css`
    display: flex;
    align-items: center;
    padding: 8px;
    margin: 10px;
    width: 90%;

    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: ${PALETTE.box_shaodw};
`;
const PostImg = css`
    padding: 20px;
    border: ${PALETTE.border};
    width: 90px;
    height: 90px;
`;

const MyReview_Content = css`
    padding: 5px 20px;
    width: 100%;
    text-align: left;
`;

const PostTitle = css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    line-height: 2rem;
`;

const Right_Content = css`
    position: relative;
    text-align: right;
`;

export default MyReview;
