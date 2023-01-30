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
import Loading from "../components/Loding";

//recoil
import { useRecoilState } from "recoil";
import {
    userInfoState,
    ContentDetail,
    ReviewListState,
    GetPosition,
    DetailContentIdState,
    DetailuserIdState,
    DetailTitleState,
    DetailThemeTypeState,
    DetailTagState,
    DetailTravelDateState,
    DetailRouteState,
} from "../state/atom";

//Etc
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import { getContent, deleteContent } from "../util/axiosContents";
import { getUserInfo } from "../util/axiosUser";
import Button from "../components/Button";

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
    const postingData = dayjs(contentDetail.data && contentDetail.data.createdAt).format(
        "YYYY.MM.DD"
    );

    const getContentDetail = (contentId) => {
        getContent(contentId).then((res) => {
            setContentDetail(res && res.data);
            setReviewList(res.data.data && res.data.data.comments);
        });
    };

    const handleMyPost = () => {
        if (contentsUserId === logInUserId) {
            setMyPost(true);
        }
        setIsLoading(false);
    };

    const updateMyPost = () => {
        setDetailcontentId(Object.values(contentDetail.data)[2]);
        setDetailuserId(Object.values(contentDetail.data)[3]);
        setDetailTitle(Object.values(contentDetail.data)[4]);
        setDetailThemeType(Object.values(contentDetail.data)[5]);
        setDetailTag(Object.values(contentDetail.data)[8]);
        setDetailTravelDate(Object.values(contentDetail.data)[10]);
        setDetailRoute(Object.values(contentDetail.data)[15]);
        navigate("/edit");
    };

    const showModal = () => {
        if (userInfo.userId === contentsUserId) {
            setModalOpen(true);
        } else {
            alert("권한이 없습니다.");
        }
    };

    useEffect(() => {
        getContentDetail(location.pathname.slice(8));
        handleMyPost();
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div css={Wrap}>
                        <h1>{contentDetail.data && contentDetail.data.title}</h1>
                        <div css={ContentInfo}>
                            <Total />
                            <div css={postDate}>{`${postingData} 작성`}</div>
                        </div>

                        <div css={ButtonBox}>
                            {/* className={isMyPost ? "" : "hidden"} */}
                            <button css={btnStyle} onClick={updateMyPost}>
                                Update
                            </button>
                            <button css={btnStyle} onClick={showModal}>
                                Delete
                            </button>
                        </div>
                        <div css={TotalContainer}>
                            <Detailform />
                        </div>

                        <Reviewform />
                        {modalOpen && (
                            <DetailDeleteModal
                                text="정말 삭제하시겠습니까?"
                                setModalOpen={setModalOpen}
                            />
                        )}
                    </div>
                </>
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
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    width: 90vw;
    span {
        margin: 5px;
    }
`;

const ButtonBox = css`
    display: flex;
    position: relative;
    width: 90%;
    top: 80px;
    justify-content: end;
    margin-top: -40px;
    @media (min-width: 768px) {
        top: 74px;
    }

    @media (min-width: 768px) {
        z-index: 3;
    }

    &.hidden {
        visibility: hidden;
    }
`;

const TotalContainer = css`
    display: flex;
    flex-direction: column;
    margin: 30px 0;
`;

const btnStyle = css`
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: ${PALETTE.border_radius};
    padding: 5px 10px;
    &:hover {
        background-color: #c5c5c5;
    }
`;

const postDate = css`
    color: rgba(0, 0, 0, 0.5);
    width: 130px;
    margin-top: 13px;
    margin-bottom: -46px;
`;
export default Detail;
