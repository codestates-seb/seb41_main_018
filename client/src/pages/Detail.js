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
import axios from "axios";

// const content = {
//     contentId: 1,
//     title: "커플 여행",
//     body: "해피",
//     themeType: "COUPLE",
//     date: "2023.01.21",
//     routeName: "서울에서 놀자",
//     routes: [
//         {
//             routeId: 1,
//             price: 20000,
//             vehicle: "자동차",
//             place: "아르떼 뮤지엄",
//             body: "넘 이쁨",
//             x: "1",
//             y: "1",
//         },

//         {
//             routeId: 2,
//             price: 10000,
//             vehicle: "자동차",
//             place: "금오름",
//             body: "조하용",
//             x: "1",
//             y: "1",
//         },
//         {
//             routeId: 3,
//             price: 10000,
//             vehicle: "자동차",
//             place: "경복궁",
//             body: "한복 체험 잼남",
//             x: "1",
//             y: "1",
//         },
//     ],
//     comment: [],
// };

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
            <h1>제주도 1일차 여행 추천 경로!</h1>
            <div css={ContentInfo}>
                <span>작성자 : 원할머니멱살</span>
                <span>2023. 01. 22</span>
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

    h1 {
        padding: 30px;
    }
`;
const ContentInfo = css`
    align-self: flex-end;
    span {
        padding: 10px 30px;
    }
`;

const TotalContainer = css`
    display: flex;
    flex-direction: row;
    padding-bottom: 30px;
`;
/* const Image = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65%;
    height: 500px;
    padding: 20px;
`; */

const ContentsBody = css`
    padding-top: 20px;
    display: flex;
    align-self: center;
`;

const ComContent = css`
    display: flex;
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
export default Detail;
