/** @jsxImportSource @emotion/react */
import React from "react";
import { PALETTE } from "../Common";
import { css } from "@emotion/react";
import DetailformItems from "./DetailformItems";
import Button from "../components/Button";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";

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
        <div
            css={css`
                position: sticky;
                top: 50px;
                right: 10px;
                height: 100%;
            `}
        >
            <div
                css={css`
                    width: 30vw;
                    border-radius: ${PALETTE.border_radius};
                    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
                    margin: 10px 40px;
                    padding: 20px;
                `}
            >
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
                    <div css={TagBox}>
                        <div>맛집</div>
                        <div>혼밥</div>
                        <div>사람 많음ㅜㅜ</div>
                    </div>
                </div>
            </div>
            <div
                css={css`
                    display: flex;
                `}
            >
                <Button
                    width="23.5vw"
                    margin="10px 10px 10px 40px"
                    text={[
                        <BsFillHeartFill
                            css={css`
                                position: relative;
                                top: 5px;
                                right: 70px;
                            `}
                        />,
                        "가치갈래!",
                    ]}
                    ftweight="700"
                    ftsize="1.4rem"
                />
                <Button width="5vw" margin="10px" color="black" ftsize="1.4rem" text=<FiShare /> />
            </div>
        </div>
    );
};

const ContentsBody = css`
    padding-top: 20px;
`;

const ComContent = css`
    display: flex;
    justify-content: space-between;
    padding: 3px 20px;
`;

const TagBox = css`
    display: flex;
    padding: 10px 15px;
    div {
        background-color: #e1ecf4;
        border-radius: 3px;
        padding: 5px;
        margin: 5px;
        color: #39739d;
        font-size: 12px;
    }
`;
export default Detailform;
