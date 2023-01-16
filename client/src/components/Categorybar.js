/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import 국내여행 from "../assets/categoryImg/국내여행.png";
import 맛집투어 from "../assets/categoryImg/맛집투어.png";
import 친구여행 from "../assets/categoryImg/친구여행.png";
import 해외여행 from "../assets/categoryImg/해외여행.png";
import 혼자여행 from "../assets/categoryImg/혼자여행.png";
import 커플여행 from "../assets/categoryImg/커플여행.png";
import 효도여행 from "../assets/categoryImg/효도여행.png";
import 카페투어 from "../assets/categoryImg/카페투어.png";

const Categorybar = () => {
    const category = [
        { src: 국내여행, title: "국내여행" },
        { src: 해외여행, title: "해외여행" },
        { src: 효도여행, title: "효도여행" },
        { src: 커플여행, title: "커플여행" },
        { src: 친구여행, title: "친구여행" },
        { src: 혼자여행, title: "혼자여행" },
        { src: 카페투어, title: "카페투어" },
        { src: 맛집투어, title: "맛집투어" },
    ];

    return (
        <div css={wrap}>
            <div
                css={css`
                    display: flex;
                `}
            >
                {category.slice(0, category.length / 2).map((el, index) => (
                    <div key={index} css={categoryContainer}>
                        <img src={el.src} css={categoryImg} />
                        <span css={categoryFont}>{el.title}</span>
                    </div>
                ))}
            </div>
            <div
                css={css`
                    display: flex;
                `}
            >
                {category.slice(category.length / 2, category.length).map((el, index) => (
                    <div key={index} css={categoryContainer}>
                        <img src={el.src} css={categoryImg} />
                        <span css={categoryFont}>{el.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const wrap = css`
    width: 100vw;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        width: 460px;
    }
`;

const categoryContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    &:hover {
        font-weight: 900;
    }
`;

const categoryImg = css`
    width: 25px;
    height: 25px;
    margin: 20px 40px;
    //호버?;;
`;

const categoryFont = css`
    text-align: center;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
`;
export default Categorybar;
