import axios from "axios";

// http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080

// 로그인
export const Login = async (jsonData) => {
    return await axios
        .post("/users/login", jsonData, {
            headers: {
                "Content-Type": `application/json`,
            },
        })

        .then((res) => {
            if (res.status === 202) {
                console.log("Login Success!");

                const accessToken = res.headers.get("Authorization");
                const refreshToken = res.headers.get("RefreshToken");
                sessionStorage.setItem("access_token", accessToken);
                sessionStorage.setItem("refresh_token", refreshToken);
            }
            return res;
        })
        .catch((err) => {
            console.log(err);
            alert("로그인에 실패했습니다.");
        });
};

// user info 조회
export const getUserInfo = async (userId) => {
    return await axios
        .get(`/users/${userId}`, {
            headers: {
                Authorization: sessionStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err.message);
        });
};
