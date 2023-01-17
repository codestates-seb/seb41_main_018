/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { PALETTE } from "../Common";
import { css } from "@emotion/react";

const DetailformItems = (props) => {
    const [isClick, setClick] = useState(false);
    const handleClick = () => {
        setClick(!isClick);
    };
    return (
        <>
            <div onClick={handleClick} css={wrap}>
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
                                <div> 아이들도 입장 가능합니다! </div>
                            </li>
                        </ul>
                    </div>
                ) : (
                    false
                )}
            </div>

            <div></div>
        </>
    );
};

const wrap = css`
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    border: 3px solid ${PALETTE.default_color};
    border-radius: ${PALETTE.border_radius};
    width: 27vw;
    margin: 10px auto;
    padding: 5px;
    &:hover {
        cursor: pointer;
    }
`;

const clicked = css`
    width: 25vw;
    margin: 5px auto;
    text-align: start;
    border-radius: ${PALETTE.border_radius};
    font-size: 1.2rem;
    font-weight: 500;
    animation: identifier 1s ease-in-out;

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
            50% {
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
`;

const close = css`
    animation: closed 1s ease-in-out;
    @keyframes closed {
        0% {
            max-height: 300px;
            opacity: 1;
        }
        100% {
            max-height: 0px;
            opacity: 0;
        }
    }
`;
export default DetailformItems;
