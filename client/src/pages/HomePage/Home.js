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
    slidesPerView: 5,
    navigation: true,
    breakpoints: {
        1441: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 4,
        },
        876: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        400: {
            slidesPerView: 1,
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

    useEffect(() => {
        getContent().then((res) => {
            const dummyImage = Object.values(SampleImgSrc);
            const list = res.data.data?.map((el, index) => ({ ...el, image: dummyImage[index] }));
            setContentsList(list);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Categorybar />
                    <Swiper {...swiperOption} css={PostStyle}>
                        <div>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.seoul_img}`} text="서울" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.busan_img}`} text="부산" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.jeju_img}`} text="제주" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems
                                    img={`${GachiGalleImgSrc.gangneung_img}`}
                                    text="강릉"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.damyang_img}`} text="담양" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.jeonju_img}`} text="전주" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.yeosu_img}`} text="여수" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.paju_img}`} text="파주" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${GachiGalleImgSrc.pocheon_img}`} text="포천" />
                            </SwiperSlide>
                        </div>
                    </Swiper>

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
                    <Banner />

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
                    <button css={PostButton} onClick={postButtonClick}>
                        <span>내 여행지 공유하기</span>
                    </button>
                </>
            )}
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

const ItemTitle = css`
    width: 80vw;
    margin: 30px auto 0;
    color: rgb(0, 0, 0, 0.85);
    font-size: 1.5rem;
    font-weight: 600;
`;

const PostStyle = css`
    z-index: 1;
    display: grid;
    margin: 0 auto;
    gap: 20px;
    width: 80vw;
    height: 100%;

    .swiper-button-next {
        background: url(${GachiGalleImgSrc.right_button_img}) no-repeat;
        right: 0;
        background-size: 140% auto;
        background-position: center;
        position: absolute;
    }
    .swiper-button-prev {
        background: url(${GachiGalleImgSrc.left_button_img}) no-repeat;
        left: 0;
        background-size: 140% auto;
        background-position: center;
        position: absolute;
    }
    .swiper-button-next::after,
    .swiper-button-prev::after {
        display: none;
    }
`;

export default Home;
