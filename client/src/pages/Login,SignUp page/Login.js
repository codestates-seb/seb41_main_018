import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { getAuthorization, getRefresh } from "../../state/atom";
import SocialButton from "../../components/SocialButton";
import Button from "../../components/Button";
import logo9 from "../../assets/logo9.png";
import axios from "axios";
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onchange", defaultValues });

    const onSubmit = async (data) => {
        const jsonData = JSON.stringify(data);

        console.log(jsonData);

        await axios
            .post("/users/login", jsonData, {
                headers: {
                    "Content-Type": `application/json`,
                },
            })
            .then((res) => {
                navigate("/");
                sessionStorage.setItem("Authorization", res.headers.get("Authorization"));
                sessionStorage.setItem("Refresh", res.headers.get("Refresh"));
                alert("로그인 성공!");
            })
            .catch((err) => {
                console.log(err);
                alert("로그인에 실패했습니다.");
            });
    };

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
                        placeholder="test@email.com"
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
                        placeholder="비밀번호"
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
                    <Button type="button" text="Login" />
                    <div css={UserInfoButton}>아이디 / 비밀번호 찾기</div>
                    <div css={UserInfoButton}>회원가입</div>
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
