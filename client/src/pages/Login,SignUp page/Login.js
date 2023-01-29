import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import {
    getAuthorization,
    getRefresh,
    userInfoState,
    loginState,
    AddedLikeState,
} from "../../state/atom";
import SocialButton from "../../components/SocialButton";
import Button from "../../components/Button";
import logo9 from "../../assets/logo9.png";
import { Login, getUserInfo } from "../../util/axiosUser";
import {
    LoginpageBg,
    LoginpageContainer,
    LoginLogoContainer,
    LoginContainer,
    LoginLabelBox,
    LoginInputBox,
} from "./loginstyle";

const defaultValues = {
    email: "",
    password: "",
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [Authorization, setAuthorization] = useRecoilState(getAuthorization);
    const [Refresh, setRefresh] = useRecoilState(getRefresh);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const [adddedLike, setAddedLike] = useRecoilState(AddedLikeState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onchange", defaultValues });

    // "ADD" 인 좋아요만 filter
    const likeFilter = () => {
        let likeArr = userInfo && userInfo.hearts.filter((el) => el.heartType === "ADD");
        setAddedLike(likeArr);
    };

    const onSubmit = async (data) => {
        const jsonData = JSON.stringify(data);

        await Login(jsonData)
            .then((res) => {
                getUserInfo(res.data.userId).then((data) => {
                    setUserInfo(data.data);
                    setIsLogin(true);
                    navigate("/");
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        if (!userInfo) {
            likeFilter();
        }
    }, [userInfo]);

    return (
        <div css={LoginpageBg}>
            <div css={LoginpageContainer}>
                <div css={LoginLogoContainer}>
                    <Link to={"/"}>
                        <img src={logo9} alt="logo" />
                    </Link>
                </div>
                <form css={LoginContainer} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email" css={LoginLabelBox}>
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="이메일을 입력해주세요."
                        {...register("email", {
                            required: "이메일은 필수 입력입니다.",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "이메일 형식에 맞지 않습니다.",
                            },
                        })}
                        css={LoginInputBox}
                    />
                    {errors.email && <small role="alert">{errors.email.message}</small>}
                    <label htmlFor="password" css={LoginLabelBox}>
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요."
                        {...register("password", {
                            required: "비밀번호는 필수 입력입니다.",
                            minLength: {
                                value: 8,
                                message: "8자리 이상 비밀번호를 사용하세요.",
                            },
                        })}
                        css={LoginInputBox}
                    />
                    {errors.password && <small role="alert">{errors.password.message}</small>}
                    <SocialButton />
                    <Button
                        type="button"
                        width="100px"
                        color="white"
                        text="Login"
                        margin="40px"
                        padding="10px"
                        bdradius="50px"
                        boxShadow="1px 2px 2px 1px rgb(0,0,0,0.3)"
                    />
                    <div css={UserInfoButton}>아이디 / 비밀번호 찾기</div>
                    <Link to={"/signup"}>
                        <div css={UserInfoButton}>회원가입</div>
                    </Link>
                </form>
            </div>
        </div>
    );
};

const UserInfoButton = css`
    color: rgba(0, 0, 0, 0.3);
    margin: 10px;

    cursor: pointer;

    &:hover {
        color: rgba(0, 0, 0, 0.5);
    }
    &:active {
        color: rgba(0, 0, 0, 1);
    }
`;

export default LoginPage;
