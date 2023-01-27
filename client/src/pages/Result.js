/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Categorybar from "../components/Categorybar";
import HomeItems from "../components/Home_components/HomeItems";
import { useRecoilState } from "recoil";
import { CategorySearchResultState } from "../../src/state/atom";

const Result = () => {
    const [categorySearch, setCategorySearch] = useRecoilState(CategorySearchResultState);
    return (
        <div>
            <Categorybar />
            <div>
                <div css={resultText}>검색결과</div>
                {console.log(categorySearch)}
                {categorySearch.map((content) => (
                    <div css={postStyle}>
                        {/* 백엔드에서 요소 추가 완료 후 주석 제거
						  			 현재 개수만 확인 가능 */}
                        <HomeItems /* content={content} */ />
                    </div>
                ))}
                {/* <div css={postStyle}>
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                    <HomeItems />
                </div> */}
            </div>
        </div>
    );
};
const resultText = css`
    font-size: 1.3rem;
    width: 1440px;
    margin: 20px auto -20px;
    @media (max-width: 1440px) {
        grid-template-columns: repeat(4, 1fr);
        width: 1200px;
    }
    @media (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
        width: 876px;
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        width: 630px;
    }
    @media (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
        width: 460px;
    }
`;
const postStyle = css`
    display: grid;
    margin: 20px auto;
    width: 1440px;
    grid-template-columns: repeat(5, 1fr);
    @media (max-width: 1440px) {
        grid-template-columns: repeat(4, 1fr);
        width: 1200px;
    }
    @media (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
        width: 876px;
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        width: 630px;
    }
    @media (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
        width: 460px;
    }
`;

export default Result;
