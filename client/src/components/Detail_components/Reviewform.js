import React, { useState, useEffect } from "react";
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
import { useRecoilState } from "recoil";
import { ContentDetail, ReviewListState } from "../../state/atom";
import { createReview, getContent } from "../../util/axiosContents";
//Button
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export const Buttons = (props) => {
    return (
        <AwesomeButton
            type="primary"
            before={props.icon}
            onPress={props.onPress}
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

/* {
	"commentId": 7,
	"userId": 14,
	"contentId": 1,
	"title": "즐거운 제주도 여행",
	"body": "후기 남기기",
	"ratingType": "TWO",
	"nickName": "가치가치",
	"createdAt": "2023-01-26T13:58:26",
	"modifiedAt": "2023-01-26T13:58:26"
} */

const Reviewform = () => {
    const [rateType, setRateType] = useState("FIVE");
    const [reviewText, setReviewText] = useState("");
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const [reviewList, setReviewList] = useRecoilState(ReviewListState);
    const [update, setUpdate] = useState(false);

    const rateTypeSwitch = (num) => {
        switch (num) {
            case "5":
                setRateType("FIVE");
                break;

            case "4":
                setRateType("FOUR");
                break;

            case "3":
                setRateType("THREE");
                break;

            case "2":
                setRateType("TWO");
                break;

            case "1":
                setRateType("ONE");
                break;
        }
    };

    const createReviewHandler = () => {
        createReview(reviewText, contentDetail.data.contentId, rateType).then(() => {
            setReviewText("");
            setRateType("FIVE");
            setUpdate(true);
        });
    };

    useEffect(() => {
        if (update) {
            console.log("업데이트");
            getContent(location.pathname.slice(8)).then((res) => {
                setContentDetail(res.data);
                setReviewList(res.data.data && res.data.data.comments);
            });
            setReviewText("");
            setRateType("FIVE");
            setUpdate(false);
        }
    }, [update]);

    return (
        <div css={ReviewContainer}>
            <div css={ReviewCount}>
                {console.log(reviewList)}
                {reviewList.length !== 0
                    ? `Review : ${reviewList.length} 개`
                    : "첫 번째 후기의 주인공이 되어주세요!"}
            </div>
            <div css={RatingBox}>
                <StyledRating
                    name="customized-color"
                    defaultValue={
                        rateType === "FIVE"
                            ? 5
                            : rateType === "FOUR"
                            ? 4
                            : rateType === "THREE"
                            ? 3
                            : rateType === "TWO"
                            ? 2
                            : 1
                    }
                    getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    onChange={(e) => rateTypeSwitch(e.target.value)}
                />
            </div>
            <div css={ReviewInput}>
                <textarea
                    placeholder="후기를 작성해주세요."
                    value={reviewText}
                    onChange={(e) => {
                        setReviewText(e.target.value);
                    }}
                />
                <Buttons text="등록하기" onPress={createReviewHandler} />
            </div>
            <div css={ReviewList}>
                {/* reviewitem >> map */}
                {reviewList.map((review) => (
                    <ReviewItem
                        key={review.commentId}
                        review={review}
                        setUpdate={setUpdate}
                        rateTypeSwitch={rateTypeSwitch}
                        rateType={rateType}
                    />
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
