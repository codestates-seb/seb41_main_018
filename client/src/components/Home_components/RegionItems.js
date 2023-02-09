import React from "react";
/** @jsxImportSource @emotion/react */
import Button from "../Button";
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import { useNavigate } from "react-router-dom";

const Regionitems = (props) => {
    const navigate = useNavigate();

    // 더보기 버튼 클릭 시 지역 별 검색
    const handleClick = () => {
        navigate(`/result?region=${props.text}`);
    };

    return (
        <div
            css={css`
                margin-bottom: -120px;
            `}
        >
            <div>
                <img src={props.img} css={imgStyle} />
            </div>
            <div css={textWrap}>
                <div css={textStyle}>{props.text}</div>
                <Button
                    bgColor="white"
                    width="100px"
                    height="40px"
                    text="더보기"
                    color="black"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

const imgStyle = css`
    width: 100%;
    min-height: 320px;
    height: 40vh;
    border-radius: ${PALETTE.border_radius};
    object-fit: cover;
`;

const textWrap = css`
    position: relative;
    bottom: 9rem;
    left: 20px;
`;

const textStyle = css`
    position: relative;
    font-size: 2.7rem;
    font-weight: 600;
    color: rgb(255, 255, 255, 0.9);
    text-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
    bottom: 11rem;
    left: 0;
`;

export default Regionitems;
