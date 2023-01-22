/** @jsxImportSource @emotion/react */
import React from "react";
import { useState, useRef } from "react";
import { PALETTE } from "../../Common";
import Map from "../../pages/PostPage/searchMap";
import { css } from "@emotion/react";

import ImgUpload from "./ImgUpload";
import UseForm, { Post, Input } from "../../util/UseForm";

import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

const PostformItems = (props) => {
    const [isClick, setClick] = useState(false);

    const handleClick = () => {
        setClick(!isClick);
    };

    return (
        <>
            <div css={isClick ? clickedwrap : wrap}>
                <div
                    css={css`
                        display: flex;
                        justify-content: space-between;
                    `}
                    onClick={handleClick}
                >
                    <div
                        css={css`
                            margin: 0 auto;
                        `}
                    >
                        아르떼 뮤지엄
                    </div>
                    {isClick ? <IoMdArrowDropupCircle /> : <IoMdArrowDropdownCircle />}
                </div>
                {isClick ? (
                    <div css={clicked}>
                        <ul>
                            <li css={listStyle}>
                                <div css={ListName}>장소</div>
                                <Post></Post>
                            </li>
                            <li css={listStyle}>
                                <div css={ListName}>경비</div>
                                <Post></Post>
                            </li>
                            <li css={listStyle}>
                                <div css={ListName}>이동 수단</div>
                                <Post></Post>
                            </li>
                            <li css={listStyle}>
                                <div css={ListName}>상세 설명</div>
                                <Post></Post>
                            </li>

                            <li>
                                <ImgUpload />
                            </li>
                        </ul>
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
    width: 370px;
    padding: 10px;
`;

const clickedwrap = css`
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    width: 370px;
    padding: 10px;
`;
const clicked = css`
    margin: 5px auto;
    text-align: start;
    animation: identifier 0.5s ease-in-out;

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
`;

const ListName = css`
    border-radius: ${PALETTE.border_round};
    background-color: #eff5f5;
    color: #497174;
    padding: 7px;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    margin: 10px;
    width: fit-content;
`;

const listStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ListInput = css`
    display: flex;
    border-radius: ${PALETTE.border_radius};
    width: 23vw;
    min-height: 40px;
    min-width: 180px;
    max-width: 350px;
    font-size: 1.15rem;
    margin: 15px auto;
`;

export default PostformItems;
