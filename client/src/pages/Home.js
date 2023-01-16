/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import HomeItems from "../components/HomeItems";
import PostItem from "../components/PostItem";
import Categorybar from "../components/Categorybar";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div>
            <Categorybar />
            <div css={itemsTitle}>{/* 지역 여행 */}</div>
            <div
                css={css`
                    display: flex;
                    width: 1440px;
                    margin: 0 auto;
                `}
            >
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
            <Banner />
            <div css={itemsTitle}>✈️ 관심 급상승 여행지</div>
            <div css={items}>
                {/* <HomeItems />
                <HomeItems />
                <HomeItems />
                <HomeItems />
                <HomeItems />
                <HomeItems /> */}
            </div>
        </div>
    );
};

const items = css`
    display: grid;
    margin: 10px 20px;
    grid-template-columns: repeat(6, 1fr);

    @media (max-width: 1440px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 1280px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 860px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 540px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const itemsTitle = css`
    margin: 30px;
    margin-bottom: 10px;
    font-size: 21px;
    font-weight: 600;
`;
export default Home;
