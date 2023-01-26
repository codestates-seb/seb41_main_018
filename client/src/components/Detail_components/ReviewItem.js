import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logo from "../../assets/logo.png";
import { AiFillStar } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import dayjs from "dayjs";

//Button
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export const Buttons = (props) => {
    return (
        <AwesomeButton
            type="primary"
            before={props.icon}
            css={css`
                margin: 10px;
                --button-default-height: 50px;
                --button-default-font-size: 1.5rem;
                --button-default-border-radius: 10px;
                --button-horizontal-padding: 20px;
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

const ReviewItem = ({ review }) => {
    const { body, createdAt, nickName, ratingType } = review;

    return (
        <div css={Container}>
            <div css={ReviewContent}>
                <div css={ProfileImg} src={logo}></div>
                <div>
                    <div css={RatingBox}>
                        <StyledRating
                            defaultValue={
                                ratingType === "FIVE"
                                    ? 5
                                    : ratingType === "FOUR"
                                    ? 4
                                    : ratingType === "THREE"
                                    ? 3
                                    : ratingType === "TWO"
                                    ? 2
                                    : 1
                            }
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            readOnly
                        />
                    </div>
                    <span
                        css={css`
                            margin: 10px 0;
                            font-size: 1.1rem;
                            font-weight: 700;
                        `}
                    >
                        {nickName}
                    </span>
                    <span
                        css={css`
                            margin: 0 10px;
                            font-size: 0.875rem;
                            color: #333;
                        `}
                    >
                        {dayjs(createdAt).format("YY.MM.DD")}
                    </span>
                    <div
                        css={css`
                            margin: 10px 0px;
                        `}
                    >
                        {body}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Container = css`
    display: flex;
    align-items: center;
    margin: 40px auto;
`;

const ReviewContent = css`
    display: flex;
    padding-left: 20px;
`;

const ProfileImg = css`
    align-self: center;
    background-color: #adade1;
    border-radius: 50%;
    min-width: 60px;
    min-height: 60px;
    margin: 0 10px 0 -10px;
`;

const RatingBox = css`
    /* width: fit-content; */

    .inactive {
        color: #c4c4c4;
    }
    .active {
        color: black;
    }
`;
// mui 시도 중
const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});
export default ReviewItem;
