/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

import DetailformItems from "./DetailformItems";
import DetailMap from "../../pages/PostPage/DetailMap";
import Button from "../Button";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";

//Button
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export const Buttons = (props) => {
    return (
        <AwesomeButton
            type="primary"
            before={props.icon}
            css={css`
                margin: 10px;
                --button-default-height: 50px;
                --button-default-font-size: 1.5rem;
                --button-default-border-radius: 10px;
                --button-horizontal-padding: 20px;
                --button-raise-level: 3px;
                --button-hover-pressure: 1.75;
                --transform-speed: 0.185s;
                --button-primary-color: #1e88e5;
                --button-primary-color-dark: #1360a4;
                --button-primary-color-light: #ffffff;
                --button-primary-color-hover: #187bd1;
                --button-primary-color-active: #166dba;
                --button-primary-border: none;
            `}
        >
            {props.text}
        </AwesomeButton>
    );
};
const Detailform = () => {
    const [currentTab, setcurrentTab] = useState(0);
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);

    const selectMenuHandler = (index) => {
        setcurrentTab(index);
    };

    const data = contentDetail.data;
    const tagDummy = ["강릉", "아르떼뮤지엄", "경포"];

    return (
        <div css={wrap}>
            <div css={container}>
                {/* 경로 아이템 불러오기 */}
                <div css={tabWrap}>
                    {data &&
                        data.routes.map((el, index) => (
                            <div
                                key={data && data.routes && data.routes[index].routeId}
                                onClick={() => selectMenuHandler(index)}
                                css={currentTab === index ? SelectTab : NoSelect}
                            >
                                {el.place}
                            </div>
                        ))}
                </div>
                <div
                    css={css`
                        margin: 0 auto;
                        /* background-color: greenyellow; */
                    `}
                >
                    <DetailformItems index={currentTab} />
                    <div
                        css={css`
                            display: flex;
                            margin-top: 20px;
                        `}
                    >
                        {tagDummy.map((el, index) => (
                            <span key={index} css={tagStyle}>
                                {`#${el}`}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <h2>Map😀</h2>
            <DetailMap />
            <div css={ButtonBox}>
                <Buttons icon={<BsFillHeartFill />} text="가치갈래" />
                <Buttons text={<FiShare />} />
            </div>
        </div>
    );
};
const wrap = css`
    position: sticky;
    top: 50px;
    right: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const container = css`
    width: 90vw;
    border-radius: ${PALETTE.border_radius};
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    margin: 10px 40px;
    padding: 20px;
    @media (min-width: 768px) {
        display: flex;
    }
`;
const ButtonBox = css`
    display: flex;
    align-self: flex-end;
    padding-right: 40px;
`;

const SelectTab = css`
    padding: 10px;
    font-size: 0.975rem;
    font-weight: 600;
    color: ${PALETTE.default_color};
    border-bottom: 0.2em solid ${PALETTE.default_color};
`;

const tabWrap = css`
    display: flex;
    @media (min-width: 768px) {
        flex-direction: column;
        width: 270px;
        margin: 0 20px;
    }
`;

const NoSelect = css`
    padding: 10px;
    font-size: 0.975rem;
    color: ${PALETTE.gray};
    border-bottom: 0.2em solid ${PALETTE.ligth_gray};
`;

const tagStyle = css`
    display: flex;
    width: fit-content;
    height: auto;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 5px 10px;
    color: #497174;
    border-radius: ${PALETTE.border_round};
    background-color: #eff5f5;
`;

export default Detailform;
