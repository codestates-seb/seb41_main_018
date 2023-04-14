import React from "react";
import { useNavigate } from "react-router-dom";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//component
import Button from "../../components/Button";
import { PALETTE } from "../../../Common";

const Regionitems = (props) => {
    const navigate = useNavigate();

    // 더보기 버튼 클릭 시 지역 별 검색
    const handleClick = () => {
        navigate(`/result?region=${props.text}`);
    };

    return (
        <div css={Container}>
            <div>
                <img src={props.img} css={ImgStyle} />
            </div>
            <div css={TextWrap}>
                <div css={TextStyle}>{props.text}</div>
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

const Container = css`
    width: 100%;
    height: 100%;
`;

const ImgStyle = css`
    width: 100%;
    min-height: 320px;
    height: 40vh;
    border-radius: ${PALETTE.border_radius};
    object-fit: cover;
`;

const TextWrap = css`
    position: relative;
    bottom: 9rem;
    left: 20px;
`;

const TextStyle = css`
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
