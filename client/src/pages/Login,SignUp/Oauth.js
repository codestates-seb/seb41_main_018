import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState, userInfoState } from "../../state/atom";
import { getUserInfo } from "../../util/axiosUser";

const Oauth = () => {
    const setUserInfo = useSetRecoilState(userInfoState);
    const setIsLogin = useSetRecoilState(loginState);

    const navigate = useNavigate();
    // const location = useLocation();
    useEffect(() => {
        const getURLSearchParams = (key) => {
            return new URLSearchParams(location.search).get(key);
        };
        const ACCESS_TOKEN = getURLSearchParams("accessToken");
        const REFRESH_TOKEN = getURLSearchParams("refreshToken");
        const userId = getURLSearchParams("userId");

        if (ACCESS_TOKEN && REFRESH_TOKEN && userId) {
            sessionStorage.setItem("access_token", ACCESS_TOKEN);
            sessionStorage.setItem("refresh", REFRESH_TOKEN);
            sessionStorage.setItem("userId", userId);
        }

        if (ACCESS_TOKEN) {
            getUserInfo(userId).then((data) => {
                setUserInfo(data.data);
                setIsLogin(true);
            });
            navigate("/");
        } else {
            alert("해당 이메일은 이미 가입된 계정입니다. 가입된 이메일로 로그인해주세요.");
            navigate("/users/login");
        }
    }, []);

    return <div>로딩중...</div>;
};
export default Oauth;
