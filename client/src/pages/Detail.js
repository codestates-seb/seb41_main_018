/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import Detial_Img from "../components/Detail_Img";
import Detailform from "../components/Detailform";
import Reviewform from "../components/Reviewform";

// 후기 등록
/* const postReview = async () => {
	await fetchCreateAnswer(questionDetail.questionId, content).then((data) => {
		if (data) {
			setUpdate(true);
		}
	});
}; */

const Detail = () => {
    return (
        <div className="Detail" css={Wrap}>
            <h1
                css={css`
                    width: 80vw;
                    margin: 0 auto;
                `}
            >
                제목
            </h1>
            <div css={TotalContainer}>
                <div css={Image}>
                    <Detial_Img />
                </div>
                <Detailform />
            </div>
            <Reviewform />
        </div>
    );
};
const Wrap = css`
    width: 100%;
    height: 100%;
`;

const TotalContainer = css`
    display: flex;
    flex-direction: row;
    padding-bottom: 30px;
`;
const Image = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65%;
    height: 500px;
    padding: 20px;
`;

export default Detail;
