/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DummyImg } from "../../assets/image";

const HomeItems = (content) => {
    const [isFavoriteClcik, setFavoriteClick] = useState(false);

    const randomImg = Math.floor(Math.random() * DummyImg.length);

    const handleFavoriteClick = () => {
        setFavoriteClick(!isFavoriteClcik);
    };
    return (
        <div css={wrap}>
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
            <Link to={`/detail/${content.content && content.content.contentId}`}>
                {/* <div css={imgWrap}> */}
                <img src={DummyImg[randomImg]} css={imgWrap} />
                {/* </div> */}
                <div css={textContainer}>
                    <div css={titleStyle}>{content.content && content.content.title}</div>

                    <div css={sideTextStyle}>
                        <FaHeart
                            css={css`
                                margin: 0 7px;
                                color: #ff5675;
                            `}
                        />
                        {content.content && content.content.heartCount}
                    </div>
                </div>
                <div>
                    <ul css={ulStyle}>
                        {content.content &&
                            content.content.routes.map((el) => <li css={liStyle}># {el.place}</li>)}
                    </ul>
                </div>
                <div css={priceStyle}>
                    {content.content && `총 경비 : ${content.content.amount}`}
                </div>
            </Link>
        </div>
    );
};

const wrap = css`
    width: 100%;
    height: 100%;
`;

const imgWrap = css`
    width: 100%;
    height: 70%;
    border-radius: ${PALETTE.border_radius};
    overflow: hidden;
`;

const imgStyle = css`
    max-width: 300px;
    max-height: 400px;
    min-width: 140px;
    min-height: 250px;
`;

const favoriteStyle = css`
    position: relative;
    text-align: end;
    padding: 0 5px;
    top: 35px;
    font-size: 22px;
`;

const textContainer = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const titleStyle = css`
    font-size: 1rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const sideTextStyle = css`
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    margin: 0 5px;
`;

const ulStyle = css`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 700;
    margin-top: 3px;
    color: ${PALETTE.default_color};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 50px;
`;

const liStyle = css`
    margin-right: 10px;
    margin-bottom: 10px;
`;

const priceStyle = css`
    width: 100%;
    text-align: end;
    font-weight: 600;
    font-size: 1rem;
`;

export default HomeItems;
