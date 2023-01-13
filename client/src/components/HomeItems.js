/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import sample from "../assets/sample.jpg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";

const HomeItems = () => {
    const [isFavoriteClcik, setFavoriteClick] = useState(false);
    const handleFavoriteClick = () => {
        setFavoriteClick(!isFavoriteClcik);
    };

    return (
        <div
            css={css`
                max-width: 260px;
                max-height: 350px;
                margin: 10px;
            `}
        >
            <div>
                <img
                    src={sample}
                    css={css`
                        max-width: 260px;
                        max-height: 250px;
                        height: 210px;
                        border-radius: ${PALETTE.border_radius};
                    `}
                />
                <div
                    onClick={handleFavoriteClick}
                    css={css`
                        position: absolute;
                        top: 110px;
                        left: 237px;
                        font-size: 22px;
                    `}
                >
                    {isFavoriteClcik ? (
                        <FaHeart
                            css={css`
                                color: #ff5675;
                            `}
                        />
                    ) : (
                        <FaRegHeart
                            css={css`
                                color: white;
                            `}
                        />
                    )}
                </div>
            </div>
            <div
                css={css`
                    display: flex;
                    justify-content: space-between;
                `}
            >
                <div
                    css={css`
                        margin: 10px 0;
                        font-weight: 600;
                    `}
                >
                    발리 : 우붓 타나롯 투어
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        margin: 0 5px;
                    `}
                >
                    <BsStarFill
                        css={css`
                            margin: 0 7px;
                        `}
                    />
                    4.5
                </div>
            </div>
            <div>
                <ul
                    css={css`
                        display: flex;
                        list-style: none;
                        font-size: 14px;
                        font-weight: 700;
                        color: ${PALETTE.default_color};
                        /* text-shadow: ${PALETTE.text_shadow}; */
                    `}
                >
                    <li css={listStyle}>#강남역</li>

                    <li css={listStyle}>#11번출구</li>
                    <li css={listStyle}>#우붓</li>
                    <li css={listStyle}>#타나 롯</li>
                </ul>
            </div>
            <div
                css={css`
                    text-align: end;
                    font-weight: 600;
                `}
            >
                ₩1,000,000
            </div>
        </div>
    );
};

const listStyle = css`
    margin-right: 5px;
    margin-bottom: 10px;
    /* background-color: ${PALETTE.second_color}; */
    /* border-radius: ${PALETTE.border_round}; */
    /* text-shadow: 1px 1px 1px 1px #558abb; ; */
`;

export default HomeItems;
