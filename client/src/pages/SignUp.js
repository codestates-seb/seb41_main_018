import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

import Button from "../components/Button";
import SocialButton from "../components/SocialButton";
import { BgCenter, Container, LogoContainer, LoginContainer, LabelBox, InputBox } from "./Login";

const SignUp = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        nickname: "",
        phonenumber: "",
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isDirty, errors },
    } = useForm({mode: 'onBlur'});

    const onSubmit = async (data) => {
        await new Promise((r) => setTimeout(r, 300));
        setUserInfo(data);
        console.log(userInfo);
    };


    const [inputValue, setInputValue] = useState();

    // const handleChange = (e) => {
    //     const regex = /^[0-9\b -]{0,13}$/;
    //     if (regex.test(e.target.value)) {
    //         setInputValue(e.target.value);
    //     }
    // }

    const onSignUpSubmitHandler = async () => {
        const jsonData = JSON.stringify(userInfo);
        console.log(jsonData)
    
        await axios.post("url", jsonData,
        {
            headers: {
                "Content-Type": `application/json`
            }
            })
            .then((res) => {
                navigate("/login");
            })
            .catch((err) => {
                console.log(err)
                alert('회원가입에 실패했습니다.');
            })
        }

    return (
        <div css={BgCenter}>
            <div css={Container}>
                <div css={LogoContainer}>
                    hi
                </div>
                <form css={LoginContainer}>
                    <label htmlFor="email" css={LabelBox}>이메일</label>
                    <div css={EmailBox}>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="test@email.com"
                            {...register("email", {
                                required: "이메일은 필수 입력입니다",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "이메일 형식에 맞지 않습니다",
                                },
                            })}
                        />
                        <Button text={"중복검사"} />
                    </div>
                    {errors.email && <small role="alert">{errors.email.message}</small>}
                    <label htmlFor="password" css={LabelBox}>비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                        {...register("password", {
                            required: "비밀번호는 필수 입력입니다",
                            minLength: {
                                value: 8,
                                message: "8자리 이상 비밀번호를 사용하세요",
                            },
                        })}
                        css={InputBox}
                    />
                    {errors.password && <small role="alert">{errors.password.message}</small>}
                    <label htmlFor="password" css={LabelBox}>닉네임</label>
                    <input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="닉네임을 입력해주세요"
                        aria-invalid={!isDirty ? undefined : errors.nickname? "true" : "false"}
                        {...register("nickname", {
                            required: "닉네임을 입력해주세요",
                        })}
                        css={InputBox}
                    />
                    {errors.nickname && <small role="alert">{errors.nickname.message}</small>}
                    <label htmlFor="password" css={LabelBox}>휴대폰 번호</label>
                    <input
                        id="phonenumber"
                        type="tel"
                        name="phonenumber"
                        placeholder="010-1234-5678"
                        aria-invalid={!isDirty ? undefined : errors.phonenumber? "true" : "false"}
                        {...register("phonenumber", {
                            required: "휴대폰 번호를 입력해주세요",
                            minLength: {
                                value: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
                                message: "11자리 이상 번호를 입력해주세요",
                            },
                        })}
                        css={InputBox}
                    />
                    {errors.phonenumber && <small role="alert">{errors.phonenumber.message}</small>}
                    <Button type="submit" text="Sign Up" onClick={onSignUpSubmitHandler}/>
                <SocialButton />
                </form>
            </div>
        </div>
    );
};

const EmailBox = css`
    box-sizing: initial;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);


    input{
        width: 80%;
        height: 50px;
        font-size: 20px;

        border: none;
        outline: none;
    }

    button{
        width: 20%;
        height: 30px;
        margin: 5px;
    }
`;

export default SignUp;
