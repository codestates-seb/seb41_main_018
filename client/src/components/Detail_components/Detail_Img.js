import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

// import sample img (추후 삭제 예정)
import { DummyImg } from "../../assets/image";
import { Palette } from "@mui/icons-material";
import { PALETTE } from "../../Common";

//recoil
import { useRecoilState } from "recoil";
import { selectedRouteState, ContentDetail } from "../../state/atom";

import { GachiGalleImgSrc } from "../../sampleImage";

const Detial_Img = () => {
    const [selectedRoute, setSelectedRoute] = useRecoilState(selectedRouteState);
    /* 선택 된 경로만 filter */
    // let selected = routeDummy.filter((routeplace) => routeplace.routeId === selectedRoute);

    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const randomImg = Math.floor(Math.random() * DummyImg.length);

    return (
        <div css={Swiper_Wrap}>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {DummyImg.slice(0, 3).map((el, index) => (
                    <SwiperSlide key={index}>
                        <img src={el[randomImg]} alt={el.name} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const Swiper_Wrap = css`
    width: 80vw;
    height: 100%;
    border-radius: 10px;
    margin: 20px auto;
    @media (min-width: 768px) {
        width: 55vw;
        height: 540px;
    }

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
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
        border-radius: 10px;
        width: 100%;
        height: 100%;
        /* object-fit: cover; */
    }

    // 버튼
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

export default Detial_Img;
