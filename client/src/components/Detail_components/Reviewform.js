import React, { useState, useForm } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import ReviewItem from "./ReviewItem";
import Button from "../Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Input } from "../../util/UseForm";

//Button
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export const Buttons = (props) => {
    return (
        <AwesomeButton
            type="primary"
            before={props.icon}
            css={css`
                --button-default-height: 80px;
                --button-default-font-size: 1.1rem;
                --button-default-border-radius: 10px;
                --button-horizontal-padding: 30px;
                --button-raise-level: 3px;
                --button-hover-pressure: 1.75;
                --transform-speed: 0.185s;
                --button-primary-color: #1e88e5;
                --button-primary-color-dark: #1360a4;
                --button-primary-color-light: #ffffff;
                --button-primary-color-hover: #187bd1;
                --button-primary-color-active: #166dba;
                --button-primary-border: none;
            `}
        >
            {props.text}
        </AwesomeButton>
    );
};

// 후기 더미 데이터
const reviewDummy = [
    {
        reviewId: 1,
        content:
            "저희 할머니와 함께 채이네 다이닝 룸 다녀왔는데요! 저희 할머니가 정말 좋아하셨어요!!",
        postId: 1,
        displayName: "원할머니멱살",
        email: "test1@gmail.com",
        rate: 3,
        createdAt: "2023년 1월 18일",
        modifiedAt: "2022-12-30T08:32:07.625506082",
    },
    {
        reviewId: 2,
        content: "review2",
        postId: 1,
        displayName: "displayName2",
        email: "test2@gmail.com",
        rate: 2,
        createdAt: "2022-12-30T08:32:07.625506082",
        modifiedAt: "2022-12-30T08:32:07.625506082",
    },
    {
        reviewId: 3,
        content: "review3",
        postId: 1,
        displayName: "displayName3",
        email: "test3@gmail.com",
        rate: 5,
        createdAt: "2022-12-30T08:32:07.625506082",
        modifiedAt: "2022-12-30T08:32:07.625506082",
    },
];

const Reviewform = (props) => {
    const starArray = [0, 1, 2, 3, 4];
    const [ratingIndex, setRatingIndex] = useState(4);
    const [state, setState] = useState(0);
    const [value, setValue] = useState(0);

    return (
        <div css={ReviewContainer}>
            <div css={ReviewCount}>
                {reviewDummy.length !== 0
                    ? `Review : ${reviewDummy.length} 개`
                    : "첫 번째 후기의 주인공이 되어주세요!"}
            </div>
            <div css={RatingBox}>
                <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    onClick={(value) => setState(value)}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </div>
            <div css={ReviewInput}>
                <textarea placeholder="후기를 작성해주세요." />

                <Buttons text="등록하기" />
            </div>
            <div css={ReviewList}>
                {/* reviewitem >> map */}
                {reviewDummy.map((review) => (
                    <ReviewItem key={review.reviewId} review={review} />
                ))}
            </div>
            {/* mui */}
            <Box
                sx={{
                    "& > legend": { mt: 2 },
                }}
            ></Box>
        </div>
    );
};
//리뷰
const ReviewContainer = css`
    width: 85%;
    margin: 0 auto;
`;

const ReviewCount = css`
    width: fit-content;
    margin: 10px 0;
    font-size: 1.2rem;
    font-weight: 600;
`;

const ReviewInput = css`
    display: flex;
    justify-content: space-between;
    height: 80px;
    margin: 0 auto;

    textarea {
        border: none;
        width: 70vw;
        height: 80px;
        border: 2px solid ${PALETTE.default_color};
        border-radius: ${PALETTE.border_radius};
        padding: 10px;
        margin-right: 10px;
        font-size: 1rem;
        color: gray;
    }
`;
const ReviewList = css`
    padding-top: 20px;
`;

const RatingBox = css`
    width: fit-content;

    /* .inactive {
        color: #c4c4c4;
    }
    .active {
        color: black;
    }

    & svg {
        color: #c4c4c4;
        cursor: pointer;
    }
    :hover svg {
        color: black;
    }
    & svg:hover ~ svg {
        color: #c4c4c4;
    } */
`;
const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});
export default Reviewform;
