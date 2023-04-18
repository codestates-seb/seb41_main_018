import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//component
import CategoryBar from "../components/CategoryBar";
import ResultItems from "../HomePage/HomeComponents/ResultItems";
import Loading from "../components/Loding";

//reocil
import { useRecoilState, useRecoilValue } from "recoil";
import { ContentsList } from "../../../src/state/atom";

//API
import { getCategory } from "../../util/axiosContents";

const Result = () => {
    const location = useLocation();
    const contentsList = useRecoilValue(ContentsList);
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
                        // setSearchTargetArr(data?.data?.contents ?? []); //getCategory API에서 이미지에 대한 key 값이 없기 떄문에 결과창에서 이미지 출력이 불가함
                        setSearchTargetArr(
                            contentsList.filter((el) => el.themeType === data.data.themeType)
                        );
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
                    <CategoryBar />
                    <div>
                        <div css={ResultText}>
                            {`" ${searchTargetName} "에 대한 검색결과 : ${searchTargetArr.length}건`}
                        </div>
                        <div>
                            {searchTargetArr.length === 0 ? (
                                <div css={NoResultMessage}>검색 결과가 없습니다.</div>
                            ) : (
                                <div css={PostWrap}>
                                    {searchTargetArr.map((content, index) => (
                                        <div css={PostStyle}>
                                            <ResultItems content={content} key={index} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
const ResultText = css`
    font-size: 1.3rem;
    width: 90vw;
    margin: 20px auto -20px;
`;
const PostWrap = css`
    width: 90%;

    margin: 20px auto;
    display: grid;
    gap: 20px;
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

const PostStyle = css`
    width: 100%;
    height: 400px;
`;

const NoResultMessage = css`
    margin: 40px;
    font-size: 1.3rem;
`;

export default Result;
