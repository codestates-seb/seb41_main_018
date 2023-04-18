import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

//component
import HomeItems from "./HomeComponents/HomeItems";
import Regionitems from "./HomeComponents/RegionItems";
import Categorybar from "../components/CategoryBar";
import Banner from "./HomeComponents/Banner";
import Loading from "../components/Loding";

//UILibrary
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

//API
import { getContent } from "../../util/axiosContents";

//Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { ContentsList, userInfoState } from "../../state/atom";

import { GachiGalleImgSrc, SampleImgSrc } from "../../sampleImage";
import { FaObjectGroup } from "react-icons/fa";

SwiperCore.use([Navigation, Pagination, Autoplay]);

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

const swiperOption = {
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: true,
    breakpoints: {
        1441: {
            slidesPerView: 5,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        876: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
    },
};

const Home = () => {
    const navigate = useNavigate();
    const [contentsList, setContentsList] = useRecoilState(ContentsList);
    const [isLoading, setIsLoading] = useState(false);
    const isUserInfo = useRecoilValue(userInfoState);

    // 조회수 기준 정렬
    const viewCountSortArr = [...contentsList].sort((a, b) => b.viewCount - a.viewCount);
    // 좋아요 기준 정렬
    const heartCountSortArr = [...contentsList].sort((a, b) => b.heartCount - a.heartCount);

    // 비로그인 시에는 post 불가
    const postButtonClick = () => {
        if (isUserInfo.userId !== undefined) {
            navigate("/post");
        } else {
            Toast.fire({
                icon: "error",
                title: "로그인이 필요합니다.",
            });
            navigate("/login");
        }
    };

    //백엔드 이미지 업로드 미구현으로 인한 더미이미지 나열
    useEffect(() => {
        getContent().then((res) => {
            const dummyImage = Object.values(SampleImgSrc);
            const list = res.data.data?.map((el, index) => ({ ...el, image: dummyImage[index] }));
            setContentsList(list);
            setIsLoading(false);
        });
    }, []);

    //지역 카테고리 더미이미지
    const regionDummyImg = [
        { img: GachiGalleImgSrc.seoul_img, text: "서울" },
        { img: GachiGalleImgSrc.busan_img, text: "부산" },
        { img: GachiGalleImgSrc.jeju_img, text: "제주" },
        { img: GachiGalleImgSrc.gangneung_img, text: "강릉" },
        { img: GachiGalleImgSrc.damyang_img, text: "담양" },
        { img: GachiGalleImgSrc.jeonju_img, text: "전주" },
        { img: GachiGalleImgSrc.yeosu_img, text: "여수" },
        { img: GachiGalleImgSrc.paju_img, text: "파주" },
        { img: GachiGalleImgSrc.pocheon_img, text: "포천" },
    ];

    return (
        <div>
            <Categorybar />
            <div css={Container}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <Swiper {...swiperOption} css={PostStyle}>
                            <div>
                                {regionDummyImg.map((el, index) => {
                                    return (
                                        <SwiperSlide>
                                            <Regionitems img={el.img} text={el.text} key={index} />
                                        </SwiperSlide>
                                    );
                                })}
                            </div>
                        </Swiper>
                        <div css={ItemWrap}>
                            <h2 css={ItemTitle}>🛫 방금 올라온 🔥HOT🔥 여행지</h2>
                            <Swiper {...swiperOption} css={PostStyle}>
                                <div>
                                    {contentsList &&
                                        contentsList.map((content) => (
                                            <SwiperSlide key={content.contentId}>
                                                <HomeItems content={content} />
                                            </SwiperSlide>
                                        ))}
                                </div>
                            </Swiper>
                        </div>
                        <Banner />
                        <div css={ItemWrap}>
                            <h2 css={ItemTitle}>✨ 관심 급상승 여행지</h2>
                            <Swiper {...swiperOption} css={PostStyle}>
                                <div>
                                    {viewCountSortArr.map((content) => (
                                        <SwiperSlide key={content.contentId}>
                                            <HomeItems content={content} />
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        </div>
                        <div css={ItemWrap}>
                            <h2 css={ItemTitle}>❤️ 다른 사람들이 좋아하는 여행지</h2>
                            <Swiper {...swiperOption} css={PostStyle}>
                                <div>
                                    {heartCountSortArr.map((content) => (
                                        <SwiperSlide key={content.contentId}>
                                            <HomeItems content={content} />
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        </div>
                        <button css={PostButton} onClick={postButtonClick}>
                            <span>내 여행지 공유하기</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const PostButton = css`
    position: sticky;
    left: 85%;
    right: 0;
    bottom: 5%;
    top: 0;
    z-index: 3;
    border: none;
    display: block;
    text-align: center;
    cursor: pointer;
    width: 200px;
    text-transform: uppercase;
    outline: none;
    overflow: hidden;

    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    background-color: #222;
    padding: 17px 20px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 490%;
        width: 140%;
        background: ${PALETTE.default_color};
        -webkit-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
        -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
        transform: translateX(-98%) translateY(-25%) rotate(45deg);
    }
    &:hover:after {
        -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
        transform: translateX(-9%) translateY(-25%) rotate(45deg);
    }
    span {
        position: relative;
        z-index: 1;
    }
`;

const Container = css`
    .swiper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, auto));
    }
`;

const ItemTitle = css`
    width: 80vw;
    min-width: 400px;
    margin: 30px auto 0;
    color: rgb(0, 0, 0, 0.85);
    font-size: 1.5rem;
    font-weight: 600;
`;

const ItemWrap = css`
    margin: 0 0 0 0;
    height: 500px;
    @media (min-width: 575px) {
        height: 400px;
    }
`;

const PostStyle = css`
    z-index: 1;
    margin: 0 auto;
    min-width: 360px;
    width: 80%;
    .swiper-button-next {
        background: url(${GachiGalleImgSrc.right_button_img}) no-repeat;
        right: 0;
        background-size: 100% auto;
        background-position: center;
        position: absolute;
        top: 150px;
    }
    .swiper-button-prev {
        background: url(${GachiGalleImgSrc.left_button_img}) no-repeat;
        left: 0;
        background-size: 100% auto;
        background-position: center;
        position: absolute;
        top: 150px;
    }
    .swiper-button-next::after,
    .swiper-button-prev::after {
        display: none;
    }
`;

export default Home;
