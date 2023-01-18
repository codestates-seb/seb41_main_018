import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logo from "../assets/logo.png";
import { AiFillStar } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ReviewItem = ({ review }) => {
    const { content, createdAt, displayName, rate } = review;
    const starArray = [0, 1, 2, 3, 4];

    return (
        <div css={Container}>
            <div css={ReviewContent}>
                <div css={ProfileImg} src={logo}></div>
                <div>
                    <div css={RatingBox}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={rate}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                            precision={0.5}
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
                        {displayName}
                    </span>
                    <span
                        css={css`
                            margin: 0 10px;
                            font-size: 0.875rem;
                            color: #333;
                        `}
                    >
                        {createdAt}
                    </span>
                    <div
                        css={css`
                            margin: 10px 0px;
                        `}
                    >
                        {content}
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
    width: 60px;
    height: 60px;
    margin: 10px;
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
