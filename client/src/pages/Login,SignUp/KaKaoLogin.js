import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState, loginState } from "../../state/atom";
import queryString from "query-string";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import qs from "qs";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQueries, useQuery } from "react-query";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    width: "380px",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const KaKaoLogin = () => {
    const navigate = useNavigate();
    const [isUserInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const [isUserData, setUserData] = useState({});

    // 인가코드 받아오기
    const query = queryString.parse(window.location.search);
    console.log(query);

    //qs 모듈을 사용하여 data값들을 query string으로 변환
    const payload = qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        code: query.code,
    });
    console.log(payload);

    //API) accessToken 발급
    const getAuthorization = async (payload) => {
        const data = await axios.post("https://kauth.kakao.com/oauth/token", payload, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        return data;
    };

    //API) accessToken으로 KaKao에서 사용자 정보 가져오기
    const ACCESS_TOKEN = sessionStorage.getItem("access_token");
    const REFRESH_TOKEN = sessionStorage.getItem("refresh_token");
    const getUserData = async () => {
        const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        return data;
    };

    //API) 이메일 중복확인
    const emailCheck = async () => {
        const data = await axios.get(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/emailCheck/${isUserInfo.email}`
        );
        return data;
    };

    //API) 카카오 정보로 회원 가입하기
    const AuthSignUp = async (isUserData) => {
        const data = await axios.post(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users`,
            isUserData
        );
        return data;
    };

    //API) 서버 유저 데이터 가져오기
    const getData = async () => {
        const data = await axios.get(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/${result[2].data?.userId}/Info`
        );
        return data;
    };

    //API) 로그인
    // const AuthLogin = as;

    const result = useQueries([
        //이메일 중복 확인
        { queryKey: ["checkEmail"], queryFn: emailCheck },
        //카카오 서버로부터 유저정보 받아오기
        { queryKey: ["getUserData"], queryFn: getUserData },
        //가치갈래 서버 유저 정보 요청
        // { queryKey: ["getData"], queryFn: getData },
    ]);

    const authorization = useMutation(getAuthorization, {
        onError: (err, variables) => {
            console.error(err);
        },
        //카카오 서버로 부터 받은 accessToken과 refreshToken을 sessionStorage에 저장
        onSuccess: (data, variables) => {
            console.log("success", data.data, variables);
            sessionStorage.setItem("access_token", data.data.access_token);
            sessionStorage.setItem("refresh_token", data.data.refresh_token);
            // navigate("/");
        },
    });

    // setIsLogin(true);
    // Toast.fire({
    //     icon: "success",
    //     title: "안녕하세요. 환영합니다!",
    // });

    //카카오 서버로부터 받은 데이터로 회원등록하기
    const KaKaoSignUp = useMutation(AuthSignUp, {
        onSuccess: () => {
            console.log(data);
        },
        onError: () => {
            console.error();
        },
    });

    //인가코드가 있으면 accessToken을 받아오는 mutate 실행
    useEffect(() => {
        if (query.code) {
            authorization.mutate(payload);
        }

        //등록되지 않은 이메일이라면
        if (result[0].data?.data === true) {
            const userData = {
                // userId: result[1].data?.id,
                // image: result[1].data?.properties.profile_image,
                email: result[1].data?.kakao_account.email,
                nickname: result[1].data?.properties.nickname,
                password: "0000",
                phone: "010-1111-1111", //카카오 소셜 로그인으로 전화번호를 받아올 수 없음 (비지니스 전환해야함)
            };
            setUserData(userData);
            setUserInfo(isUserInfo);
            KaKaoSignUp.mutate(isUserData);
            console.log(`userData`, isUserData);
        }
    }, []);

    return (
        <a
            type="button"
            href="http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao"
            css={KakaoLogo}
        >
            <img
                alt="kakao"
                src="https://i.postimg.cc/hGMs7XMR/100px-Kakao-Corp-symbol-2012-svg.png"
            />
        </a>
    );
};

const KakaoLogo = css`
    width: 40px;
    height: 40px;

    background-color: rgb(254, 229, 0);

    img {
        width: 16px;
        height: 16px;
    }
`;

export default KaKaoLogin;
