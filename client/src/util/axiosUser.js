import axios from "axios";
import Swal from "sweetalert2";
// http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080
/* {
	"email": "ppp@gmail.com",
	"password": "12345678"
 
 } */

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
// 회원가입
export const Signup = async (data) => {
    await axios
        .post("http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users", data, {})
        .then((res) => {
            Toast.fire({
                icon: "success",
                title: "회원가입이 완료되었습니다.",
            });
        })
        .catch((err) => {
            Toast.fire({
                icon: "error",
                title: "회원가입에 실패했습니다.",
            });
        });
};

// 회원가입 - 이메일 중복검사
export const EmailCheck = async (email) => {
    await axios
        .get(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/emailCheck/${email}`,
            email
        )
        .then((res) => {
            if (res.data) {
                Toast.fire({
                    icon: "success",
                    title: "사용할 수 있는 이메일입니다.",
                });
            } else {
                Toast.fire({
                    icon: "warning",
                    title: "존재하는 이메일입니다.",
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
// 로그인
export const Login = async (jsonData) => {
    return await axios
        .post(
            "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/login",
            jsonData,
            {
                headers: {
                    "Content-Type": `application/json`,
                },
            }
        )

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
            Toast.fire({
                icon: "error",
                title: "이메일과 비밀번호를 확인해주세요.",
            });
        });
};

// user info 조회
export const getUserInfo = async (userId) => {
    return await axios
        .get(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}/Info`,
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
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
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`,
            { nickname: editName },
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            Toast.fire({
                icon: "success",
                title: "수정이 완료되었습니다.",
            });
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
            "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/logout",
            {},
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then(() => {
            Toast.fire({
                icon: "success",
                title: "로그아웃이 완료되었습니다.",
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
};

// 회원탈퇴
export const deleteUser = async (userId) => {
    return await axios
        .delete(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users/${userId}`,
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then(() => {
            Toast.fire({
                icon: "success",
                title: "회원탈퇴가 완료되었습니다.",
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
};
