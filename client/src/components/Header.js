/** @jsxImportSource @emotion/react */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { PALETTE } from "../Common.js";
import { GachiGalleImgSrc } from "../sampleImage.js";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button.js";
import { useRecoilState } from "recoil";
import {
    loginState,
    userInfoState,
    ContentsList,
    KeywordFilterResultState,
    SearchKeywordState,
} from "../state/atom";
import { userLogout } from "../util/axiosUser";

const Header = () => {
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [contentsList, setcontentsList] = useRecoilState(ContentsList);
    const [filterResult, setFilterResult] = useRecoilState(KeywordFilterResultState);
    const [isResSearchIconClick, setResSearchIcon] = useState(false);
    const [isMenuClick, setMenuClick] = useState(false);
    const [isAccountClick, setAccontClick] = useState(false);
    const [keyword, setKeyword] = useRecoilState(SearchKeywordState);
    const menuRef = useRef();
    const AccountRef = useRef();
    const navigate = useNavigate();

    const menuClick = () => {
        setMenuClick(!isMenuClick);
    };

    const handleResSearchIconClick = () => {
        setResSearchIcon(!isResSearchIconClick);
    };

    // 검색 버튼 클릭 시 작동 함수
    const keywordSearch = () => {
        setFilterResult(contentsList.filter((content) => content.title.includes(keyword)));
        navigate("/result");
    };

    const handleClose = () => {
        setResSearchIcon(false);
    };

    const handleAccountClick = () => {
        setAccontClick(!isAccountClick);
    };

    // 외부클릭시 닫히게하기
    const handleClickOutSide = (e) => {
        if (isMenuClick && !menuRef.current.contains(e.target)) {
            setMenuClick(false);
        }
    };
    useEffect(() => {
        if (isMenuClick) document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    });

    const handleClickOutSide2 = (e) => {
        if (isAccountClick && !AccountRef.current.contains(e.target)) {
            setAccontClick(false);
        }
    };
    useEffect(() => {
        if (isAccountClick) document.addEventListener("mousedown", handleClickOutSide2);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide2);
        };
    });

    // 로그아웃
    const logout = () => {
        userLogout().then(() => {
            setIsLogin(false);
            setUserInfo({});
            navigate("/");
            setMenuClick(false);
        });
    };

    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/signup") return null;

    return (
        <div css={wrap}>
            <div css={container}>
                <MenuIcon onClick={menuClick} css={menuicon} />
                {isMenuClick ? (
                    <div css={menuClickContainer}>
                        <div css={menuContainer} ref={menuRef}>
                            <img src={GachiGalleImgSrc.logo_img} alt="같이갈래 logo" />
                            <div css={buttonContainer}>
                                {isLogin ? (
                                    <div>
                                        <Link to="/mypage">
                                            <Button
                                                bgColor="white"
                                                width="250px"
                                                height="60px"
                                                text="마이페이지"
                                                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                                margin="10px"
                                                onClick={() => {
                                                    setMenuClick(false);
                                                }}
                                            />
                                        </Link>
                                        <Button
                                            bgColor="white"
                                            width="250px"
                                            height="60px"
                                            text="로그아웃"
                                            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                            margin="10px"
                                            onClick={logout}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <Link to="/login">
                                            <Button
                                                bgColor="white"
                                                width="250px"
                                                height="60px"
                                                text="로그인"
                                                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                                margin="10px"
                                            />
                                        </Link>
                                        <Link to="/signup">
                                            <Button
                                                bgColor="white"
                                                width="250px"
                                                height="60px"
                                                text="회원가입"
                                                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                                margin="10px"
                                            />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    false
                )}
            </div>
            <div
                css={css`
                    display: flex;
                    justify-content: space-between;
                    width: 1200px;
                    align-items: center;
                `}
            >
                <div
                    css={css`
                        @media (max-width: 768px) {
                            margin: 0 auto;
                            padding-right: 30px;
                        }
                    `}
                >
                    <Link to="/">
                        <img
                            src={GachiGalleImgSrc.logo_img}
                            alt="같이갈래 logo"
                            css={logoStyle}
                        ></img>
                    </Link>
                </div>
                {/* 데스크탑 기준 검색창 */}
                <div
                    css={css`
                        display: flex;
                    `}
                >
                    <input
                        type="text"
                        css={SearchInput}
                        placeholder="검색어를 입력해주세요."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key == "Enter") {
                                keywordSearch();
                            }
                        }}
                    ></input>
                    <SearchIcon css={searchIcon} onClick={keywordSearch} />

                    {/* 모바일 기준 검색창 - 검색버튼 */}
                    <SearchIcon css={resSearchIcon} onClick={handleResSearchIconClick} />
                    {isResSearchIconClick ? (
                        <div>
                            <div css={resSearchIconClick}>
                                <CloseIcon
                                    onClick={handleClose}
                                    css={css`
                                        position: relative;
                                        top: 7px;
                                        width: 25px;
                                        height: 25px;
                                        margin: 20px;
                                        align-self: end;
                                    `}
                                />
                                {/* 모바일 기준 검색창 - 검색 input */}
                                <input
                                    type="text"
                                    css={responsiveSearchInput}
                                    placeholder="검색어를 입력해주세요."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyUp={(e) => {
                                        if (e.key == "Enter") {
                                            keywordSearch();
                                            setResSearchIcon(false);
                                        }
                                    }}
                                ></input>
                                <div css={recentKeyword}>최근 검색어</div>
                            </div>
                        </div>
                    ) : (
                        false
                    )}
                </div>
                {isLogin ? (
                    <div css={divAccount}>
                        <NotificationsActiveIcon css={notification} />
                        <AccountCircleIcon css={Account} onClick={handleAccountClick} />
                        {isAccountClick ? (
                            <div css={dropMenu} ref={AccountRef}>
                                <ul
                                    css={css`
                                        list-style: none;
                                        padding: 0;
                                    `}
                                >
                                    <Link
                                        to="/mypage"
                                        css={css`
                                            text-decoration-line: none;
                                            color: black;
                                        `}
                                    >
                                        <li css={topDropMenu}>마이페이지</li>
                                    </Link>
                                    <li css={bottomDropMenu} onClick={logout}>
                                        로그아웃
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div css={divAccount}>
                        <Link to="/login">
                            <Button
                                width="100px"
                                bgColor="white"
                                height="50px"
                                text="로그인"
                                boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                                margin="10px"
                            />
                        </Link>
                        <Link to="/signup">
                            <Button
                                width="100px"
                                bgColor="white"
                                height="50px"
                                text="회원가입"
                                boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                                margin="10px"
                            />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const wrap = css`
    display: flex;
    width: 100vw;
    height: 60px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(0, 0, 0, 0.1);
    @media (max-width: 768px) {
        justify-content: space-between;
    }
`;

const container = css`
    display: none;
    @media (max-width: 768px) {
        display: block;
        z-index: 2;
    }
`;

const menuClickContainer = css`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 2554px;
    background-color: rgb(0, 0, 0, 0.3);
`;
const menuContainer = css`
    position: absolute;
    text-align: center;
    top: 0px;
    left: 0px;
    width: 300px;
    height: 100%;
    margin: 0 auto;
    background-color: white;
    img {
        width: 140px;
        height: 80px;
        margin: 20px;
    }
`;
const buttonContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const logoStyle = css`
    width: 140px;
    height: 80px;
    margin: 0 auto;
    @media (min-width: 768px) {
        margin-left: 40px;
    }
`;

const searchIcon = css`
    position: relative;
    width: 34px;
    height: 34px;
    border: solid 10px ${PALETTE.default_color};
    background-color: ${PALETTE.default_color};
    border-radius: 50px;
    margin-left: -45px;
    margin-top: 8px;
    color: white;
    &:hover {
        background-color: ${PALETTE.default_hover};
        border: solid 10px ${PALETTE.default_hover};
        cursor: pointer;
    }
    @media (max-width: 768px) {
        display: none;
        margin: 0 20px 0 0;
    }
`;

const resSearchIcon = css`
    width: 34px;
    height: 34px;
    border: solid 10px ${PALETTE.default_color};
    background-color: ${PALETTE.default_color};
    border-radius: 50px;
    margin-left: -45px;
    margin-top: 10px;
    color: white;
    &:hover {
        background-color: ${PALETTE.default_hover};
        border: solid 10px ${PALETTE.default_hover};
        cursor: pointer;
    }
    @media (min-width: 768px) {
        display: none;
        margin: 0 20px 0 0;
    }
`;

const resSearchIconClick = css`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SearchInput = css`
    @media (max-width: 768px) {
        display: none;
    }
    @media (min-width: 768px) {
        dispaly: inline;
        width: 25vw;
        min-width: 260px;
        height: 50px;
        padding: 10px 20px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color: rgb(0, 0, 0, 0.02);
        border: solid 2px rgb(0, 0, 0, 0.05);
        border-radius: ${PALETTE.border_round};
        &:focus {
            background-color: white;
            box-shadow: ${PALETTE.box_shaodw};
        }
    }
`;

const responsiveSearchInput = css`
    width: 80vw;
    height: 50px;
    padding: 10px 20px;
    margin-top: -50px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: rgb(0, 0, 0, 0.02);
    border: solid 2px rgb(0, 0, 0, 0.05);
`;

const recentKeyword = css`
    display: flex;
    align-self: start;
    margin-top: 30px;
    margin-left: 30px;
    font-weight: 600;
`;
const divAccount = css`
    display: flex;
    justify-content: center;
    width: 220px;
    @media (max-width: 768px) {
        display: none;
    }
    @media (max-width: 1080px) {
        margin-left: 50px;
    }
`;

const Account = css`
    width: 40px;
    height: 40px;
    margin: 0 10px;
    color: ${PALETTE.default_color};
    &:hover {
        color: ${PALETTE.default_hover};
        cursor: pointer;
    }
`;

const notification = css`
    width: 40px;
    height: 40px;
    color: ${PALETTE.default_color};
    margin: 0 10px;
    &:hover {
        color: ${PALETTE.default_hover};
        cursor: pointer;
    }
`;

const menuicon = css`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        margin-left: 20px;
    }
    &:hover {
        cursor: pointer;
    }
`;

const dropMenu = css`
    position: absolute;
    top: 70px;
    margin-left: 60px;
    background-color: white;
    border-radius: 10px;
    box-shadow: ${PALETTE.box_shaodw};
    border-radius: ${PALETTE.border_radius};
    z-index: 4;
    li {
        width: 150px;
        height: 40px;
        display: flex;
        margin-top: -1px; //이래도 되는지?
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
            background-color: ${PALETTE.ligth_gray};
        }
    }
`;

const topDropMenu = css`
    border: solid ${PALETTE.ligth_gray} 1px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const bottomDropMenu = css`
    border: solid ${PALETTE.ligth_gray} 1px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const buttonss = css`
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
        4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;

    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    line-height: 42px;
    padding: 0;
    border: none;

    &:hover {
        background-color: #89d8d3;
        background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
    }
    span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
    }
    &:before,
    &:after {
        position: absolute;
        content: "";
        right: 0;
        top: 0;
        box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
            inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
            inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
        transition: all 0.3s ease;
    }
    &:before {
        height: 0%;
        width: 0.1px;
    }
    &:after {
        width: 0%;
        height: 0.1px;
    }
    &:hover:before {
        height: 100%;
    }
    &:hover:after {
        width: 100%;
    }
    span:before,
    span:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
            inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
            inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
        transition: all 0.3s ease;
    }
    span:before {
        width: 0.1px;
        height: 0%;
    }
    span:after {
        width: 0%;
        height: 0.1px;
    }
    span:hover:before {
        height: 100%;
    }
    span:hover:after {
        width: 100%;
    }
`;
export default Header;
