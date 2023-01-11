/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import logo3 from "../assets/logo3.png";
import { css } from "@emotion/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SignButton from "./SignButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useRef } from "react";

const Header = () => {
    const [islogin, setislogin] = useState(true);
    const [isclick, setisclick] = useState(false);
    const [isMenuClick, setMenuclick] = useState(false);
    const [isaccountclick, setaccountclick] = useState(false);
    const menuclick = () => {
        setMenuclick(!isMenuClick);
    };
    // 768px에서 메뉴 버튼 클릭시 좌측에 창이 열리는데, 외부클릭시 닫게 하는 코드
    const ref = useRef();
    const handleClickOutSide = (e) => {
        console.log(ref.current.contains(e.target));
        if (isMenuClick && !ref.current.contains(e.target)) {
            setMenuclick(false);
        }
    };
    useEffect(() => {
        if (isMenuClick) document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    });

    const handleisclick = () => {
        setisclick(!isclick);
        console.log(isclick);
    };

    const handleclose = () => {
        setisclick(false);
    };

    const handleAccountClick = () => {
        setaccountclick(!isaccountclick);
    };

    return (
        <div
            css={css`
                display: flex;
                width: 100vw;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgb(0, 0, 0, 0.1);
                @media (max-width: 768px) {
                    justify-content: space-between;
                }
            `}
        >
            <div
                css={css`
                    display: none;
                    @media (max-width: 768px) {
                        display: block;
                    }
                `}
            >
                <MenuIcon onClick={menuclick} css={menuicon} />
                {isMenuClick ? (
                    <div
                        css={css`
                            position: absolute;
                            top: 0px;
                            left: 0px;
                            width: 100vw;
                            height: 100vw;
                            background-color: rgb(0, 0, 0, 0.3);
                        `}
                    >
                        <div css={menubox} ref={ref}>
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
                                        {" "}
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
                />
                <SearchIcon css={searchIcon} onClick={handleisclick} />
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
                                onClick={handleclose}
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
                    <AccountCircleIcon css={Account} onClick={handleAccountClick} />
                    {isaccountclick ? (
                        <div
                            css={css`
                                position: absolute;
                                margin-top: 40px;
                            `}
                        >
                            <ul
                                css={css`
                                    list-style: none;
                                    padding: 0;
                                `}
                            >
                                <Link to="/mypage">
                                    <li css={dropmenu}>마이페이지</li>
                                </Link>
                                <li css={dropmenu}>로그아웃</li>
                            </ul>
                        </div>
                    ) : (
                        false
                    )}
                </div>
            ) : (
                <div css={divAccount}>
                    <Link to="/login">
                        <SignButton text="로그인" width="100px" />
                    </Link>
                    <Link to="/signup">
                        <SignButton text="회원가입" width="100px" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;

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
        border-radius: 50px;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
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
    width: 20px;
    height: 20px;
    border: solid 10px #055e8e;
    background-color: #055e8e;
    border-radius: 50px;
    margin-left: -49px;
    margin-top: 8px;
    color: white;
    &:hover {
        background-color: #003f62;
        border: solid 10px #003f62;
        cursor: pointer;
    }
    @media (max-width: 768px) {
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
    width: 50px;
    height: 50px;
    color: #055e8e;
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

const dropmenu = css`
    width: 150px;
    height: 40px;
    border: solid black 1px;
    /* background-color: white; */
    display: flex;
    margin-top: -1px; //이래도 되는지?
    justify-content: center;
    align-items: center;
`;
