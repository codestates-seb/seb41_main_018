import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUserInfo } from "../../util/axiosUser";
const LoadingPage = () => {
    const location = useLocation();
    useEffect(() => {
        const getURLSearchParams = (key) => {
            return new URLSearchParams(location.search).get(key);
        };
        const ACCESS_TOKEN = getURLSearchParams("accessToken");
        const REFRESH_TOKEN = getURLSearchParams("refreshToken");
        const userId = getURLSearchParams("userId");
        if (ACCESS_TOKEN && REFRESH_TOKEN && userId) {
            sessionStorage.setItem("authorization", ACCESS_TOKEN);
            sessionStorage.setItem("refresh", REFRESH_TOKEN);
            sessionStorage.setItem("userId", userId);
        }

        const accesstoken = sessionStorage.getItem("authorization");
        if (accesstoken) {
            window.location.replace("/");
        } else {
            alert("이미 가입된 계정입니다. 가입된 이메일로 로그인해주세요.");
            window.location.replace("/users/login");
        }
    }, []);

    return <div>로딩중...</div>;
};
export default LoadingPage;
