/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { PALETTE } from "../../Common";
import Map from "../../pages/PostPage/Map";
import { css } from "@emotion/react";
import Detial_Img from "./Detail_Img";
import sam2 from "../../assets/sampleImg/sam2.jpg";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

// 경로 선택 상태관리 필요 import
import { useRecoilState } from "recoil";
import { selectedRouteState } from "../../state/atom";
const content = {
    contentId: 1,
    title: "커플 여행",
    body: "해피",
    themeType: "COUPLE",
    date: "2023.01.21",
    routeName: "서울에서 놀자",
    routes: [
        {
            routeId: 1,
            price: 20000,
            vehicle: "자동차",
            place: "아르떼 뮤지엄",
            body: "넘 이쁨",
            x: "1",
            y: "1",
        },

        {
            routeId: 2,
            price: 10000,
            vehicle: "자동차",
            place: "금오름",
            body: "조하용",
            x: "1",
            y: "1",
        },
        {
            routeId: 3,
            price: 10000,
            vehicle: "자동차",
            place: "경복궁",
            body: "한복 체험 잼남",
            x: "1",
            y: "1",
        },
    ],
    comment: [],
};
const DetailformItems = (props) => {
    const [isClick, setClick] = useState(false);
    // 경로 선택 상태
    const [selectedRoute, setSelectedRoute] = useRecoilState(selectedRouteState);
    const handleClick = (routeId) => {
        setClick(!isClick);
        // 선택 된 routeId 저장
        setSelectedRoute(routeId);
    };
    console.log(props.content);

    return (
        <>
            <div css={isClick ? clickedwrap : wrap}>
                <div css={placeTitle} onClick={() => handleClick(props.routeId)}>
                    {/* <div
                        css={css`
                            margin: 0 auto;
                        `}
                    > */}
                    {props.text}
                    {/* </div> */}
                    {isClick ? <IoMdArrowDropupCircle /> : <IoMdArrowDropdownCircle />}
                </div>
                {isClick ? (
                    <div css={clicked}>
                        <div
                            css={css`
                                margin: 10px auto;
                                display: flex;
                                flex-direction: column;
                                @media (min-width: 769px) {
                                    flex-direction: row;
                                }
                            `}
                        >
                            {/* <div
                                css={css`
                                    @media (min-width: 769px) {
                                        display: none;
                                    }
                                `}
                            >
                                <Detial_Img />
                            </div> */}
                            <ul>
                                <li>
                                    <span>경비</span>
                                    <div>50000원</div>
                                </li>
                                <li>
                                    <span>이동 수단</span>
                                    <div>자동차</div>
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
                                        아이들도 입장 가능합니다!
                                    </div>
                                </li>
                            </ul>
                            <div>
                                <Detial_Img />
                            </div>
                        </div>
                        <div
                            css={css`
                                margin: 10px auto;
                            `}
                        >
                            <Map />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

const wrap = css`
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    width: 80vw;
    margin: 0 auto;
    padding: 10px;

    &:hover {
        cursor: pointer;
    }
`;

const placeTitle = css`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
`;

const clickedwrap = css`
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    width: 80vw;
    margin: 0 auto;
    padding: 10px;
`;

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
        border-radius: ${PALETTE.border_round};
        background-color: #eff5f5;
        color: #497174;
        padding: 7px;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        margin: 0 10px;
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
