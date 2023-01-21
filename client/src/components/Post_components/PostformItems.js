/** @jsxImportSource @emotion/react */
import React from "react";
import { useState, useRef } from "react";
import { PALETTE } from "../../Common";
import { css } from "@emotion/react";
import { Turn as Hamburger } from "hamburger-react";
import ImgUpload from "./ImgUpload";

const PostformItems = (props) => {
    const [isClick, setClick] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isInput, setInput] = useState(true);
    const [isValue, setValue] = useState("");
    const inputRef = useRef();

    const handleClick = () => {
        setClick(!isClick);
    };

    const handleInputValue = () => {
        setInput(!isInput);
    };

    // const enterkey = () => {
    //     if (window.event.keyCode == 13) return handleInputValue();
    // };

    return (
        <>
            <div onClick={handleClick} css={wrap}>
                <div
                    css={css`
                        display: flex;
                        justify-content: space-between;
                    `}
                >
                    {isInput ? (
                        <input
                            css={css`
                                min-height: 35px;
                                width: 26vw;
                                min-width: 180px;
                                font-size: 1.4rem;
                                font-weight: 600;
                            `}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            // onKeyUp={enterkey}
                            value={isValue}
                        ></input>
                    ) : (
                        <div
                            css={css`
                                font-size: 1.4rem;
                                font-weight: 600;
                                text-align: center;
                                width: 26vw;
                                min-width: 180px;
                                max-width: 400px;
                                margin: 0px auto;
                                padding: 5px;
                            `}
                        >
                            {isValue}
                        </div>
                    )}
                    <Hamburger
                        toggled={isOpen}
                        toggle={setOpen}
                        size={25}
                        onToggle={handleInputValue}
                    />
                </div>
                {isOpen ? (
                    <div css={clicked}>
                        <ul>
                            <li>
                                <div css={ListName}>경비</div>
                                <input css={ListInput}></input>
                            </li>
                            <li>
                                <div css={ListName}>이동 수단</div>
                                <input css={ListInput}></input>
                            </li>
                            <li>
                                <div css={ListName}>상세 설명</div>
                                <input css={ListInput}></input>
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
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    border: 3px solid ${PALETTE.default_color};
    border-radius: ${PALETTE.border_radius};
    width: 27vw;
    min-height: 47px;
    min-width: 250px;
    max-width: 400px;
    margin: 10px auto;
    padding: 5px;
`;

const clicked = css`
    margin: 5px auto;
    text-align: start;
    border-radius: ${PALETTE.border_radius};
    font-size: 1.2rem;
    font-weight: 500;
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
    margin: 10px auto;
    min-width: 180px;
    max-width: 350px;
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
export default PostformItems;
