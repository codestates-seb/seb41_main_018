/** @jsxImportSource @emotion/react */
import React from "react";
import { PALETTE } from "../Common";
import { css } from "@emotion/react";
import DetailformItems from "./DetailformItems";
import Button from "../components/Button";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import Tag from "../components/Tag";
const Detailform = (props) => {
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
                <div>
                    <DetailformItems text="강남역" />
                    <DetailformItems text="역삼역" />
                    <DetailformItems text="삼성역" />
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
                    height="6vh"
                    margin="10px 10px 10px 40px"
                    bgImg="linear-gradient(15deg, #008080 0%, #00AEAE 100%)"
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
                    color="white"
                />
                <Button
                    width="5vw"
                    height="6vh"
                    margin="10px"
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

const ContentsBody = css`
    padding-top: 20px;
`;

const ComContent = css`
    display: flex;
    font-size: 1.1rem;
    justify-content: space-between;
    padding: 3px 20px;
`;

export default Detailform;
