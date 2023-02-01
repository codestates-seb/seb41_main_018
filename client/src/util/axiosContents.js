import axios from "axios";
import Swal from "sweetalert2";
// http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080
// "proxy": ""

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

// 컨텐츠 전체 조회 & 단건 조회
export const getContent = async (contentId = 0) => {
    return await axios
        .get(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/contents${
                contentId !== 0 ? `/${contentId}` : "/?page=1&size=100"
            }`
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err.message);
        });
};
// 리뷰(커멘트) 전체 조회 & 단건 조회
export const getComment = async (commentId = 0) => {
    return await axios
        .get(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/comments${
                commentId !== 0 ? `/${commentId}` : "/?page=1&size=100"
            }`
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err.message);
        });
};

// 리뷰(커멘트) 등록
export const createReview = async (body, id, rate) => {
    return await axios
        .post(
            "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/comments",
            {
                body: body,
                contentId: id,
                ratingType: rate,
            },
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (err.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "로그인이 필요합니다.",
                });
                /* location.href = "/login"; */
            }
            console.error(err.message);
        });
};

// 리뷰(커멘트) 수정
export const patchReview = async (commentId, body, ratingType) => {
    return await axios
        .patch(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/comments/${commentId}`,
            {
                body: body,
                ratingType: ratingType,
            },
            {
                headers: {
                    "Content-Type": `application/json`,
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (err.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "권한이 없습니다.",
                });
            }
            console.log(err);
        });
};

// 리뷰(커멘트) 삭제
export const deleteReview = async (commentId) => {
    return await axios
        .delete(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/comments/${commentId}`,
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            Toast.fire({
                icon: "success",
                title: "삭제가 완료되었습니다.",
            });
            return res;
        })
        .catch((err) => {
            if (err.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "권한이 없습니다.",
                });
            }
            console.log(err);
        });
};

// 카테고리별 컨텐츠 조회
export const getCategory = async (themeType) => {
    return await axios
        .get(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/contents/category/${themeType}`
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err.message);
        });
};

// 컨텐츠 등록
export const postContent = async (data) => {
    return await axios
        .post(
            "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/contents",
            {
                title: data.title,
                themeType: data.themeType,
                travelDate: data.travelDate,
                tag: data.tag,
                routes: data.routes,
            },
            {
                headers: {
                    "Content-Type": `application/json`,
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (err.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "권한이 없습니다.",
                });
            } else
                Toast.fire({
                    icon: "error",
                    title: "모든 항목을 작성해주세요.",
                });

            console.log(err);
        });
};

// 컨텐츠 수정
export const patchContent = async (data) => {
    return await axios
        .patch(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/contents/${data.contentId}`,
            {
                title: data.title,
                themeType: data.themeType,
                travelDate: data.travelDate,
                tag: data.tag,
                routes: data.routes,
                contentId: data.contentId,
                userId: data.userId,
            },
            {
                headers: {
                    "Content-Type": `application/json`,
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            Toast.fire({
                icon: "error",
                title: "수정에 실패했습니다.",
            });
        });
};

// 컨텐츠 삭제
export const deleteContent = async (contentId) => {
    return await axios
        .delete(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`,
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            Toast.fire({
                icon: "Success",
                title: "삭제가 완료되었습니다.",
            });

            return res;
        })
        .catch((err) => {
            if (err.response.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: "권한이 없습니다.",
                });
            }
            console.log(err);
        });
};

// 좋아요 등록 / 삭제
export const postHeart = async (userId, contentId) => {
    return await axios
        .post(
            `http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/${userId}/${contentId}/hearts`,
            {},
            {
                headers: {
                    Authorization: sessionStorage.getItem("access_token"),
                },
            }
        )
        .then((res) => {
            if (res.data) {
                Toast.fire({
                    icon: "Success",
                    title: `"좋아요" 가  등록되었습니다.`,
                });
            } else {
                Toast.fire({
                    icon: "Success",
                    title: `"좋아요" 가  취소되었습니다.`,
                });
            }
            return res;
        })
        .catch((err) => {
            if (err.response.status === 401 || userId === undefined) {
                Toast.fire({
                    icon: "error",
                    title: "로그인이 필요합니다.",
                });
                /* location.href = "/login"; */
            }
            console.log(err);
        });
};
