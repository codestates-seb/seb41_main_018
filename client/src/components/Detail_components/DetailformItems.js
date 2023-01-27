/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";

//component
import Detial_Img from "./Detail_Img";

//utill
import { PALETTE } from "../../Common";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";

const DetailformItems = (props) => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const data = contentDetail.data;
    const RouteData = contentDetail.data && contentDetail.data.routes[props.index];

    return (
        <div css={wrap}>
            <Detial_Img />
            <div
                css={css`
                    margin-left: 10px;
                `}
            >
                <BsFillHeartFill css={heartIcon} />
                <span>{`${data && data.heartCount} likes`}</span>
            </div>
            <ul
                css={css`
                    @media (min-width: 768px) {
                        display: flex;
                    }
                `}
            >
                <div css={PriceVehicleWrap}>
                    <li>
                        <span>경비</span>
                        <div>{RouteData && RouteData.price}</div>
                    </li>
                    <li>
                        <span>이동 수단</span>
                        <div>{RouteData && RouteData.vehicle}</div>
                    </li>
                </div>
                <li>
                    <span>주소</span>
                    <div>강원 강릉시 난설헌로 131</div>
                </li>
            </ul>
            <div css={Contents}>{RouteData && RouteData.body}</div>
        </div>
    );
};

const wrap = css`
    font-size: 0.9rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        font-size: 1.175rem;
    }
    ul {
        margin: 20px 0;
    }

    li {
        display: flex;
    }

    span {
        font-weight: 600;
        margin: 0 10px;
    }
`;

const Contents = css`
    margin: 10px;
`;

const PriceVehicleWrap = css`
    display: flex;
    margin-bottom: 10px;
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

const heartIcon = css`
    font-size: 1rem;
    margin-top: 7px;
    color: #ff6d75;
`;
export default DetailformItems;
