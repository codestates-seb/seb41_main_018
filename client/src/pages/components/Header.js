import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common.js";

import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, userInfoState } from "../../state/atom";
import { userLogout } from "../../util/axiosUser";
import { useNavigate, Link } from "react-router-dom";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import Button from "./Button.js";

import { GachiGalleImgSrc } from "../../sampleImage.js";

const Header = () => {
    const navigate = useNavigate();
    const setUserInfo = useSetRecoilState(userInfoState);
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const [isClickSearchIcon, setIsClickSearchIcon] = useState(false);
    const [isClickMenu, setClickMenu] = useState(false);
    const [isClickAccount, setIsClickAccount] = useState(false);
    const [keyword, setKeyword] = useState("");
    const menuRef = useRef();
    const AccountRef = useRef();

    const clickMenu = () => {
        setClickMenu(!isClickMenu);
    };

    const clickSearchIcon = () => {
        setIsClickSearchIcon(!isClickSearchIcon);
    };

    const clickAccount = () => {
        setIsClickAccount(!isClickAccount);
    };

    // 검색 버튼 클릭 시 작동 함수
    const keywordSearch = () => {
        if (keyword.trim()) {
            navigate(`/result?search=${keyword}`);
            setKeyword("");
        }
    };

    // 외부클릭시 닫히게하기
    const clickMenuOutside = (e) => {
        if (isClickMenu && !menuRef.current.contains(e.target)) {
            setClickMenu(false);
        }
    };
    useEffect(() => {
        if (isClickMenu) document.addEventListener("mousedown", clickMenuOutside);
        return () => {
            document.removeEventListener("mousedown", clickMenuOutside);
        };
    });

    const clickAccountOutSide = (e) => {
        if (isClickAccount && !AccountRef.current.contains(e.target)) {
            setIsClickAccount(false);
        }
    };
    useEffect(() => {
        if (isClickAccount) document.addEventListener("mousedown", clickAccountOutSide);
        return () => {
            document.removeEventListener("mousedown", clickAccountOutSide);
        };
    });

    // 로그아웃
    const logout = () => {
        userLogout().then(() => {
            setIsLogin(false);
            setUserInfo({});
            navigate("/");
            setClickMenu(false);
        });
    };

    if (window.location.pathname === "/login") return null;
    if (window.location.pathname === "/signup") return null;

    return (
        <>
            <div css={Wrap}>
                <div css={MenuArea}>
                    <MenuIcon onClick={clickMenu} css={MenuIconStyle} />
                    {isClickMenu ? (
                        <div css={ClickMenuContainer}>
                            <div css={MenuContainer} ref={menuRef}>
                                <img src={GachiGalleImgSrc.logo_img} alt="같이갈래 logo" />
                                <div css={ButtonContainer}>
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
                                                        setClickMenu(false);
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
                <div css={HeaderContainer}>
                    <div css={LogoStyle}>
                        <Link to="/">
                            <img src={GachiGalleImgSrc.logo_img} alt="같이갈래 logo"></img>
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
                        <SearchIcon css={SearchIconStyle} onClick={keywordSearch} />

                        {/* 모바일 기준 검색창 - 검색버튼 */}
                        <SearchIcon css={MobileSearchIcon} onClick={clickSearchIcon} />
                        {isClickSearchIcon ? (
                            <div>
                                <div css={MobileSearchIconClick}>
                                    <CloseIcon onClick={clickSearchIcon} css={CloseIconStyle} />
                                    {/* 모바일 기준 검색창 - 검색 input */}
                                    <input
                                        type="text"
                                        css={MobileSearchInput}
                                        placeholder="검색어를 입력해주세요."
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyUp={(e) => {
                                            if (e.key == "Enter") {
                                                keywordSearch();
                                                setIsClickSearchIcon(false);
                                            }
                                        }}
                                    ></input>
                                    <div css={RecentKeyword}>최근 검색어</div>
                                </div>
                            </div>
                        ) : (
                            false
                        )}
                    </div>
                    {isLogin ? (
                        <div css={Account}>
                            <NotificationsActiveIcon css={Notification} />
                            <AccountCircleIcon css={AccountIcon} onClick={clickAccount} />
                            {isClickAccount ? (
                                <div css={DropMenu} ref={AccountRef}>
                                    <ul>
                                        <Link to="/mypage">
                                            <li css={TopDropMenu}>마이페이지</li>
                                        </Link>
                                        <li css={BottomDropMenu} onClick={logout}>
                                            로그아웃
                                        </li>
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div css={Account}>
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
        </>
    );
};

const Wrap = css`
    display: flex;
    width: 100vw;
    min-width: 400px;
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

const MenuArea = css`
    display: none;
    @media (max-width: 768px) {
        display: block;
        z-index: 2;
    }
`;

const ClickMenuContainer = css`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 2554px;
    background-color: rgb(0, 0, 0, 0.3);
`;
const MenuContainer = css`
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
const ButtonContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderContainer = css`
    display: flex;
    justify-content: space-between;
    width: 1200px;
    align-items: center;
`;

const LogoStyle = css`
    @media (max-width: 768px) {
        margin: 0 auto;
        padding-right: 30px;
    }
    img {
        width: 140px;
        height: 74px;
        margin: 0 auto;
        @media (min-width: 768px) {
            margin-left: 40px;
        }
    }
`;

const SearchIconStyle = css`
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

const MobileSearchIcon = css`
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

const MobileSearchIconClick = css`
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

const CloseIconStyle = css`
    position: relative;
    top: 7px;
    width: 25px;
    height: 25px;
    margin: 20px;
    align-self: end;
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

const MobileSearchInput = css`
    width: 80vw;
    height: 50px;
    padding: 10px 20px;
    margin-top: -50px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: rgb(0, 0, 0, 0.02);
    border: solid 2px rgb(0, 0, 0, 0.05);
`;

const RecentKeyword = css`
    display: flex;
    align-self: start;
    margin-top: 30px;
    margin-left: 30px;
    font-weight: 600;
`;
const Account = css`
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

const AccountIcon = css`
    width: 40px;
    height: 40px;
    margin: 0 10px;
    color: ${PALETTE.default_color};
    &:hover {
        color: ${PALETTE.default_hover};
        cursor: pointer;
    }
`;

const Notification = css`
    width: 40px;
    height: 40px;
    color: ${PALETTE.default_color};
    margin: 0 10px;
    &:hover {
        color: ${PALETTE.default_hover};
        cursor: pointer;
    }
`;

const MenuIconStyle = css`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        margin-left: 20px;
    }
    &:hover {
        cursor: pointer;
    }
`;

const DropMenu = css`
    position: absolute;
    top: 70px;
    margin-left: 60px;
    background-color: white;
    border-radius: 10px;
    box-shadow: ${PALETTE.box_shadow};
    border-radius: ${PALETTE.border_radius};
    z-index: 4;

    ul {
        list-style: none;
        padding: 0;

        &a {
            text-decoration-line: none;
            color: black;
        }
    }

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

const TopDropMenu = css`
    border: solid ${PALETTE.ligth_gray} 1px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const BottomDropMenu = css`
    border: solid ${PALETTE.ligth_gray} 1px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export default Header;
