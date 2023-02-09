import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Categorybar from "../components/Categorybar";
import HomeItems from "../components/Home_components/HomeItems";
import { useRecoilState } from "recoil";
import { ContentsList } from "../../src/state/atom";
import Loading from "../components/Loding";
import { useLocation } from "react-router-dom";
import { getCategory } from "../util/axiosContents";

const Result = () => {
    const location = useLocation();
    const [contentsList, setcontentsList] = useRecoilState(ContentsList);
    const [searchTargetArr, setSearchTargetArr] = useState([]);
    const [searchTargetName, setSearchTargetName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const themeTypeSwitch = (themeType) => {
        switch (themeType) {
            case "DOMESTIC":
                setSearchTargetName("국내여행");
                break;
            case "ABROAD":
                setSearchTargetName("해외여행");
                break;
            case "FAMILY":
                setSearchTargetName("가족여행");
                break;
            case "COUPLE":
                setSearchTargetName("커플여행");
                break;
            case "FRIENDS":
                setSearchTargetName("친구여행");
                break;
            case "ALONE":
                setSearchTargetName("혼자여행");
                break;
            case "CAFE":
                setSearchTargetName("카페투어");
                break;
            case "FOOD":
                setSearchTargetName("맛집투어");
                break;
        }
    };

    useEffect(() => {
        if (location.search) {
            const type = location.search.split("=")[0];
            const searchTarget = decodeURI(location.search).split("=")[1];
            /* 카테고리 선택 검색 */
            if (type === "?category") {
                getCategory(searchTarget).then((data) => {
                    if (data) {
                        themeTypeSwitch(data.data.themeType);
                        setSearchTargetArr(data?.data?.contents ?? []);
                    }
                });
                /* 검색창 키워드 검색 */
            } else if (type === "?search") {
                setSearchTargetName(searchTarget);
                setSearchTargetArr(
                    contentsList.filter((content) => content.title.includes(searchTarget))
                );
                /* 지역 선택 검색 */
            } else if (type === "?region") {
                setSearchTargetName(`${searchTarget} 지역`);
                setSearchTargetArr(
                    contentsList.filter(
                        (content) => content.routes[0].address.slice(0, 2) === searchTarget
                    )
                );
            }
        }
    }, [location.search]);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Categorybar />
                    <div>
                        <div css={resultText}>
                            {`" ${searchTargetName} "에 대한 검색결과 : ${searchTargetArr.length}건`}
                        </div>
                        <div css={postStyle}>
                            {searchTargetArr.length === 0 ? (
                                <div css={noResultMessage}>검색 결과가 없습니다.</div>
                            ) : (
                                <>
                                    {searchTargetArr.map((content) => (
                                        <HomeItems content={content} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
const resultText = css`
    font-size: 1.3rem;
    width: 90vw;
    margin: 20px auto -20px;
`;
const postStyle = css`
    display: grid;
    margin: 20px auto;
    gap: 20px;
    width: 90vw;
    grid-template-columns: repeat(1, 1fr);
    @media (min-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1000px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1440px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;

const noResultMessage = css`
    margin: 20px;
    font-size: 20px;
`;

export default Result;
