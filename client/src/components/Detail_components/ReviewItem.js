import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import dayjs from "dayjs";
import { patchReview } from "../../util/axiosContents";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../state/atom";
import ReviewDeleteModal from "./ReviewDeleteModal";
import Swal from "sweetalert2";

//Button
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    width: "380px",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

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
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [editReview, setEditReview] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rateType, setRateType] = useState("FIVE");
    const [modalOpen, setModalOpen] = useState(false);

    const editReviewHandler = () => {
        if (userInfo.userId === userId) {
            setEditReview(!editReview);
            setReviewText(body);
            setRateType(ratingType);
        } else {
            Toast.fire({
                icon: "error",
                title: "권한이 없습니다.",
            });
        }
    };

    const editReviewConfirm = (commentId, body, ratingType) => {
        console.log(commentId, body, ratingType);
        patchReview(commentId, body, ratingType).then(() => {
            setUpdate(true);
            setEditReview(!editReview);
        });
    };

    const showModal = () => {
        if (userInfo.userId === userId) {
            setModalOpen(true);
        } else {
            Toast.fire({
                icon: "error",
                title: "권한이 없습니다.",
            });
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

    return editReview ? (
        <div css={Container}>
            <div css={ReviewContent}>
                <img css={ProfileImg} src={image} alt={`${nickName}의 프로필 이미지`} />
                <div>
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
                    <button onClick={() => editReviewConfirm(commentId, reviewText, rateType)}>
                        수정 완료
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div css={Container}>
            <div css={ReviewContent}>
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
            <div css={BtnWrap}>
                <button css={BtnStyle} onClick={editReviewHandler}>
                    수정
                </button>
                <button css={BtnStyle} onClick={showModal}>
                    삭제
                </button>
            </div>
            {modalOpen && (
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

const ReviewContent = css`
    display: flex;
    padding-left: 20px;
`;

const ProfileImg = css`
    align-self: center;
    border-radius: 50%;
    max-width: 60px;
    max-height: 60px;
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

const ReviewInput = css`
    display: flex;
    justify-content: space-between;
    height: 80px;
    margin: 0 auto;

    textarea {
        border: none;
        width: 65vw;
        height: 80px;
        border: 2px solid ${PALETTE.default_color};
        border-radius: ${PALETTE.border_radius};
        padding: 10px;
        margin-right: 10px;
        font-size: 1rem;
        color: gray;
        @media (min-width: 768px) {
            width: 55vw;
        }
    }
`;

const BtnWrap = css`
    margin-left: 75px;
`;
const BtnStyle = css`
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
export default ReviewItem;
