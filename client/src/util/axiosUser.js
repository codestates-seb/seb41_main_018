import axios from "axios";

// http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080
/* {
	"email": "ppp@gmail.com",
	"password": "12345678"
 
 } */
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
        .get(`/users/${userId}/Info`, {
            headers: {
                Authorization: sessionStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err.message);
        });
};

// 로그인 상태 확인
export const checkLogin = async () => {
    return await getUserInfo().then((res) => {
        if (!res) {
            console.log("Please login");
        } else {
            return res.data;
        }
    });
};

// 닉네임 수정
export const userEdit = async (userId, editName) => {
    return await axios
        .patch(
            `/users/${userId}`,
            { nickname: editName },
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            console.log("수정 완료");
            return res.data;
        })
        .catch((err) => {
            console.error(err.message);
        });
};

//로그아웃
export const userLogout = async () => {
    return await axios
        .post(
            "/users/logout",
            {},
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then(() => {
            alert("로그아웃 되었습니다.");
        })
        .catch((err) => {
            console.error(err.message);
        });
};

// 회원탈퇴
export const deleteUser = async (userId) => {
    return await axios
        .delete(`/users/${userId}`, {
            headers: {
                Authorization: sessionStorage.getItem("access_token"),
            },
        })
        .then(() => {
            alert("탈퇴가 완료되었습니다.");
        })
        .catch((err) => {
            console.error(err.message);
        });
};
