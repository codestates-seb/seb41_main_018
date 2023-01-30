/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

import DetailformItems from "./DetailformItems";
import DetailMap from "./DetailMap";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail, userInfoState, AddedLikeState } from "../../state/atom";

//Button
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { postHeart } from "../../util/axiosContents";
import { getUserInfo } from "../../util/axiosUser";
import { useEffect } from "react";

export const Buttons = (props) => {
    return (
        <AwesomeButton
            type="primary"
            before={props.icon}
            onPress={props.onPress}
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
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [adddedLike, setAddedLike] = useRecoilState(AddedLikeState);
    const [clickedLike, setClickedLike] = useState([]);
    const data = contentDetail.data;

    const selectMenuHandler = (index) => {
        setcurrentTab(index);
    };

    // "ADD" 인 좋아요만 filter
    const likeFilter = () => {
        const likeArr = userInfo && userInfo.hearts.filter((el) => el.heartType === "ADD");
        setAddedLike(likeArr);
    };
    const likeMap = () => {
        const likeClickState = adddedLike.map((el) => el.contentId === data.contentId);
        setClickedLike(likeClickState);
    };

    // 좋아요 post요청 함수
    const HeartHandler = () => {
        postHeart(userInfo.userId, data.contentId).then(() => {
            getUserInfo(userInfo.userId).then((data) => {
                setUserInfo(data.data);
                likeFilter();

                console.log(adddedLike);
            });
        });
    };

    useEffect(() => {
        likeMap();
    }, [adddedLike]);

    return (
        <div css={wrap}>
            <div css={container}>
                {/* 경로 아이템 불러오기 */}
                <div
                    css={css`
                        margin: 0 auto;
                    `}
                >
                    <div css={UserProfile}>
                        <img
                            src={data && data.image}
                            alt={`${data && data.nickName}의 프로필 이미지`}
                            css={imgStyle}
                        />
                        <h3>{`${data && data.nickName}님의 추천 경로`}</h3>
                    </div>
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
                        {data &&
                            data.tag &&
                            data.tag.split(",").map((el, index) => (
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
                <Buttons
                    icon={clickedLike.includes(true) ? <FaHeart /> : <FaRegHeart />}
                    text="가치갈래"
                    onPress={HeartHandler}
                />
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
    /* margin-top: -20px; */

    h2 {
        margin: 30px 0 10px 47px;
        @media (min-width: 768px) {
            margin: 30px 0 -30px 47px;
        }
    }
`;

const container = css`
    width: 90vw;
    border-radius: ${PALETTE.border_radius};
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    margin: 10px 40px;
    padding: 20px;
    @media (min-width: 768px) {
        min-width: 768px;
        display: flex;
    }

    h3 {
        margin-top: 10px;
        /* background-color: red; */
        @media (min-width: 768px) {
            margin: 0 auto;
            padding: 10px 0;
            border-bottom: 0.175rem solid rgb(0, 0, 0, 0.2);
        }
    }
`;

const UserProfile = css`
    display: flex;
    @media (min-width: 768px) {
        min-width: 270px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const imgStyle = css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 10px;
    @media (min-width: 768px) {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 20px auto;
    }
`;
const ButtonBox = css`
    display: flex;
    align-self: flex-end;
    padding-right: 40px;
`;

const tabWrap = css`
    display: flex;
    margin: 30px 0 -15px 10px;

    @media (min-width: 768px) {
        flex-direction: column;
        width: 270px;
        margin: 20px auto;
    }
`;

const SelectTab = css`
    cursor: pointer;
    text-align: center;
    border-bottom: 0.285rem solid ${PALETTE.default_color};
    @media (max-width: 768px) {
        padding: 10px;
        font-size: 0.975rem;
        font-weight: 600;
        color: ${PALETTE.default_color};
    }
    @media (min-width: 768px) {
        font-size: 1.375rem;
        font-weight: 600;
        padding: 15px;
        margin: 10px 0;
        margin-right: 10px;
        display: inline;
        cursor: pointer;
        position: relative;
        color: ${PALETTE.default_color};
    }
`;

const NoSelect = css`
    cursor: pointer;
    text-align: center;
    border-bottom: 0.285rem solid white;
    @media (max-width: 768px) {
        padding: 10px;
        font-size: 0.975rem;
        position: relative;
        &:before {
            width: 0%;
            transition: width 0.3s;
            transform: translateX(-50%);
            position: absolute;
            bottom: 0px;
            left: 50%;
            height: 0.175rem;
            background: ${PALETTE.default_color};
            content: "";
            display: block;
        }
        &:hover::before {
            width: 100%;
            transition: width 0.3s;
        }
    }
    @media (min-width: 768px) {
        font-size: 1.375rem;
        padding: 15px;
        margin: 10px 0;
        margin-right: 10px;
        display: inline;
        cursor: pointer;
        position: relative;

        &:before {
            width: 0%;
            transition: width 0.3s;
            transform: translateX(-50%);
            position: absolute;
            bottom: -5px;
            left: 50%;
            height: 0.275rem;
            background: ${PALETTE.default_color};
            content: "";
            display: block;
        }
        &:hover::before {
            width: 100%;
            transition: width 0.3s;
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
