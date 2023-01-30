import React, { useEffect } from "react";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//Icon
import FavoriteIcon from "@mui/icons-material/Favorite";

//components
import Detailform from "./Detailform";
import Reviewform from "./Reviewform";
import { getContent } from "../../util/axiosContents";
import { PALETTE } from "../../Common";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";

//Etc
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

// 768px 이하일 때 나타나는 Total 화면 (카테고리, 여행날짜, 총 비용)
export const Total = () => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const data = contentDetail.data;
    const TravelDate = data && data.travelDate;
    const Amount = data && data.amount;
    const HeartCount = data && data.heartCount;

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
        <div css={ContentsBody}>
            <div css={ComContent}>
                <span css={ComTitle}>여행일</span>
                <span>{dayjs(TravelDate).format("YYYY년 MM월 DD일 dddd")}</span>/
            </div>
            <div css={ComContent}>
                <span css={ComTitle}>카테고리</span>
                <span>{setCategroy(data)}</span>/
            </div>
            <div css={ComContent}>
                <sapn css={ComTitle}>총경비</sapn>
                <span>{`${Amount} 원`}</span>
            </div>
        </div>
    );
};

const ContentsBody = css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    margin: 5px 0 -10px -27px;
    padding: 0 27px;
    @media (min-width: 768px) {
        width: 90vw;
        font-size: 2em;
        margin: 0 0 20px -34px;
    }
`;

const ComContent = css`
    display: flex;
    font-size: 0.9rem;
    span {
        margin: auto 5px;
        color: #555c61;
    }
    @media (min-width: 768px) {
        font-size: 1.225rem;
        color: #0e0e0e;
        margin: 30px 0 -30px;
    } ;
`;

const ComTitle = css`
    display: none;
    @media (min-width: 768px) {
        display: inline-block;
        font-size: 1.25rem;
        font-weight: 700;
        color: ${PALETTE.default_color};
    }
`;

export default Total;
