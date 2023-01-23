/** @jsxImportSource @emotion/react */
import React from "react";
import { PALETTE } from "../../Common";
import { css } from "@emotion/react";
import DetailformItems from "./DetailformItems";
import Button from "../Button";
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
            </div>
            <div css={ButtonBox}>
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
    display: flex;
    flex-direction: column;
`;

const container = css`
    width: 90vw;
    /*  min-width: 300px;
    max-width: 450px; */
    border-radius: ${PALETTE.border_radius};
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    margin: 10px 40px;
    padding: 20px;
`;
const ButtonBox = css`
    display: flex;
    align-self: flex-end;
    padding-right: 40px;
`;

export default Detailform;
