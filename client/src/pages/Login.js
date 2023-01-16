import React, { useState } from "react";
import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import SocialButton from "../components/SocialButton";
import Button from "../components/Button";

const defaultValues = {
    email: "",
    password: "",
};

const LoginPage = () => {
    // const [userInfo, setUserInfo] = useState({
    //     email: "",
    //     password: "",
    // });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isDirty, errors },
    } = useForm({ mode: "onchange", defaultValues });

    const onSubmit = (data) => {
        setUserInfo(data);
        console.log(userInfo);
    };

    return (
        <div css={BgCenter}>
            <div css={Container}>
                <div css={LogoContainer}>hi</div>
                <form css={LoginContainer} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email" css={LabelBox}>
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
                        css={InputBox}
                    />
                    {errors.email && <small role="alert">{errors.email.message}</small>}
                    <label htmlFor="password" css={LabelBox}>
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                        {...register("password", {
                            required: "비밀번호는 필수 입력입니다.",
                            minLength: {
                                value: 8,
                                message: "8자리 이상 비밀번호를 사용하세요.",
                            },
                        })}
                        css={InputBox}
                    />
                    {errors.password && <small role="alert">{errors.password.message}</small>}
                    <SocialButton />
                    {/* <Button type="submit" text="Login"/> */}
                    <Button
                        type="button"
                        text="Login"
                        transform="scale(1.1, 1.1)"
                        ms_transform="scale(1.1, 1.1)"
                        webkit_transform="scale(1.1, 1.1)"
                        bgHover="rgba(228, 78, 78, 1)"
                        transition="250ms"
                    />
                    <div css={UserData}>아이디 / 비밀번호 찾기</div>
                    <div css={UserData}>회원가입</div>
                </form>
            </div>
        </div>
    );
};

export const BgCenter = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: hsl(210, 8%, 95%);
`;

export const Container = css`
    width: 38rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    display: grid;
`;

export const LogoContainer = css`
    padding: 20px 0;
`;

export const LoginContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    height: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
    small {
        color: rgba(248, 112, 112, 1);
        margin-bottom: 30px;
        font-size: 15px;
    }
`;

export const LabelBox = css`
    margin: 10px;
`;

export const InputBox = css`
    width: 80%;
    height: 50px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
    font-size: 20px;
`;

const UserData = css`
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
