import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common.js";
import FadeLoader from "react-spinners/FadeLoader";

export const Loading = () => {
    return (
        <div css={Background}>
            <div css={LoadingText}>열심히 로딩중입니다 😊</div>
            <FadeLoader
                color={`${PALETTE.default_color}`}
                height={15}
                width={5}
                radius={2}
                margin={2}
            />
        </div>
    );
};

const Background = css`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingText = css`
    font: 1.2rem "Noto Sans KR";
    text-align: center;
    margin-bottom: 15px;
`;

export default Loading;
