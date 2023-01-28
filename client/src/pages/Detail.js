import React, { useEffect } from "react";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//Icon
import FavoriteIcon from "@mui/icons-material/Favorite";

//components
import Detailform from "../components/Detail_components/Detailform";
import Reviewform from "../components/Detail_components/Reviewform";
import { getContent } from "../util/axiosContents";
import { PALETTE } from "../Common";
import Total from "../components/Detail_components/Total";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail, ReviewListState } from "../state/atom";

//Etc
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
    return (
        <div css={Wrap}>
            {/* <h1>{data && data.title}</h1> */}
            <h1>즐거운 제주도 여행</h1>
            <div css={ContentInfo}></div>
            <Total />
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
        margin: 30px 35px 5px;
        font-size: 1.675rem;
        @media (min-width: 768px) {
            width: 90vw;
            font-size: 2em;
            margin: 30px auto -20px;
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

const TotalContainer = css`
    display: flex;
    flex-direction: row;
    margin: 30px 0;
`;

export default Detail;
