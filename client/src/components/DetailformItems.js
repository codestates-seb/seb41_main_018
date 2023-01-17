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
                    <div css={Clicked}>
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
`;

const Clicked = css`
    width: 25vw;
    margin: 5px auto;
    text-align: start;
    border-radius: ${PALETTE.border_radius};
    font-size: 1.2rem;
    font-weight: 400;
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
    }

    span {
        border: 1px solid ${PALETTE.default_color};
        border-radius: ${PALETTE.border_round};
        padding: 7px;
        text-align: center;
        background-color: ${PALETTE.default_color};
        color: ${PALETTE.white};
        font-weight: 600;
        font-size: 1rem;
        margin: 10px;
    }
    div {
        font-size: 1.1rem;
        /* border-bottom: 1px solid red; */
        margin: 15px;
    }
`;
export default DetailformItems;
