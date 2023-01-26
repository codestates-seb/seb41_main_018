import React, { useEffect } from "react";
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

// 경로 데이터 더미
const contents = {
    routes: [
        {
            routeId: 1,
            price: 20000,
            vehicle: "자동차",
            place: "아르떼 뮤지엄",
            body: "넘 이쁨",
            x: "1",
            y: "1",
        },

        {
            routeId: 2,
            price: 10000,
            vehicle: "자동차",
            place: "금오름",
            body: "조하용",
            x: "1",
            y: "1",
        },
        {
            routeId: 3,
            price: 10000,
            vehicle: "자동차",
            place: "경복궁",
            body: "한복 체험 잼남",
            x: "1",
            y: "1",
        },
    ],
};

const Detail = () => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const getContentDetail = () => {
        getContent(1).then((res) => {
            /* setContentDetail(res); */
            setContentDetail(res.data);
            //setReview(res.data.comment);
        });
    };
    useEffect(() => {
        getContentDetail();
    }, []);

    const data = contentDetail.data;

    return (
        <div className="Detail" css={Wrap}>
            <h2>{data && data.title}</h2>
            <div css={ContentInfo}>
                {/* 🥲 */}
                {/* <span>{data && data.themeType}</span>/<span>{data && data.createdAt}</span>/
                <span>{`${data && data.amount}₩`}</span> */}
            </div>
            {/* 공통 정보 */}
            <div css={ContentsBody}>
                <div css={ComContent}>
                    <span css={ContentName}>카테고리</span>
                    <span>{`${data && data.themeType}`}</span>/
                </div>
                <div css={ComContent}>
                    <span css={ContentName}>여행일</span>
                    <span>{`${data && data.createdAt}`}</span>/
                </div>
                <div css={ComContent}>
                    <span css={ContentName}>총 여행 경비</span>
                    <span>{`${data && data.amount}₩`}</span>
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
    display: flex;
    align-self: flex-start;
    margin: 0 27px;
    margin-top: -5px;
`;
const ComContent = css`
    font-size: 0.9rem;

    span {
        margin: 5px;
    }
`;
const ContentName = css`
    display: none;
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
