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
import DetailDeleteModal from "../components/Detail_components/DetailDeleteModal";

//recoil
import { useRecoilState } from "recoil";
import { userInfoState, ContentDetail, ReviewListState, GetPosition,
        DetailContentIdState, DetailuserIdState, DetailTitleState, DetailThemeTypeState,
        DetailTagState, DetailTravelDateState, DetailRouteState } from "../state/atom";

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
    const [reviewList, setReviewList] = useRecoilState(ReviewListState);
    const [DetailcontentId, setDetailcontentId] = useRecoilState(DetailContentIdState);
    const [DetailuserId, setDetailuserId] = useRecoilState(DetailuserIdState);
    const [DetailTitle, setDetailTitle] = useRecoilState(DetailTitleState);
    const [DetailThemeType, setDetailThemeType] = useRecoilState(DetailThemeTypeState);
    const [DetailTag, setDetailTag] = useRecoilState(DetailTagState);
    const [DetailTravelDate, setDetailTravelDate] = useRecoilState(DetailTravelDateState);
    const [DetailRoute, setDetailRoute] = useRecoilState(DetailRouteState);

    const [isMyPost, setMyPost] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const contentsUserId = contentDetail.data && contentDetail.data.userId;
    const logInUserId = userInfo.userId;

    const getContentDetail = (contentId) => {
        getContent(contentId).then((res) => {
            setContentDetail(res && res.data);
            setReviewList(res.data.data && res.data.data.comments);
        });
    };

    const handleMyPost = () => {
        if (contentsUserId === logInUserId) {
            setMyPost(true);
            // console.log(isMyPost);
        }
    };

    const updateMyPost = () => {
        setDetailcontentId(Object.values(contentDetail.data)[2])
        setDetailuserId(Object.values(contentDetail.data)[3])
        setDetailTitle(Object.values(contentDetail.data)[4])
        setDetailThemeType(Object.values(contentDetail.data)[5])
        setDetailTag(Object.values(contentDetail.data)[8])
        setDetailTravelDate(Object.values(contentDetail.data)[10])
        setDetailRoute(Object.values(contentDetail.data)[15])
        navigate("/edit");
    }

    const showModal = () => {
        setModalOpen(true);
    };

    useEffect(() => {
        getContentDetail(location.pathname.slice(8));
    }, []);

    return (
        <div css={Wrap}>
            <h1>{contentDetail.data && contentDetail.data.title}</h1>

            <div css={ContentInfo}>
                <Total />

                <div
                    css={css`
                        display: flex;
                    `}
                >
                    <button css={btnStyle} onClick={updateMyPost}>
                        Update
                    </button>
                    <button css={btnStyle} onClick={showModal}>
                        Delete
                    </button>
                </div>
            </div>

            <div css={TotalContainer}>
                <Detailform />
            </div>
            <Reviewform />
            {modalOpen && (
                <DetailDeleteModal text="정말 삭제하시겠습니까?" setModalOpen={setModalOpen} />
            )}
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
    display: flex;
    font-size: 0.9rem;
    width: 90vw;
    span {
        margin: 5px;
    }
`;

const TotalContainer = css`
    display: flex;
    flex-direction: column;
    margin: 30px 0;
`;

const btnStyle = css`
    cursor: pointer;
    margin: 40px 0 -17px 10px;
    padding: 10px 20px;
    background-color: ${PALETTE.default_color};
    border-radius: ${PALETTE.border_round};
    border: 1px solid ${PALETTE.default_color};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    color: white;
    &:hover {
        background-color: ${PALETTE.default_hover};
    }
`;

export default Detail;
