import React, { useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { signUp, Login, getUserInfo} from "../../util/axiosUser";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState, loginState } from "../../state/atom";
import axios from "axios";


const SocialButton = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isLogin, setIsLogin] = useRecoilState(loginState);


    return (
        <div css={SocialLogin}>
            <button type="button" css={KakaoLogo}>
                <img
                    alt="kakao"
                    src="https://i.postimg.cc/hGMs7XMR/100px-Kakao-Corp-symbol-2012-svg.png"
                />
            </button>
            <button type="button" css={NaverLogo}>
                <img alt="naver" src="https://i.postimg.cc/tCQVzXs1/btn-G.png" />
            </button>
            <button css={GoogleLogo}>
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const details = jwt_decode(credentialResponse.credential);

                        const googleSignUpData = {
                            email: details.email,
                            email_subscribe: true,
                            nickname: details.name,
                            password: "1111111111",
                            phone: "1111111111111",
                        }
                        const googleLogindata = {
                            email: details.email,
                            password: "1111111111",
                        }

                        // console.log(details);
                        // console.log(credentialResponse);
                        
                        await axios
                        .get(
                            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/emailCheck/${details.email}`,
                            details.email
                        )
                        .then((res) => {
                            if(res.data) {
                                signUp(googleSignUpData)
                            } else {
                                Login(googleLogindata)
                                .then((res) => {
                                    getUserInfo(res.data.userId).then((data) => {
                                        setUserInfo(data.data);
                                        setIsLogin(true);
                                    });
                                })
                            }
                        })
                        .then(() => {
                            navigate("/")
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    }}
                    onError={() => {
                        console.log('err')
                    }}
                    type="icon"
                    shape="circle"
                    theme="outline"
                ></GoogleLogin>
            </button>
        </div>
    );
};

const SocialLogin = css`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;

    button {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 40px;
        border: none;

        cursor: pointer;

        :hover {
            transform: scale(1.1, 1.1);
            -ms-transform: scale(1.1, 1.1);
            -webkit-transform: scale(1.1, 1.1);
            transition-duration: 250ms;
        }
    }
`;

const KakaoLogo = css`
    width: 40px;
    height: 40px;

    background-color: rgb(254, 229, 0);

    img {
        width: 16px;
        height: 16px;
    }
`;

const NaverLogo = css`
    background: none;

    margin-left: 15px;

    img {
        width: 40px;
        height: 40px;
    }
`;

const GoogleLogo = css`
    width: 40px;
    height: 40px;

    margin-left: 15px;

    background-color: rgb(249 249 249);

    img {
        width: 20px;
        height: 20px;
    }
`;

export default SocialButton;
