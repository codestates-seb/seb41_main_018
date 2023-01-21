import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import right from "../../assets/right.png";
import left from "../../assets/left.png";
import { useRecoilState } from "recoil";
import { selectedRouteState } from "../../state/atom";

// import sample img (추후 삭제 예정)
import sam1_1 from "../../assets/sampleImg/sam1_1.png";
import sam1_2 from "../../assets/sampleImg/sam1_2.jpeg";
import sam1_3 from "../../assets/sampleImg/sam1_3.jpg";
import sam2 from "../../assets/sampleImg/sam2.jpg";
import sam3_1 from "../../assets/sampleImg/sam3_1.jpeg";
import sam3_2 from "../../assets/sampleImg/sam3_2.jpeg";

// 경로 데이터 더미
const routeDummy = [
    {
        contentId: 1,
        name: "아르떼 뮤지엄",
        routeId: 1,
        img: [sam1_1, sam1_2, sam1_3],
    },
    {
        contentId: 1,
        name: "금오름",
        routeId: 2,
        img: [sam2],
    },
    {
        contentId: 1,
        name: "명월국민학교",
        routeId: 3,
        img: [sam3_1, sam3_2],
    },
];

const Detial_Img = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [selectedRoute, setSelectedRoute] = useRecoilState(selectedRouteState);

    /* 선택 된 경로만 filter */
    let selected = routeDummy.filter((routeplace) => routeplace.routeId === selectedRoute);

    // 슬라이드 이동 (사용 안할 시 삭제)
    /*  
    const slide = () => {
        console.log(swiper);
        swiper.slideTo(3, 1000);
    }; */
    return (
        <div css={Swiper_Wrap}>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                watchOverflow={true} // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
                className="gallery"
            >
                {selected[0].img.map((img) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt={img.name} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop={false}
                spaceBetween={10}
                slidesPerView={selected[0].img.length}
                freeMode={true}
                watchSlidesProgress={true}
                /* centeredSlides={true} */ /*썸네일 가운데 정렬 */
                modules={[FreeMode, Navigation, Thumbs]}
                className="gallery-thumbs"
            >
                {selected[0].img.map((img) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt={img.name} />
                    </SwiperSlide>
                ))}
                {/* 전체 이미지 불러오기 (사용 안할 시 삭제) */}
                {/* {routeDummy.map((el) =>
                    el.img.map((img) => (
                        <SwiperSlide key={img}>
                            <img src={img} alt={el.name} />
                            <div>{el.name}</div>
                        </SwiperSlide>
                    ))
                )} */}
            </Swiper>
        </div>
    );
};

const Swiper_Wrap = css`
    width: 70%;
    height: 100%;

    @media (max-width: 768px) {
        width: 300px;
        height: 300px;
    }

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    .swiper {
        width: 100%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }

    .swiper-slide {
        background-size: cover;
        background-position: center;
    }

    .gallery {
        height: 80%;
        width: 100%;
    }

    .gallery-thumbs {
        height: 20%;
        box-sizing: border-box;
        padding: 10px 0;
    }

    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
        display: flex;
        flex-direction: column;
        font-size: 12px;
    }

    // 썸네일 개별 이미지
    .gallery-thumbs .swiper-slide img {
        width: 100px;
        margin: 3px;
    }

    .gallery-thumbs .swiper-slide-thumb-active {
        opacity: 1;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    // 버튼
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

export default Detial_Img;
