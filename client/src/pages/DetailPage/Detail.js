import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Swal from "sweetalert2";

//components
import DetailForm from "./DetailComponents/DetailForm";
import ReviewForm from "./DetailComponents/ReviewForm";
import { PALETTE } from "../../Common";
import TotalInformation from "./DetailComponents/TotalInformation";
import DetailDeleteModal from "./DetailComponents/DetailDeleteModal";
import Loading from "../components/Loding";

//recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    userInfoState,
    ContentDetail,
    ReviewListState,
    DetailContentIdState,
    DetailuserIdState,
    DetailTitleState,
    DetailThemeTypeState,
    DetailTagState,
    DetailTravelDateState,
    DetailRouteState,
} from "../../state/atom";

//Etc
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import { getContent } from "../../util/axiosContents";

const Detail = () => {
    const navigate = useNavigate();
    const pathName = location.pathname;
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const setReviewList = useSetRecoilState(ReviewListState);
    const setDetailcontentId = useSetRecoilState(DetailContentIdState);
    const setDetailuserId = useSetRecoilState(DetailuserIdState);
    const setDetailTitle = useSetRecoilState(DetailTitleState);
    const setDetailThemeType = useSetRecoilState(DetailThemeTypeState);
    const setDetailTag = useSetRecoilState(DetailTagState);
    const setDetailTravelDate = useSetRecoilState(DetailTravelDateState);
    const setDetailRoute = useSetRecoilState(DetailRouteState);

    const [isMyPost, setMyPost] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const contentsUserId = contentDetail.data && contentDetail.data.userId;
    const loginUserId = userInfo.userId;
    const postDate = dayjs(contentDetail.data && contentDetail.data.createdAt).format("YYYY.MM.DD");

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        width: "380px",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const getContentDetail = (contentId) => {
        getContent(contentId).then((res) => {
            setContentDetail(res && res.data);
            setReviewList(res.data && res.data.data && res.data.data.comments);
        });
    };

    const handleMyPost = () => {
        if (contentsUserId === loginUserId) {
            setMyPost(true);
        }
        setLoading(false);
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
            Toast.fire({
                icon: "error",
                title: "권한이 없습니다.",
            });
        }
    };

    useEffect(() => {
        getContentDetail(pathName.slice(8));
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
                            <TotalInformation />
                            <div css={PostDate}>{`${postDate} 작성`}</div>
                        </div>

                        <div
                            css={ButtonBox}
                            className={contentsUserId === loginUserId ? "" : "hidden"}
                        >
                            <button css={BtnStyle} onClick={updateMyPost}>
                                Update
                            </button>
                            <button css={BtnStyle} onClick={showModal}>
                                Delete
                            </button>
                        </div>
                        <div css={TotalContainer}>
                            <DetailForm />
                        </div>

                        <ReviewForm />
                        {isModalOpen && (
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

const BtnStyle = css`
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: ${PALETTE.border_radius};
    padding: 5px 10px;
    &:hover {
        background-color: #c5c5c5;
    }
`;

const PostDate = css`
    color: rgba(0, 0, 0, 0.5);
    width: 130px;
    margin-top: 13px;
    margin-bottom: -46px;
`;
export default Detail;
