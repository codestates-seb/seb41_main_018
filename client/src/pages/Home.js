/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import HomeItems from "../components/HomeItems";
import Categorybar from "../components/Categorybar";

const Home = () => {
    return (
        <div>
            <Categorybar />
            <div
                css={css`
                    margin: 0 30px;
                    font-size: 17px;
                    font-weight: 600;
                `}
            >
                {/* 지역 여행 */}
            </div>
            <div
                css={css`
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    margin: 10px 20px;
                `}
            >
                <HomeItems />
                <HomeItems />
                <HomeItems />
                <HomeItems />
            </div>
        </div>
    );
};

export default Home;
