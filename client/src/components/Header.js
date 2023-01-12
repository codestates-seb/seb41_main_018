/** @jsxImportSource @emotion/react */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { PALETTE } from "../Common.js";
import logo3 from "../assets/logo3.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SignButton from "./SignButton";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
    const [islogin, setislogin] = useState(false);
    const [isclick, setisclick] = useState(false);
    const [ismenuclick, setmenuclick] = useState(false);
    const [isaccountclick, setaccountclick] = useState(false);
    const [isvalue, setisvalue] = useState("");
    const [keyword, setkeyword] = useState("");
    const menuRef = useRef();
    const AccountRef = useRef();
    const location = useLocation();
    const menuClick = () => {
        setmenuclick(!ismenuclick);
    };

    const handleClick = () => {
        setisclick(!isclick);
        console.log(isclick);
    };

    const handleClose = () => {
        setisclick(false);
    };

    const handleAccountClick = () => {
        setaccountclick(!isaccountclick);
    };

    const getInputText = (e) => {
        setkeyword(e.target.value);
        console.log(keyword);
    };

    const searchIconClick = () => {
        console.log(keyword);
    };

    // 768px에서 메뉴 버튼 클릭시 좌측에 창이 열리는데, 외부클릭시 닫게 하는 코드
    const handleClickOutSide = (e) => {
        console.log(menuRef.current.contains(e.target));
        if (ismenuclick && !menuRef.current.contains(e.target)) {
            setmenuclick(false);
        }
    };
    useEffect(() => {
        if (ismenuclick) document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    });

    const handleClickOutSide2 = (e) => {
        console.log(AccountRef.current.contains(e.target));
        if (isaccountclick && !AccountRef.current.contains(e.target)) {
            setaccountclick(false);
        }
    };
    useEffect(() => {
        if (isaccountclick) document.addEventListener("mousedown", handleClickOutSide2);
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
                {ismenuclick ? (
                    <div css={menuClickBackground}>
                        <div css={menubox} ref={menuRef}>
                            <img
                                src={logo3}
                                alt="같이갈래 logo"
                                css={css`
                                    width: 220px;
                                    height: 70px;
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
                                {islogin ? (
                                    <div>
                                        <Link to="/mypage">
                                            <SignButton text="마이페이지" width="250px" />
                                        </Link>
                                        <SignButton text="로그아웃" width="250px" />
                                    </div>
                                ) : (
                                    <div>
                                        <Link to="/login">
                                            <SignButton text="로그인" width="250px" />
                                        </Link>
                                        <Link to="/signup">
                                            <SignButton text="회원가입" width="250px" />
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
                    <img src={logo3} alt="같이갈래 logo" css={logostyle}></img>
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
                <SearchIcon css={responsiveSearchIcon} onClick={handleClick} />
                {isclick ? (
                    <div>
                        <div
                            css={css`
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                width: 100vw;
                                height: 100vh;
                                background-color: rgb(255, 255, 255);
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            `}
                        >
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
                                css={css`
                                    width: 668px;
                                    height: 40px;
                                    background-color: rgb(0, 0, 0, 0.05);
                                    border: solid 2px rgb(0, 0, 0, 0.05);
                                `}
                            ></input>
                        </div>
                    </div>
                ) : (
                    false
                )}
            </div>
            {islogin ? (
                <div css={divAccount}>
                    <NotificationsActiveIcon css={notification} />
                    <AccountCircleIcon css={Account} onClick={handleAccountClick} />
                    {isaccountclick ? (
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

const menuClickBackground = css`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vw;
    background-color: rgb(0, 0, 0, 0.3);
`;
const logostyle = css`
    width: 220px;
    height: 70px;
    margin-left: 100px;

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
    border: solid 10px #055e8e;
    background-color: #055e8e;
    border-radius: 50px;
    margin-left: -45px;
    margin-top: 8px;
    color: white;
    &:hover {
        background-color: #003f62;
        border: solid 10px #003f62;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        display: none;
        margin: 0 20px 0 0;
    }
`;

const responsiveSearchIcon = css`
    display: none;
    position: relative;
    width: 34px;
    height: 34px;
    border: solid 10px #055e8e;
    background-color: #055e8e;
    border-radius: 50px;
    margin-left: -45px;
    margin-top: 10px;
    color: white;
    &:hover {
        background-color: #003f62;
        border: solid 10px #003f62;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        display: block;
        margin: 0 20px 0 0;
    }
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
    color: #055e8e;
    &:hover {
        color: #003f62;
        cursor: pointer;
    }
`;

const notification = css`
    width: 40px;
    height: 40px;
    color: #055e8e;
    margin: 0 10px;
    &:hover {
        color: #003f62;
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
