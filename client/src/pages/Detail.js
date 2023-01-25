import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import { useRecoilState } from "recoil";
import Detailform from "../components/Detail_components/Detailform";
import Reviewform from "../components/Detail_components/Reviewform";
import Tag from "../components/Post_components/Tag";
import { getContent } from "../util/axiosDetail";
import { ContentDetail } from "../state/atom";
import axios from "axios";

import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

const Detail = () => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const getContentDetail = (id) => {
        getContent(id).then((res) => {
            setContentDetail(res.data);
            //setReview(res.data.comment);
        });
    };
    return (
        <div className="Detail" css={Wrap}>
            <h2>제주도 1일차 여행 추천 경로!</h2>
            <div css={ContentInfo}>
                {/* 🥲 */}
                <span>혼자 여행</span>/<span>2023.02.08</span>/<span>700,000원</span>
            </div>
            {/* 공통 정보 */}
            <div css={ContentsBody}>
                <div css={ComContent}>
                    <span css={ContentName}>카테고리</span>
                    <span>혼자 여행</span>
                </div>
                <div css={ComContent}>
                    <span css={ContentName}>여행일</span>
                    <span>2023.02.08</span>
                </div>
                <div css={ComContent}>
                    <span css={ContentName}>총 여행 경비</span>
                    <span>700,000원</span>
                </div>
            </div>
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

    h2 {
        align-self: start;
        margin: 30px 30px 5px;
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
    display: none;
    /* padding-top: 20px;
    display: flex;
    align-self: center; */
`;
const ComContent = css`
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    align-items: center;
    font-weight: 600;
    padding: 8px 20px;
`;
const ContentName = css`
    border-radius: ${PALETTE.border_round};
    background-color: #eff5f5;
    color: #497174;
    padding: 7px;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    margin: 10px;
`;
const TotalContainer = css`
    display: flex;
    flex-direction: row;
    margin: 30px 0;
`;

export default Detail;
