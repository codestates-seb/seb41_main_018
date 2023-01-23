/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { PALETTE } from "../../Common";
import { css } from "@emotion/react";
import Detial_Img from "./Detail_Img";
import sam2 from "../../assets/sampleImg/sam2.jpg";

// 경로 선택 상태관리 필요 import
import { useRecoilState } from "recoil";
import { selectedRouteState } from "../../state/atom";

const DetailformItems = (props) => {
    const [isClick, setClick] = useState(false);
    // 경로 선택 상태
    const [selectedRoute, setSelectedRoute] = useRecoilState(selectedRouteState);
    const handleClick = (routeId) => {
        setClick(!isClick);
        // 선택 된 routeId 저장
        setSelectedRoute(routeId);
    };
    return (
        <>
            <div onClick={() => handleClick(props.routeId)} css={wrap}>
                {props.text}
                {isClick ? (
                    <div css={clicked}>
                        <ul>
                            <li>
                                <span>경비</span>
                                <div>50000원</div>
                            </li>
                            <li>
                                <span>이동 수단</span>
                                <div>자동차</div>
                            </li>
                            <li>
                                <span>상세 설명</span>
                                <div>아이들도 입장 가능합니다!</div>
                            </li>
                        </ul>
                        <img src={sam2} alt="map_sample" width="200px" height="400px" />
                        <div css={Img}>
                            <img src={sam2} alt="img" width="200px" height="400px" />
                            <img src={sam2} alt="img" width="200px" height="400px" />
                            <img src={sam2} alt="img" width="200px" height="400px" />
                        </div>
                        {/*  <Detial_Img /> */}
                    </div>
                ) : (
                    false
                )}
            </div>
        </>
    );
};

const wrap = css`
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    border: 3px solid ${PALETTE.default_color};
    border-radius: ${PALETTE.border_radius};
    max-width: 1000px;
    /*    
    min-width: 250px;
    max-width: 400px; */
    margin: 10px auto;
    padding: 5px;
    &:hover {
        cursor: pointer;
    }
`;

const clicked = css`
    margin: 5px auto;
    text-align: start;
    border-radius: ${PALETTE.border_radius};
    font-size: 1.2rem;
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

    li {
        margin: 30px 0;
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
        margin: 10px;
    }

    div {
        font-size: 1.15rem;
        margin: 15px;
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
