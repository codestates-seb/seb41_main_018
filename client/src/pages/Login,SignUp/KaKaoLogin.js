import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL, CLIENT_ID, REDIRECT_URI } from "../../util/OAuth";
import { useRecoilState } from "recoil";
import { userInfoState, loginState } from "../../state/atom";
import queryString from "query-string";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import qs from "qs";
import axios from "axios";
import Swal from "sweetalert2";
import { ResetTvTwoTone } from "@mui/icons-material";
import { getUserInfo } from "../../util/axiosUser";

import { useQuery } from "react-query";

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
    //인가코드 받아오기
    const query = queryString.parse(window.location.search);
    console.log(query);

    //인가코드가 있으면 getKakaoTokenHandler 함수 실행
    useEffect(() => {
        if (query.code) {
            getKakaoTokenHandler(query.code.toString());
            console.log(isUserInfo);
        }
    }, []);

    const getKakaoTokenHandler = async () => {
        //POST 요청에 사용될 쿼리스트링 만들기 (qs모듈활용)
        const payload = qs.stringify({
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code: query.code,
        });

        // 토큰 발급 REST API
        axios
            .post("https://kauth.kakao.com/oauth/token", payload, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            })
            .then((res) => {
                const ACCESS_TOKEN = res.data.access_token;
                const REFRESH_TOKEN = res.data.refresh_token;
                sessionStorage.setItem("access_token", ACCESS_TOKEN);
                sessionStorage.setItem("refresh_token", REFRESH_TOKEN);
                setIsLogin(true);
                Toast.fire({
                    icon: "success",
                    title: "안녕하세요. 환영합니다!",
                });
                navigate("/");
                return res;
            })
            .catch((err) => {
                console.log(err);
                Toast.fire({
                    icon: "error",
                    title: "이메일과 비밀번호를 확인해주세요.",
                });
            });

        //     //사용자 정보 가져오기
        //     const ACCESS_TOKEN = sessionStorage.getItem("access_token");
        //     axios
        //         .get("https://kapi.kakao.com/v2/user/me", {
        //             headers: {
        //                 Authorization: `Bearer ${ACCESS_TOKEN}`,
        //                 "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        //             },
        //         })
        //         .then((res) => {
        //             console.log(res.data);
        //             const userData = {
        //                 userId: res.data.id,
        //                 image: res.data.properties.profile_image,
        //                 email: res.data.kakao_account.email,
        //                 nickname: res.data.properties.nickname,
        //                 password: res.data.properties.profile_image,
        //                 phone: "010-1111-1111",
        //             };
        //             getUserInfo(res.data.id).then((res) => {
        //                 console.log(res.data);
        //                 // setUserInfo(data.data);
        //             });
        //             console.log(isUserInfo);
        //         })
        //         .catch((err) => {
        //             console.error(err);
        //         });
        // };
    };

    // const ACCESS_TOKEN = sessionStorage.getItem("access_token");
    // const REFRESH_TOKEN = seesionStorage.getItem("refresh_token");
    // const getUserData = async () => {
    //     const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
    //         headers: {
    //             Authorization: `Bearer ${ACCESS_TOKEN}`,
    //             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //         },
    //     });
    //     return data;
    // };
    // const { isSuccess, isError, isLoading, data, error } = useQuery("getUserData", getUserData);

    // if (isLoading) {
    //     console.log("loading...");
    // }

    // if (isError) {
    //     console.log("error", error);
    // }

    // if (isSuccess) {
    //     console.log("success", data);
    // }

    // const JWT = async () => {
    //     const { data } = await axios.post("http://localhost:8080/oauth2/authorization/kakao", {
    //         headers: {},
    //     });
    //     return data;
    // };

    return (
        <a
            type="button"
            href={
                "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao"
            }
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
