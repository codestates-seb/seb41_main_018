import { useRecoilState } from "recoil";
import { ContentDetail } from "../state/atom";
import axios from "axios";

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
