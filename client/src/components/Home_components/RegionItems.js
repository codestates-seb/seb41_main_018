/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import Button from "../Button";
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

import { useRecoilState } from "recoil";
import { ContentsList } from "../../state/atom";

const Regionitems = (props) => {
    const [contentsList, setcontentsList] = useRecoilState(ContentsList);
    const handleClick = () => {};

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
