/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

import DetailformItems from "./DetailformItems";
import DetailMap from "./DetailMap";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";

//Button
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

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
    const data = contentDetail.data;
    const TravelDate = data && data.travelDate;
    const Amount = data && data.amount;
    const tagDummy = ["강릉", "아르떼뮤지엄", "경포"];

    const setCategroy = (data) => {
        if (data && data.themeType === "DOMESTIC") {
            return "국내여행";
        } else if (data && data.themeType === "ABROAD") {
            return "해외여행";
        } else if (data && data.themeType === "FAMILY") {
            return "가족여행";
        } else if (data && data.themeType === "COUPLE") {
            return "커플여행";
        } else if (data && data.themeType === "FRIENDS") {
            return "친구여행";
        } else if (data && data.themeType === "ALONE") {
            return "혼자여행";
        } else if (data && data.themeTypee === "CAFE") {
            return "카페투어";
        } else if (data && data.themeType === "FOOD") {
            return "맛집투어";
        }
    };

    const selectMenuHandler = (index) => {
        setcurrentTab(index);
    };

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
            <h2>✈️ 지도로 경로 확인하기</h2>
            <DetailMap />
            <div css={ButtonBox}>
                <Buttons icon={<BsFillHeartFill />} text="가치갈래" />
                <Buttons text={<FiShare />} />
            </div>
        </div>
    );
};
const wrap = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    h2 {
        margin: 50px 0 -30px 40px;
    }
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

const tabWrap = css`
    display: flex;
    margin-left: 15px;
    @media (min-width: 768px) {
        flex-direction: column;
        width: 270px;
        margin: 20px auto;
    }
`;

const SelectTab = css`
    cursor: pointer;
    text-align: center;
    @media (max-width: 768px) {
        padding: 10px;
        font-size: 0.975rem;
        font-weight: 600;
        color: ${PALETTE.default_color};
        border-bottom: 0.2em solid ${PALETTE.default_color};
    }
    @media (min-width: 768px) {
        font-size: 1.375rem;
        padding: 15px;
        margin: 10px 0;
        border-radius: 50px;
        box-shadow: inset 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
        &:hover {
            transform: translateY(-5px);
            transition-duration: 100ms;
            transition-duration: 250ms;
        }
    }
`;

const NoSelect = css`
    cursor: pointer;
    text-align: center;
    @media (max-width: 768px) {
        padding: 10px;
        font-size: 0.975rem;
        border-bottom: 0.2em solid ${PALETTE.ligth_gray};
    }
    @media (min-width: 768px) {
        font-size: 1.375rem;
        padding: 15px;
        margin: 10px 0;
        border-radius: 50px;

        box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
        &:hover {
            transform: translateY(-5px);
            transition-duration: 100ms;
            transition-duration: 250ms;
        }
    }
`;

const tagStyle = css`
    display: flex;
    width: fit-content;
    height: auto;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 5px 10px;
    margin: 0 5px;
    color: #497174;
    border-radius: ${PALETTE.border_round};
    background-color: #eff5f5;
    @media (min-width: 768px) {
        font-size: 1.175rem;
    }
`;

const ContentsBody = css`
    display: flex;
    align-self: flex-start;
    margin: 0 27px;
    margin-top: -5px;
    @media (max-width: 768px) {
        display: none;
    }
`;

const ComContent = css`
    font-size: 0.9rem;
    span {
        margin: 0 5px;
        color: #555c61;
        @media (min-width: 768px) {
            font-size: 1.175rem;
        }
    }
`;

export default Detailform;
