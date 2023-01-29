import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//Icon
import FavoriteIcon from "@mui/icons-material/Favorite";

//components
import Detailform from "../components/Detail_components/Detailform";
import Reviewform from "../components/Detail_components/Reviewform";
import { PALETTE } from "../Common";
import Total from "../components/Detail_components/Total";

//recoil
import { useRecoilState } from "recoil";
import { userInfoState, ContentDetail, ReviewListState, GetPosition } from "../state/atom";

//Etc
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import { getContent, deleteContent } from "../util/axiosContents";
import { getUserInfo } from "../util/axiosUser";

const Detail = () => {
    const navigate = useNavigate();
    const pathname = location.pathname;
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const [position, setPosition] = useRecoilState(GetPosition);
    const [reviewList, setReviewList] = useRecoilState(ReviewListState);
    const [update, setUpdate] = useState(false);

    const getContentDetail = (contentId) => {
        getContent(contentId).then((res) => {
            setContentDetail(res.data);
            setReviewList(res.data.data && res.data.data.comments);
        });
    };

    const deleteContentDetail = (contentId) => {
        deleteContent(contentId).then((res) => {
            if (res) {
                setUpdate(true);
                navigate("/");
            }
        });
    };

    useEffect(() => {
        getContentDetail(location.pathname.slice(8));
        setPosition({
            // lat: contentDetail && contentDetail.data && contentDetail.data.routes[0].x,
            // lng: contentDetail && contentDetail.data && contentDetail.data.routes[0].y,
            lat: contentDetail.data && contentDetail.data.routes[0].x,
            lng: contentDetail.data && contentDetail.data.routes[0].y,
        });
    }, []);

    useEffect(() => {
        if (update) {
            getUserInfo(userInfo.userId).then((data) => {
                setUserInfo(data.data);
            });
            setUpdate(false);
        }
    }, [update]);

    return (
        <div css={Wrap}>
            <h1>{contentDetail.data && contentDetail.data.title}</h1>
            <div>수정 </div>
            <button onClick={() => deleteContentDetail(location.pathname.slice(8))}>삭제 </button>
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
