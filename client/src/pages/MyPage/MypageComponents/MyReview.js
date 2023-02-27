import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";

import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../state/atom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { SampleImgSrc } from "../../../sampleImage";

const MyReview = () => {
    const GachiArr = Object.values(SampleImgSrc);
    const userInfo = useRecoilValue(userInfoState);
    const randomImg = Math.floor(Math.random() * GachiArr.length);

    return (
        <div css={MyReviewWrap}>
            {userInfo.comments.map((review) => (
                <div css={MyReviewItem} key={review.reviewId}>
                    <div css={PostImg}>
                        <img src={GachiArr[randomImg]} />
                    </div>
                    <div css={MyReviewContent}>
                        <Link to={`/detail/${review.contentId}`}>
                            <h3 css={PostTitle}>{review.title}</h3>
                        </Link>
                        <div>{review.body}</div>
                        <div css={RightContent}>{dayjs(review.createdAt).format("YY.MM.DD")}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MyReviewWrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const MyReviewItem = css`
    display: flex;
    align-items: center;
    padding: 8px;
    margin: 10px;
    width: 90%;

    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: ${PALETTE.box_shadow};
`;
const PostImg = css`
    border: ${PALETTE.border};
    width: 90px;
    height: 84px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const MyReviewContent = css`
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

const RightContent = css`
    position: relative;
    text-align: right;
`;

export default MyReview;
