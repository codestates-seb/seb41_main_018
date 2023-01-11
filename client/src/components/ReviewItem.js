/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { AiFillStar } from "react-icons/ai";

const ReviewItem = ({ review }) => {
    const { content, createdAt, displayName, rate } = review;
    const starArray = [0, 1, 2, 3, 4];

    return (
        <div css={Container}>
            <div css={ReviewContent}>
                <div css={ProfileImg}>사진</div>
                <div>
                    <div css={RatingBox}>
                        {starArray.map((index) => (
                            <AiFillStar
                                rate={rate}
                                key={index}
                                className={index < rate ? "active" : "inactive"}
                                size="20"
                            />
                        ))}
                    </div>
                    <span>{displayName}</span>
                    <span>{createdAt}</span>
                    <div>{content}</div>
                </div>
            </div>
        </div>
    );
};

const Container = css`
    display: flex;
    align-items: center;
`;
const ReviewContent = css`
    display: flex;
    padding-left: 20px;

    div,
    span {
        padding: 5px;
    }
`;

const ProfileImg = css`
    align-self: center;
`;

const RatingBox = css`
    width: fit-content;

    .inactive {
        color: #c4c4c4;
    }
    .active {
        color: black;
    }
`;

export default ReviewItem;
