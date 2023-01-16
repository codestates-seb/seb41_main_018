/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import 경복궁 from "../assets/sampleImg/경복궁.png";
import SignButton from "./SignButton";

const Regionitems = () => {
    return (
        <div
            css={css`
                height: 500px;
            `}
        >
            <div>
                <img src={경복궁} css={imgStyle} />
            </div>
            <div>
                <div css={textStyle}>서울</div>
                <SignButton
                    css={buttonStyle}
                    width="100px"
                    height="40px"
                    text="더보기"
                    color="black"
                    boxShadow="1px 1px 5px rgb(0,0,0,0.2)"
                />
            </div>
        </div>
    );
};

const imgStyle = css`
    width: 275px;
    height: 380px;
    margin: 10px 0;
    border-radius: ${PALETTE.border_radius};
    @media (max-width: 1200px) {
        width: 250px;
        height: 320px;
    }
    @media (max-width: 1000px) {
        width: 250px;
        height: 320px;
    }
    @media (max-width: 768px) {
        width: 290px;
        height: 320px;
    }
    @media (max-width: 576px) {
        width: 460px;
        height: 320px;
    }
`;

const textStyle = css`
    position: relative;
    font-size: 4rem;
    font-weight: 600;
    color: rgb(255, 255, 255, 0.9);
    text-shadow: ${PALETTE.text_shadow};
    bottom: 380px;
    left: 22px;
    @media (max-width: 1200px) {
        font-size: 3rem;
        bottom: 320px;
        left: 22px;
    }
    @media (max-width: 1000px) {
        font-size: 2.5rem;
        bottom: 320px;
        left: 17px;
    }
    @media (max-width: 768px) {
        font-size: 2.5rem;
        bottom: 320px;
        left: 17px;
    }
    @media (max-width: 576px) {
        font-size: 2.5rem;
        width: 460px;
        height: 320px;
    }
`;

const buttonStyle = css`
    position: relative;
    bottom: 500px;
    left: 22px;
`;
export default Regionitems;
