/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import ReviewItem from "../components/ReviewItem";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

{
    /* 반응형 : 768px이하일 때 */
}

// 후기 더미 데이터
const reviewDummy = [
    {
        reviewId: 1,
        content: "review1",
        postId: 1,
        displayName: "displayName1",
        email: "test1@gmail.com",
        rate: 3,
        createdAt: "2022-12-30T08:32:07.625506082",
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

// 후기 등록
/* const postReview = async () => {
	await fetchCreateAnswer(questionDetail.questionId, content).then((data) => {
		if (data) {
			setUpdate(true);
		}
	});
}; */

const Detail = () => {
    // 별점
    const starArray = [0, 1, 2, 3, 4];
    const [ratingIndex, setRatingIndex] = useState(4);
    const [state, setState] = useState(0);

    return (
        <div className="Detail" css={Wrap}>
            <h1>제목</h1>
            <div css={TotalContainer}>
                <div css={Image}>
                    <img alt="img_sample" src="https://via.placeholder.com/100"></img>
                    <img alt="map_sample" src="https://via.placeholder.com/100"></img>
                </div>
                <div>
                    <div css={Sticky}>
                        <div css={ContentsArea}>
                            <div css={ContentsHead}>
                                {/* 경로 >> map */}
                                <div css={Route}>
                                    <button>강남역</button>
                                    <button>종로</button>
                                    <button>잠실</button>
                                    <button>강남역</button>
                                    <button>종로</button>
                                    <button>잠실</button>
                                    <button>강남역</button>
                                    <button>종로</button>
                                    <button>잠실</button>
                                </div>
                                {/* 개별 정보 */}
                                <div css={IndContent}>
                                    <div>경비</div>
                                    <span>50000원</span>
                                    <div>이동 수단</div>
                                    <span>자동차</span>
                                    <div>상세 설명</div>
                                    <span> 아이들도 입장 가능합니다! </span>
                                </div>
                            </div>
                            {/* 공통 정보 */}
                            <div css={ContentsBody}>
                                <div css={ComContent}>
                                    <span>카테고리</span>
                                    <span>혼자 여행</span>
                                </div>
                                <div css={ComContent}>
                                    <span>여행일</span>
                                    <span>2023.02.08</span>
                                </div>
                                <div css={ComContent}>
                                    <span>총 여행 경비</span>
                                    <span>700,000원</span>
                                </div>
                                <div css={TagBox}>
                                    <div>맛집</div>
                                    <div>혼밥</div>
                                    <div>사람 많음ㅜㅜ</div>
                                </div>
                            </div>
                        </div>
                        <button>가치갈래?</button>
                        <button>공유</button>
                    </div>
                </div>
            </div>
            {/* 후기 영역 */}
            <div css={ReviewContainer}>
                <div css={ReviewCount}>
                    {reviewDummy.length !== 0
                        ? `Review : ${reviewDummy.length} 개`
                        : "첫 번째 후기의 주인공이 되어주세요!"}
                </div>
                <div css={RatingBox}>
                    {starArray.map((arrayindex, index) => (
                        <AiFillStar
                            key={index}
                            onClick={() => setRatingIndex(arrayindex)}
                            className={index <= ratingIndex ? "active" : "inactive"}
                            size="20"
                        />
                    ))}
                </div>
                <div css={ReviewInput}>
                    <textarea placeholder="후기를 작성해주세요."></textarea>
                    <button>등록</button>
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
                >
                    <StyledRating
                        name="customized-color"
                        defaultValue={2}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        onClick={(value) => setState(value)}
                    />
                </Box>
            </div>
        </div>
    );
};
const Wrap = css`
    margin: 3rem;
    width: 100%;
    height: 100vh;
`;

const TotalContainer = css`
    display: flex;
    flex-direction: row;
    padding-bottom: 30px;
`;
const Image = css`
    display: flex;
    flex-direction: column;
    width: 65%;
    padding: 10px;

    img {
        max-width: 100%;
        height: auto !important;
    }
`;

// Sticky 작동안됨....
const Sticky = css`
    position: -webkit-sticky; /* 사파리 브라우저 지원 */
    position: sticky;
    top: 0;
    padding: 10px;
`;

const ContentsArea = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid gray;

    width: 300px;
    height: auto;
    padding: 10px;
`;

const ContentsHead = css`
    display: flex;
`;

const Route = css`
    display: flex;
    flex-direction: column;

    button {
        width: 70px;
        height: 50px;
    }
`;
const IndContent = css`
    padding: 10px;

    div {
        color: red;
        font-size: 15px;
        margin: 10px;
    }

    span {
        padding: 5px;
    }

    span:not(:last-of-type) {
        border-bottom: solid;
    }
`;

const ContentsBody = css`
    padding-top: 20px;
`;

const ComContent = css`
    display: flex;
    justify-content: space-between;
    padding: 3px 20px;
`;

const TagBox = css`
    display: flex;
    padding: 10px 15px;
    div {
        background-color: #e1ecf4;
        border-radius: 3px;
        padding: 5px;
        margin: 5px;
        color: #39739d;
        font-size: 12px;
    }
`;

const ReviewContainer = css`
    padding-left: 20px;
`;

const ReviewCount = css`
    padding-bottom: 10px;
`;

const ReviewInput = css`
    display: flex;
    justify-content: space-between;
    width: 800px;
    border: 1px solid gray;

    textarea {
        padding: 20px 0 0 20px;
        border: none;
        width: 800px;
        height: 80px;
    }

    button {
        width: 80px;
    }
`;
const ReviewList = css`
    padding-top: 20px;
`;

const RatingBox = css`
    width: fit-content;

    .inactive {
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

export default Detail;
