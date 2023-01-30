import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import HomeItems from "../components/Home_components/HomeItems";
import Regionitems from "../components/Home_components/RegionItems";
import Categorybar from "../components/Categorybar";
import Banner from "../components/Home_components/Banner";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import right from "../assets/right.png";
import left from "../assets/left.png";
import { getContent } from "../util/axiosContents";
import { useRecoilState } from "recoil";
import { ContentsList, loginState, userInfoState } from "../state/atom";
import { useNavigate } from "react-router-dom";
import 서울 from "../assets/sampleImg/region/서울.png";
import 부산 from "../assets/sampleImg/region/부산.png";
import 제주 from "../assets/sampleImg/region/제주.png";
import 담양 from "../assets/sampleImg/region/담양.png";
import 파주 from "../assets/sampleImg/region/파주.png";
import 포천 from "../assets/sampleImg/region/포천.png";
import 강릉 from "../assets/sampleImg/region/강릉.png";
import 여수 from "../assets/sampleImg/region/여수.png";
import 전주 from "../assets/sampleImg/region/전주.png";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Home = () => {
    const navigate = useNavigate();
    const [contentsList, setcontentsList] = useRecoilState(ContentsList);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    // 조회수 기준 정렬
    const viewCountSortArr = [...contentsList].sort((a, b) => b.viewCount - a.viewCount);
    // 좋아요 기준 정렬
    const heartCountSortArr = [...contentsList].sort((a, b) => b.heartCount - a.heartCount);

    // 비로그인 시에는 post 불가
    const postButtonClick = () => {
        console.log(userInfo.userId);
        if (userInfo.userId !== undefined) {
            navigate("/post");
        } else {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    };

    useEffect(() => {
        getContent().then((res) => {
            setIsLoading(false);
            setcontentsList(res.data.data);
        });
    }, []);

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

    const data = [
        { text: "서울", img: "서울" },
        { text: "부산", img: "부산" },
        { text: "제주", img: "제주" },
        { text: "여수", img: "여수" },
        { text: "전주", img: "전주" },
        { text: "강릉", img: "강릉" },
        { text: "대구", img: "대구" },
        { text: "포천", img: "포천" },
        { text: "파주", img: "파주" },
        { text: "담양", img: "담양" },
    ];

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Categorybar />
                    <Swiper {...swiperOption} css={postStyle}>
                        <div>
                            {/* {data.map((el, index) => {
                                <SwiperSlide>
                                    <Regionitems img={`${el.img}`} text={`${el.text}`} />
                                </SwiperSlide>;
                            })} */}
                            <SwiperSlide>
                                <Regionitems img={`${서울}`} text="서울" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${부산}`} text="부산" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${제주}`} text="제주" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${강릉}`} text="강릉" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${담양}`} text="담양" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${전주}`} text="전주" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${여수}`} text="여수" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${파주}`} text="파주" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Regionitems img={`${포천}`} text="포천" />
                            </SwiperSlide>
                        </div>
                    </Swiper>

                    <h2 css={itemsTitle}>🛫 방금 올라온 🔥HOT🔥 여행지</h2>
                    <Swiper {...swiperOption} css={postStyle}>
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

                    <h2 css={itemsTitle}>✨ 관심 급상승 여행지</h2>
                    <Swiper {...swiperOption} css={postStyle}>
                        <div>
                            {viewCountSortArr.map((content) => (
                                <SwiperSlide key={content.contentId}>
                                    <HomeItems content={content} />
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>

                    <h2 css={itemsTitle}>❤️ 다른 사람들이 좋아하는 여행지</h2>
                    <Swiper {...swiperOption} css={postStyle}>
                        <div>
                            {heartCountSortArr.map((content) => (
                                <SwiperSlide key={content.contentId}>
                                    <HomeItems content={content} />
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                    <button css={postBtn} onClick={postButtonClick}>
                        <span>내 여행지 공유하기</span>
                    </button>
                </>
            )}
        </div>
    );
};
const postBtn = css`
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
        background: #78c7d2;
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

const itemsTitle = css`
    width: 80vw;
    margin: 30px auto 0;
    color: rgb(0, 0, 0, 0.85);
    font-size: 1.5rem;
    font-weight: 600;
`;

const postStyle = css`
    width: 80vw;

    .swiper-button-next {
        background: url(${right}) no-repeat;
        right: 0;
        background-size: 140% auto;
        background-position: center;
        position: absolute;
    }
    .swiper-button-prev {
        background: url(${left}) no-repeat;
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
