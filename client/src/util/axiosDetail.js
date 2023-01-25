import axios from "axios";

// http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080

// 컨텐트 전체 조회 & 컨텐트 조회
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
