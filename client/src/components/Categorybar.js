import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import 국내여행 from "../assets/categoryImg/국내여행.png";
import 맛집투어 from "../assets/categoryImg/맛집투어.png";
import 친구여행 from "../assets/categoryImg/친구여행.png";
import 해외여행 from "../assets/categoryImg/해외여행.png";
import 혼자여행 from "../assets/categoryImg/혼자여행.png";
import 커플여행 from "../assets/categoryImg/커플여행.png";
import 가족여행 from "../assets/categoryImg/가족여행.png";
import 카페투어 from "../assets/categoryImg/카페투어.png";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../util/axiosContents";
import { useRecoilState } from "recoil";
import { CategorySearchResultState } from "../../src/state/atom";

const Categorybar = () => {
    const navigate = useNavigate();
    const [categorySearch, setCategorySearch] = useRecoilState(CategorySearchResultState);

    const category = [
        { src: 국내여행, title: "국내여행", themeType: "DOMESTIC" },
        { src: 해외여행, title: "해외여행", themeType: "ABROAD" },
        { src: 가족여행, title: "가족여행", themeType: "FAMILY" },
        { src: 커플여행, title: "커플여행", themeType: "COUPLE" },
        { src: 친구여행, title: "친구여행", themeType: "FRIENDS" },
        { src: 혼자여행, title: "혼자여행", themeType: "ALONE" },
        { src: 카페투어, title: "카페투어", themeType: "CAFE" },
        { src: 맛집투어, title: "맛집투어", themeType: "FOOD" },
    ];

    const searchHandler = (themeType) => {
        getCategory(themeType).then((data) => {
            setCategorySearch(data && data.data);
            navigate("/result");
        });
    };
    return (
        <div css={wrap}>
            <div
                css={css`
                    display: flex;
                `}
            >
                {category.slice(0, category.length / 2).map((el, index) => (
                    <div
                        key={index}
                        css={categoryContainer}
                        onClick={() => searchHandler(el.themeType)}
                    >
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
                    <div
                        key={index}
                        css={categoryContainer}
                        onClick={() => searchHandler(el.themeType)}
                    >
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
    cursor: pointer;
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
