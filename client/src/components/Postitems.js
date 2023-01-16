/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import sample from "../assets/sampleImg/sample.jpg";

const Postitems = () => {
    const [isFavoriteClcik, setFavoriteClick] = useState(false);
    const handleFavoriteClick = () => {
        setFavoriteClick(!isFavoriteClcik);
    };
    return (
        <div css={wrap}>
            <div
                css={css`
                    height: 190px;
                `}
            >
                <img src={sample} css={imgStyle} />
                <div onClick={handleFavoriteClick} css={favoriteStyle}>
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
            <div css={textContainer}>
                <div css={titleStyle}>발리 : 우붓 타나롯 투어</div>
                <div css={sideTextStyle}>
                    <BsStarFill
                        css={css`
                            margin: 0 7px;
                        `}
                    />
                    4.5
                </div>
            </div>
            <div>
                <ul css={ulStyle}>
                    <li css={liStyle}>#강남역</li>
                    <li css={liStyle}>#11번출구</li>
                    <li css={liStyle}>#우붓</li>
                    <li css={liStyle}>#타나 롯</li>
                </ul>
            </div>
            <div css={priceStyle}>₩1,000,000</div>
        </div>
    );
};

const wrap = css`
    width: 250px;
    height: 270px;
    margin: 10px 0;
    @media (max-width: 576px) {
        height: 400px;
    }
`;

const imgStyle = css`
    width: 275px;
    height: 180px;
    margin: 10px 0;
    border-radius: ${PALETTE.border_radius};
    @media (max-width: 1200px) {
        width: 250px;
        height: 180px;
    }
    @media (max-width: 1000px) {
        width: 250px;
        height: 180px;
    }
    @media (max-width: 768px) {
        width: 290px;
        height: 200px;
    }
    @media (max-width: 576px) {
        width: 460px;
        height: 280px;
    }
`;

const favoriteStyle = css`
    position: relative;
    bottom: 190px;
    left: 250px;
    font-size: 22px;
    @media (max-width: 1200px) {
        bottom: 190px;
        left: 225px;
    }
    @media (max-width: 768px) {
        bottom: 210px;
        left: 265px;
    }
    @media (max-width: 576px) {
        bottom: 285px;
        left: 430px;
    }
`;

const textContainer = css`
    display: flex;
    justify-content: space-between;
    @media (max-width: 1200px) {
        width: 230px;
    }
    @media (max-width: 1000px) {
        width: 230px;
    }
    @media (max-width: 768px) {
        width: 290px;
        margin-top: 20px;
    }
    @media (max-width: 576px) {
        width: 460px;
        margin-top: 100px;
    }
`;

const titleStyle = css`
    margin: 10px 0;
    font-size: 1.1rem;
    font-weight: 600;
`;

const sideTextStyle = css`
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin: 0 5px;
`;

const ulStyle = css`
    display: flex;
    list-style: none;
    font-size: 0.9rem;
    font-weight: 700;
    color: ${PALETTE.default_color};
`;

const liStyle = css`
    margin-right: 5px;
    margin-bottom: 10px;
`;

const priceStyle = css`
    text-align: end;
    font-weight: 600;
    font-size: 1rem;
    @media (max-width: 1200px) {
        width: 230px;
    }
    @media (max-width: 1000px) {
        width: 230px;
    }
    @media (max-width: 768px) {
        width: 290px;
    }
    @media (max-width: 576px) {
        width: 460px;
    }
`;

export default Postitems;
