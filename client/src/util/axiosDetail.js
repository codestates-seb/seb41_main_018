import axios from "axios";

// http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080

// 컨텐트 전체 조회 & 컨텐트 조회
export const getContent = async (contentId = 0) => {
    await axios
        .get(`/constents${contentId !== 0 ? `/${contentId}` : ""}`)
        .then((res) => {
            if (!res.ok) {
                throw Error("error");
            }
            return res;
        })
        .catch((err) => {
            console.error(err.message);
        });
};
