import axios from "axios";

// http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080

// 컨텐츠 전체 조회 & 단건 조회
export const getContent = async (contentId = 0) => {
    return await axios
        .get(`/contents${contentId !== 0 ? `/${contentId}` : "/?page=1&size=10"}`)
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
        .get(`/comments${commentId !== 0 ? `/${commentId}` : "/?page=1&size=10"}`)
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
            "/comments",
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
                alert("로그인이 필요합니다");
                location.href = "/login";
            }
            console.error(err.message);
        });
};
