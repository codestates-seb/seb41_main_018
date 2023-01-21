/** @jsxImportSource @emotion/react */
import React from "react";
import { PALETTE } from "../../Common";
import { css } from "@emotion/react";
import DetailformItems from "./DetailformItems";
import Button from "../Button";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import Tag from "../Post_components/Tag";

// 경로 데이터 더미
const routeDummy = [
    {
        contentId: 1,
        name: "아르떼 뮤지엄",
        routeId: 1,
    },
    {
        contentId: 1,
        name: "금오름",
        routeId: 2,
    },
    {
        contentId: 1,
        name: "명월국민학교",
        routeId: 3,
    },
];

const Detailform = () => {
    return (
        <div css={wrap}>
            <div css={container}>
                {/* 경로 아이템 불러오기 */}
                <div>
                    {routeDummy.map((routeplace) => (
                        <DetailformItems
                            key={routeplace.routeId}
                            text={routeplace.name}
                            routeId={routeplace.routeId}
                        />
                    ))}
                </div>

                {/* 공통 정보 */}
                <div css={ContentsBody}>
                    <div css={ComContent}>
                        <span>카테고리</span>
                        <span>혼자 여행</span>
                    </div>
                    <div css={ComContent}>
                        <span>여행일</span>
                        <span>2023.02.08</span>
                    </div>
                    <div css={ComContent}>
                        <span>총 여행 경비</span>
                        <span>700,000원</span>
                    </div>
                </div>
                <Tag />
            </div>
            <div
                css={css`
                    display: flex;
                `}
            >
                <Button
                    width="23.5vw"
                    minWidth="240px"
                    maxWidth="340px"
                    height="50px"
                    margin="10px 10px 10px 40px"
                    bgImg="linear-gradient(15deg, #008080 0%, #00AEAE 100%)"
                    text={[
                        <BsFillHeartFill
                            css={css`
                                position: relative;
                                top: 5px;
                                right: 10px;
                            `}
                        />,
                        "가치갈래!",
                    ]}
                    ftweight="700"
                    ftsize="1.4rem"
                    color="white"
                />
                <Button
                    width="5vw"
                    minWidth="50px"
                    maxWidth="100px"
                    height="50px"
                    margin="10px 5px"
                    color="white"
                    ftsize="1.4rem"
                    ftweight="700"
                    bgImg="linear-gradient(15deg, #008080 0%, #00AEAE 100%)"
                    text=<FiShare />
                />
            </div>
        </div>
    );
};
const wrap = css`
    position: sticky;
    top: 50px;
    right: 10px;
    height: 100%;
`;

const container = css`
    width: 30vw;
    min-width: 300px;
    max-width: 450px;
    border-radius: ${PALETTE.border_radius};
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    margin: 10px 40px;
    padding: 20px;
`;

const ContentsBody = css`
    padding-top: 20px;
`;

const ComContent = css`
    display: flex;
    font-size: 1.1rem;
    justify-content: space-between;
    font-weight: 600;
    padding: 8px 20px;
`;

export default Detailform;
