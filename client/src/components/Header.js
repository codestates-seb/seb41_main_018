/** @jsxImportSource @emotion/react */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { PALETTE } from "../Common.js";
import logo9 from "../assets/logo9.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SignButton from "./SignButton";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
    const [isLogin, setislogin] = useState(false);
    const [isResSearchIconClick, setResSearchIcon] = useState(false);
    const [isMenuClick, setMenuClick] = useState(false);
    const [isAccountClick, setAccontClick] = useState(false);
    const [keyword, setKeyword] = useState("");
    const menuRef = useRef();
    const AccountRef = useRef();
    const location = useLocation();

    const menuClick = () => {
        setMenuClick(!isMenuClick);
    };

    const handleResSearchIconClick = () => {
        setResSearchIcon(!isResSearchIconClick);
    };

    const handleClose = () => {
        setResSearchIcon(false);
    };

    const handleAccountClick = () => {
        setAccontClick(!isAccountClick);
    };

    const getInputText = (e) => {
        setKeyword(e.target.value);
        console.log(keyword);
    };

    const searchIconClick = () => {
        console.log(keyword);
    };

    // 외부클릭시 닫히게하기
    const handleClickOutSide = (e) => {
        console.log(menuRef.current.contains(e.target));
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
        console.log(AccountRef.current.contains(e.target));
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

    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/signup") return null;

    return (
        <div css={wrap}>
            <div css={container}>
                <MenuIcon onClick={menuClick} css={menuicon} />
                {isMenuClick ? (
                    <div css={menuClickContainer}>
                        <div css={menubox} ref={menuRef}>
                            <img
                                src={logo9}
                                alt="같이갈래 logo"
                                css={css`
                                    width: 140px;
                                    height: 80px;
                                    margin: 20px;
                                `}
                            ></img>
                            <div
                                css={css`
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                `}
                            >
                                {isLogin ? (
                                    <div>
                                        <Link to="/mypage">
                                            <SignButton
                                                text="마이페이지"
                                                width="250px"
                                                height="60px"
                                            />
                                        </Link>
                                        <SignButton text="로그아웃" width="250px" height="60px" />
                                    </div>
                                ) : (
                                    <div>
                                        <Link to="/login">
                                            <SignButton text="로그인" width="250px" height="60px" />
                                        </Link>
                                        <Link to="/signup">
                                            <SignButton
                                                text="회원가입"
                                                width="250px"
                                                height="60px"
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
            <div>
                <Link to="/">
                    <img src={logo9} alt="같이갈래 logo" css={logoStyle}></img>
                </Link>
            </div>
            <div
                css={css`
                    display: flex;
                `}
            >
                <TextField
                    id="outlined-basic"
                    autoComplete="string"
                    variant="outlined"
                    fullWidth
                    label="후기를 검색해보세요"
                    css={search}
                    onChange={getInputText}
                />
                <SearchIcon css={searchIcon} onClick={searchIconClick} />
                <SearchIcon css={resSearchIcon} onClick={handleResSearchIconClick} />
                {isResSearchIconClick ? (
                    <div>
                        <div css={resSearchIconClick}>
                            <CloseIcon
                                onClick={handleClose}
                                css={css`
                                    width: 30px;
                                    height: 30px;
                                    margin: 20px;
                                    align-self: start;
                                `}
                            />
                            <input
                                type="text"
                                css={responsiveSearchInput}
                                placeholder="후기를 검색해보세요."
                                onChange={getInputText}
                            ></input>
                            <div css={recentKeword}>최근 검색어</div>
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
                                <li css={bottomDropMenu}>로그아웃</li>
                            </ul>
                        </div>
                    ) : (
                        false
                    )}
                </div>
            ) : (
                <div css={divAccount}>
                    <Link to="/login">
                        <SignButton text="로그인" width="100px" height="50px" />
                    </Link>
                    <Link to="/signup">
                        <SignButton text="회원가입" width="100px" height="50px" />
                    </Link>
                </div>
            )}
        </div>
    );
};

const wrap = css`
    display: flex;
    width: 100vw;
    height: 70px;
    justify-content: space-between;
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
    }
`;

const menuClickContainer = css`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vw;
    background-color: rgb(0, 0, 0, 0.3);
`;
const logoStyle = css`
    width: 140px;
    height: 80px;
    margin-left: 100px;
    margin-top: 10px;

    @media (max-width: 768px) {
        margin: 0;
    }
`;

const search = css`
    display: flex;
    width: 400px;

    .MuiInputBase-root {
        height: 50px;
        border-radius: 50px;
        box-shadow: 1px 1px 10px 2px rgba(60, 60, 60, 0.2);
    }
    @media (max-width: 1080px) {
        width: 300px;
    }
    @media (max-width: 768px) {
        display: none;
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
    display: none;
    position: relative;
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
    @media (max-width: 768px) {
        display: block;
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

const responsiveSearchInput = css`
    width: 95%;
    height: 50px;
    background-color: rgb(0, 0, 0, 0.05);
    border: solid 2px rgb(0, 0, 0, 0.05);
    border-radius: ${PALETTE.border_radius};
    &:focus {
        background-color: white;
        box-shadow: ${PALETTE.box_shaodw};
    }
`;

const recentKeword = css`
    display: flex;
    align-self: start;
    margin-top: 30px;
    margin-left: 10px;
    font-weight: 600;
`;
const divAccount = css`
    display: flex;
    justify-content: center;
    width: 220px;
    margin-right: 100px;
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

const menubox = css`
    position: absolute;
    text-align: center;
    top: 0px;
    left: 0px;
    width: 300px;
    height: 100vh;
    margin: 0 auto;
    background-color: white;
`;

const dropMenu = css`
    position: absolute;
    margin-top: 50px;
    right: 100px;
    background-color: white;
    border-radius: 10px;
    box-shadow: ${PALETTE.box_shaodw};
    border-radius: ${PALETTE.border_radius};
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

export default Header;
