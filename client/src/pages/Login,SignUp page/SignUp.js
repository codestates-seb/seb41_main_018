import React, { useState, useRef } from "react";

import { useForm } from "react-hook-form";

import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
    LoginpageBg,
    LoginpageContainer,
    LoginLogoContainer,
    LoginContainer,
    LoginLabelBox,
    LoginInputBox,
} from "./loginstyle";
import Button from "../../components/Button";
import SocialButton from "../../components/SocialButton";
import { GachiGalleImgSrc } from "../../sampleImage";

const defaultValues = {
    email: "",
    email_subscribe: true,
    nickname: "",
    password: "",
    phone: "",
};

const SignUp = () => {
    const navigate = useNavigate();

    const [phoneNum, setphoneNum] = useState("");

    const handlePhone = (value) => {
        const regex = /^[0-9\b -]{0,11}$/;

        if (regex.test(value)) {
            setphoneNum(value);
        }

        value = value.replace(/[^0-9]/g, "");

        let result = [];
        let restNumber = "";

        // 지역번호와 나머지 번호로 나누기
        if (value.startsWith("02")) {
            // 서울 02 지역번호
            result.push(value.substr(0, 2));
            restNumber = value.substring(2);
        } else if (value.startsWith("1")) {
            // 지역 번호가 없는 경우
            // 1xxx-yyyy
            restNumber = value;
        } else {
            // 나머지 3자리 지역번호
            // 0xx-yyyy-zzzz
            result.push(value.substr(0, 3));
            restNumber = value.substring(3);
        }

        if (restNumber.length === 7) {
            // 7자리만 남았을 때는 xxx-yyyy
            result.push(restNumber.substring(0, 3));
            result.push(restNumber.substring(3));
        } else {
            result.push(restNumber.substring(0, 4));
            result.push(restNumber.substring(4));
        }

        setphoneNum(result.filter((val) => val).join("-"));
        console.log(phoneNum);
    };

    const emailCheck = async (e) => {
        const emailregex = /\S+@\S+\.\S+/;

        e.preventDefault();
        if (emailregex.test(email.current)) {
            const emailjsonData = JSON.stringify(email.current);
            console.log(emailjsonData);

            await axios
                .get(
                    `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/emailCheck/${email.current}`,
                    emailjsonData,
                    {
                        headers: {
                            "Content-Type": `application/json`,
                        },
                    }
                )
                .then((res) => {
                    if (res) {
                        alert("사용할수 있는 이메일입니다");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    console.log(emailjsonData);
                    alert("존재하는 이메일입니다");
                });
        }
    };

    const onSignUpSubmit = async (data) => {
        const jsonData = JSON.stringify(data);
        console.log(email.current);

        // 추후 axiosUser로 이동
        await axios
            .post(
                "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users",
                jsonData,
                {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                }
            )
            .then((res) => {
                alert("회원가입 성공!!!!!");
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
                console.log(data);
                alert("회원가입에 실패했습니다.");
            });
    };

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange", defaultValues });

    const email = useRef();
    email.current = watch("email");

    const password = useRef();
    password.current = watch("password");

    return (
        <div css={LoginpageBg}>
            <div css={LoginpageContainer}>
                <div css={LoginLogoContainer}>
                    <Link to={"/"}>
                        <img src={GachiGalleImgSrc.logo_img} alt="logo" />
                    </Link>
                </div>
                <form css={LoginContainer}>
                    <label htmlFor="email" css={LoginLabelBox}>
                        이메일
                    </label>
                    <div css={SignupEmailBox}>
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
                        <Button
                            type="button"
                            width="100px"
                            color="white"
                            text="중복검사"
                            // margin="40px"
                            padding="10px"
                            bdradius="50px"
                            boxShadow="1px 2px 2px rgb(0,0,0,0.3)"
                            ftsize="0.8rem"
                            onClick={emailCheck}
                        />
                    </div>
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
                            required: "비밀번호는 필수 입력입니다",
                            minLength: {
                                value: 8,
                                message: "8자리 이상 비밀번호를 사용하세요",
                            },
                        })}
                        css={LoginInputBox}
                    />
                    {errors.password && <small role="alert">{errors.password.message}</small>}
                    <label htmlFor="password" css={LoginLabelBox}>
                        비밀번호 확인
                    </label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        {...register("passwordConfirm", {
                            required: "비밀번호를 확인해주세요",
                            validate: (value) => value === password.current,
                        })}
                        css={LoginInputBox}
                    />
                    {errors.passwordConfirm && (
                        <small role="alert">"비밀번호가 일치하지 않습니다."</small>
                    )}
                    <label htmlFor="password" css={LoginLabelBox}>
                        닉네임
                    </label>
                    <input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="닉네임을 입력해주세요"
                        {...register("nickname", {
                            required: "닉네임을 입력해주세요",
                        })}
                        css={LoginInputBox}
                    />
                    {errors.nickname && <small role="alert">{errors.nickname.message}</small>}
                    <label htmlFor="password" css={LoginLabelBox}>
                        휴대폰 번호
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={phoneNum}
                        placeholder="010-1234-5678"
                        {...register("phone", {
                            onChange: (e) => {
                                handlePhone(e.target.value);
                            },
                            required: "휴대폰 번호를 입력해주세요",
                        })}
                        css={LoginInputBox}
                    />
                    {errors.phone && <small role="alert">{errors.phonenum.message}</small>}
                    <SocialButton />
                    <Button
                        type="button"
                        width="100px"
                        color="white"
                        text="Sign Up"
                        margin="30px"
                        padding="10px"
                        bdradius="50px"
                        boxShadow="1px 2px 2px 1px rgb(0,0,0,0.3)"
                        onClick={handleSubmit(onSignUpSubmit)}
                    />
                </form>
            </div>
        </div>
    );
};

const SignupEmailBox = css`
    box-sizing: initial;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 30px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    input {
        width: 80%;
        height: 30px;
        font-size: 1rem;
        border: none;
        outline: none;
    }

    button {
        width: 20%;
        height: 30px;
        margin-bottom: 10px;
    }
`;

export default SignUp;
