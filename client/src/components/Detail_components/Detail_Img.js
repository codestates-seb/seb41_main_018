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
import right from "../../assets/right.png";
import left from "../../assets/left.png";

// import sample img (추후 삭제 예정)
import sam1_1 from "../../assets/sampleImg/sam1_1.png";
import sam1_2 from "../../assets/sampleImg/sam1_2.jpeg";
import sam1_3 from "../../assets/sampleImg/sam1_3.jpg";
import sam2 from "../../assets/sampleImg/sam2.jpg";
import sam3_1 from "../../assets/sampleImg/sam3_1.jpeg";
import sam3_2 from "../../assets/sampleImg/sam3_2.jpeg";
import { Palette } from "@mui/icons-material";
import { PALETTE } from "../../Common";

//recoil
import { useRecoilState } from "recoil";
import { selectedRouteState, ContentDetail } from "../../state/atom";

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
    const [selectedRoute, setSelectedRoute] = useRecoilState(selectedRouteState);
    /* 선택 된 경로만 filter */
    let selected = routeDummy.filter((routeplace) => routeplace.routeId === selectedRoute);

    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);

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
                {selected[0].img.map((img) => (
                    <SwiperSlide key={img}>
                        <img src={img} alt={img.name} />
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
        width: 60vw;
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
