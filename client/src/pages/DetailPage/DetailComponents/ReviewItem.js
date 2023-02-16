import React, { useState } from "react";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";

//component
import ReviewDeleteModal from "./ReviewDeleteModal";

//UI library
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import dayjs from "dayjs";

//Recoil
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../state/atom";

//API
import { patchReview } from "../../../util/axiosContents";

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

const ReviewItem = ({ review, setUpdate }) => {
    const { body, createdAt, nickName, ratingType, commentId, userId, image } = review;
    const userInfo = useRecoilValue(userInfoState);
    const [isReviewEdit, setEditReview] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rateType, setRateType] = useState("FIVE");
    const [isModalOpen, setModalOpen] = useState(false);

    const editReviewHandler = () => {
        if (userInfo.userId === userId) {
            setEditReview(!isReviewEdit);
            setReviewText(body);
            setRateType(ratingType);
        }
    };

    const editReviewConfirm = (commentId, body, ratingType) => {
        patchReview(commentId, body, ratingType).then(() => {
            setUpdate(true);
            setEditReview(!isReviewEdit);
        });
    };

    const showModal = () => {
        if (userInfo.userId === userId) {
            setModalOpen(true);
        }
    };

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

    return isReviewEdit ? (
        <div css={Container}>
            <div css={ReviewBox}>
                <img css={ProfileImg} src={image} alt={`${nickName}의 프로필 이미지`} />
                <div css={ReviewContent}>
                    <span css={NicknameWrap}>{nickName}</span>
                    <span css={CreatedWrap}>{dayjs(createdAt).format("YY.MM.DD")}</span>
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
                            precision={1}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            onChange={(e) => rateTypeSwitch(e.target.value || ratingType)}
                        />
                    </div>
                    <div css={ReviewInput}>
                        <textarea
                            defaultValue={body}
                            onChange={(e) => {
                                setReviewText(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div css={ButtonWrap}>
                <button
                    css={ButtonStyle}
                    onClick={() => editReviewConfirm(commentId, reviewText, rateType)}
                >
                    완료
                </button>
            </div>
        </div>
    ) : (
        <div css={Container}>
            <div css={ReviewBox}>
                <img css={ProfileImg} src={image} alt={`${nickName}의 프로필 이미지`} />
                <div>
                    <div css={RatingBox}>
                        <StyledRating
                            value={
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
                    <span css={NicknameWrap}>{nickName}</span>
                    <span css={CreatedWrap}>{dayjs(createdAt).format("YY.MM.DD")}</span>
                    <div css={BodyWrap}>{body}</div>
                </div>
            </div>
            <div css={ButtonWrap} className={userInfo.userId === userId ? "" : "hidden"}>
                <button css={ButtonStyle} onClick={editReviewHandler}>
                    수정
                </button>
                <button css={ButtonStyle} onClick={showModal}>
                    삭제
                </button>
            </div>
            {isModalOpen && (
                <ReviewDeleteModal
                    text="정말 삭제하시겠습니까?"
                    setModalOpen={setModalOpen}
                    setUpdate={setUpdate}
                    commentId={commentId}
                />
            )}
        </div>
    );
};

const Container = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 40px 0;
    padding: 20px;
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    border-radius: 10px;
`;

const ReviewBox = css`
    display: flex;
    padding-left: 20px;
    width: 100%;
`;

const ProfileImg = css`
    align-self: center;
    border-radius: 50%;
    max-width: 60px;
    max-height: 60px;
    margin: 0 10px 0 -10px;
`;

const ReviewContent = css`
    width: 100%;
`;

const RatingBox = css`
    .inactive {
        color: #c4c4c4;
    }
    .active {
        color: black;
    }
`;

const ReviewInput = css`
    display: flex;
    justify-content: space-between;
    height: 80px;
    margin: 0 auto;

    textarea {
        border: none;
        width: 100%;
        height: 80px;
        border: 2px solid ${PALETTE.default_color};
        border-radius: ${PALETTE.border_radius};
        padding: 10px;
        margin-right: 10px;
        font-size: 1rem;
        color: gray;
        resize: none;

        @media (min-width: 768px) {
            width: 100%;
        }
    }
`;

const ButtonWrap = css`
    align-self: flex-end;
    margin-right: 10px;

    &.hidden {
        visibility: hidden;
    }
`;

const ButtonStyle = css`
    font-size: 0.775rem;
    color: #7d7d7d;
    padding: 2.5px;
    border: none;
    background-color: white;
`;

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

const NicknameWrap = css`
    margin: 10px 0;
    font-size: 1.1rem;
    font-weight: 700;
`;

const CreatedWrap = css`
    margin: 0 10px;
    font-size: 0.875rem;
    color: #333;
`;

const BodyWrap = css`
    margin: 10px 0px;
`;
export default ReviewItem;
