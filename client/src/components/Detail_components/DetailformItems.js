/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";

//component
import Detial_Img from "./Detail_Img";
import Map from "../../pages/PostPage/Map";

//utill
import { PALETTE } from "../../Common";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";

const DetailformItems = (props) => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const data = contentDetail.data && contentDetail.data.routes[props.index];

    return (
        <div css={wrap}>
            <ul>
                <li>
                    <span>경비</span>
                    <div>{data && data.price}</div>
                </li>
                <li>
                    <span>이동 수단</span>
                    <div>{data && data.vehicle}</div>
                </li>
                <li
                    css={css`
                        flex-direction: column;
                    `}
                >
                    <span>상세 설명</span>
                    <div
                        css={css`
                            font-size: 0.9rem;
                            margin: 20px 15px 0;
                        `}
                    >
                        {data && data.body}
                    </div>
                </li>
            </ul>
        </div>
    );
};

const wrap = css`
    margin: 10px auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 769px) {
        flex-direction: row;
    }

    li {
        display: flex;
    }

    span {
    }
    div {
    }
`;

// 미사용부분
const clicked = css`
    margin: 5px auto;
    text-align: start;
    border-radius: ${PALETTE.border_radius};
    font-size: 1.15rem;
    font-weight: 500;
    animation: identifier 0.5s ease-in-out;
    display: flex;
    flex-wrap: wrap;

    @keyframes identifier {
        0% {
            max-height: 0px;
            opacity: 0;
        }
        100% {
            max-height: 300px;
            opacity: 1;
        }
    }
    ul {
        @media (min-width: 769px) {
            width: 25vw;
            height: 100%;
            max-width: 370px;
            background-color: red;
            margin: 10px;
        }
    }
    li {
        display: flex;
        margin: 40px 0;
        justify-content: space-between;
        align-items: start;
        animation: fadein 1s ease-in-out;
        @keyframes fadein {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }

    span {
    }
    ul,
    img {
        flex-basis: 250px;
        flex-grow: 1;
    }
`;

const Img = css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;

    img {
        flex-basis: 200px;
        flex-grow: 1;
        height: 300px;
    }
`;

export default DetailformItems;
