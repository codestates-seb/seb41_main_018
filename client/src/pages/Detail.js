import React, { useEffect } from "react";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//Icon
import FavoriteIcon from "@mui/icons-material/Favorite";

//components
import Detailform from "../components/Detail_components/Detailform";
import Reviewform from "../components/Detail_components/Reviewform";
import { getContent } from "../util/axiosDetail";
import { ContentDetail } from "../state/atom";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const Detail = () => {
    const pathname = location.pathname;
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const [reviewList, setReviewList] = useRecoilState(ReviewListState);
    const getContentDetail = (contentId) => {
        getContent(contentId).then((res) => {
            setContentDetail(res.data);
            setReviewList(res.data.data && res.data.data.comments);
        });
    };
    useEffect(() => {
        getContentDetail(location.pathname.slice(8));
    }, []);

    const data = contentDetail.data;
    const TravelDate = data && data.travelDate;
    const Amount = data && data.amount;

    const setCategroy = (data) => {
        if (data && data.themeType === "DOMESTIC") {
            return "국내여행";
        } else if (data && data.themeType === "ABROAD") {
            return "해외여행";
        } else if (data && data.themeType === "FAMILY") {
            return "가족여행";
        } else if (data && data.themeType === "COUPLE") {
            return "커플여행";
        } else if (data && data.themeType === "FRIENDS") {
            return "친구여행";
        } else if (data && data.themeType === "ALONE") {
            return "혼자여행";
        } else if (data && data.themeTypee === "CAFE") {
            return "카페투어";
        } else if (data && data.themeType === "FOOD") {
            return "맛집투어";
        }
    };

    return (
        <div className="Detail" css={Wrap}>
            <h1>{data && data.title}</h1>
            <div css={ContentInfo}></div>
            {/* 공통 정보 */}
            <div css={ContentsBody}>
                <div css={ComContent}>
                    {/* <span css={ContentName}>카테고리</span> */}
                    <span>{setCategroy(data)}</span>
                </div>
                <div css={ComContent}>
                    {/* <span css={ContentName}>여행일</span> */}
                    <span>{dayjs(TravelDate).format("YYYY년 MM월 DD일 dddd")}</span>
                </div>
                <div css={ComContent}>
                    {/* <span css={ContentName}>총 여행 경비</span> */}
                    <span>{`${Amount}₩`}</span>
                </div>
            </div>
            {/* <div>
                <FavoriteIcon css={heartIcon} />
                <span>{`${data && data.heartCount} likes`}</span>
            </div> */}
            <div css={TotalContainer}>
                <Detailform />
            </div>

            <Reviewform />
        </div>
    );
};
const Wrap = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        align-self: start;
        margin: 30px 30px 5px;
        @media (max-width: 768px) {
            font-size: 1.675em;
        }
    }
`;
const ContentInfo = css`
    align-self: flex-start;
    font-size: 0.9rem;
    margin: 0 25px;
    span {
        margin: 5px;
    }
`;

const ContentsBody = css`
    display: flex;
    align-self: flex-start;
    margin: 0 27px;
    margin-top: -5px;
    @media (min-width: 768px) {
    }
`;

const ComContent = css`
    font-size: 0.9rem;
    span {
        margin: 0 5px;
        color: #555c61;
        @media (min-width: 768px) {
            font-size: 1.175rem;
        }
    }
`;
const ContentName = css`
    display: none;

    @media (min-width: 768px) {
        display: block;
        border-radius: ${PALETTE.border_round};
        background-color: #eff5f5;
        color: #497174;
        padding: 7px;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        margin: 10px;
    }
`;
const TotalContainer = css`
    display: flex;
    flex-direction: row;
    margin: 30px 0;
`;

const heartIcon = css`
    font-size: 0.9rem;
    color: #ff6d75;
`;
export default Detail;
