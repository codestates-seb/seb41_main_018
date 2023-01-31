import React, { useState, useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common.js";
import { CgProfile } from "react-icons/cg";
import { ImAirplane, ImHeart } from "react-icons/im";
import { MdOutlineRateReview } from "react-icons/md";
import MyInfo from "../components/Mypage_components/MyInfo";
import MyPost from "../components/Mypage_components/MyPost";
import MyLike from "../components/Mypage_components/MyLike";
import MyReview from "../components/Mypage_components/MyReview";
import { userInfoState } from "../state/atom";
import { useRecoilState } from "recoil";
import { getUserInfo, userEdit } from "../util/axiosUser";

import { SampleImgSrc } from "../sampleImage.js";

const Mypage = () => {
    const GachiArr = Object.values(SampleImgSrc);

    const [isTab, setIsTab] = useState(0);
    const [editClick, setEditClick] = useState(false);
    const [inputName, setInputName] = useState("");
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isLoading, setIsLoading] = useState(true);
    const randomImg = Math.floor(Math.random() * GachiArr.length);

    const selectTabHandler = (index) => {
        setIsTab(index);
    };

    const editButtonHandler = () => {
        setEditClick(!editClick);
    };

    const inputNameHandler = (e) => {
        setInputName(e.target.value);
    };

    const editNameHandler = () => {
        userEdit(userInfo.userId, inputName).then((data) => {
            if (data) {
                getUserInfo(userInfo.userId).then((data) => {
                    setUserInfo(data.data);
                });
            }
            editButtonHandler();
        });
    };

    useEffect(() => {
        getUserInfo(userInfo.userId).then((data) => {
            setUserInfo(data.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Loding...</div>
            ) : (
                <div css={Mypage_Wrap}>
                    {console.log(userInfo)}
                    <div css={ProfileContainer}>
                        <img src={userInfo.image} alt="프로필 사진"></img>
                        <div css={NameArea}>
                            <div css={NameBox}>
                                {editClick ? (
                                    <input
                                        defaultValue={userInfo.nickname}
                                        onChange={inputNameHandler}
                                    ></input>
                                ) : (
                                    userInfo.nickname
                                )}
                            </div>
                            {/* 수정 아이콘 클릭 시 수정/취소 버튼 */}
                            <div>
                                <span
                                    className={editClick ? "none" : ""}
                                    onClick={editButtonHandler}
                                >
                                    수정
                                </span>
                                {/* 수정 기능 버튼 */}
                                <span
                                    className={editClick ? "" : "hidden"}
                                    onClick={editNameHandler}
                                >
                                    수정
                                </span>
                                <span
                                    className={editClick ? "" : "none"}
                                    onClick={editButtonHandler}
                                >
                                    취소
                                </span>
                            </div>
                        </div>
                    </div>
                    <div css={IconBox}>
                        <div
                            css={IconItem}
                            onClick={() => {
                                selectTabHandler(0);
                            }}
                        >
                            <CgProfile size="25" />
                            <div css={IconText}>개인정보</div>
                        </div>

                        <div
                            css={IconItem}
                            onClick={() => {
                                selectTabHandler(1);
                            }}
                        >
                            <ImAirplane size="25" />
                            <div css={IconText}>내 여행지</div>
                        </div>
                        <div
                            css={IconItem}
                            onClick={() => {
                                selectTabHandler(3);
                            }}
                        >
                            <MdOutlineRateReview size="25" />
                            <div css={IconText}>후기</div>
                        </div>
                        <div
                            css={IconItem}
                            onClick={() => {
                                selectTabHandler(2);
                            }}
                        >
                            <ImHeart size="25" />
                            <div css={IconText}>좋아요</div>
                        </div>
                    </div>
                    {/* 후기, 좋아요 컴포넌트 하나 사용 고려*/}
                    <div css={ContentBox}>
                        {isTab === 0 ? (
                            <MyInfo />
                        ) : isTab === 1 ? (
                            <MyPost />
                        ) : isTab === 2 ? (
                            <MyLike />
                        ) : isTab === 3 ? (
                            <MyReview />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

const Mypage_Wrap = css`
    margin: 15vh auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .none {
        display: none;
    }
    .hidden {
        visibility: hidden;
    }
`;

const ProfileContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 200px;
        height: 200px;
        border: ${PALETTE.border};
        border-radius: ${PALETTE.border_round};
    }

    span {
        padding: 5px;
        font-size: 15px;
    }
`;
const NameArea = css`
    display: flex;
    align-items: center;
    margin-top: 15px;

    position: relative;
    left: 40px;
`;

const NameBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    font-size: 25px;
    margin-right: 10px;

    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 25px;
    }
`;

const IconBox = css`
    display: flex;

    svg {
        margin: 10px auto;
        display: block;
    }
`;
const IconItem = css`
    padding: 15px;
`;
const IconText = css`
    padding: 5px;
    @media (max-width: 768px) {
        display: none;
    }
`;
const ContentBox = css`
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    width: 700px;
    height: 450px;
    overflow: auto;
`;

export default Mypage;
