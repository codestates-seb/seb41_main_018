/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { PALETTE } from "../../Common";
import { css } from "@emotion/react";
import DetailformItems from "./DetailformItems";
import Button from "../Button";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";

const Detailform = () => {
    const [currentTab, setcurrentTab] = useState(0);
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);

    const selectMenuHandler = (index) => {
        setcurrentTab(index);
    };

    console.log(contentDetail);

    return (
        <div css={wrap}>
            <div css={container}>
                {/* 경로 아이템 불러오기 */}
                <div
                    css={css`
                        display: flex;
                    `}
                >
                    {contentDetail.data &&
                        contentDetail.data.routes.map((el, index) => (
                            <div
                                key={
                                    contentDetail.data &&
                                    contentDetail.data.routes &&
                                    contentDetail.data.routes[index].routeId
                                }
                                onClick={() => selectMenuHandler(index)}
                                css={currentTab === index ? SelectTab : NoSelect}
                            >
                                {el.place}
                            </div>
                        ))}
                </div>
                <div>
                    <DetailformItems index={currentTab} />
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

const SelectTab = css`
    padding: 10px 20px;
    font-size: 0.975rem;
    font-weight: 600;
    color: ${PALETTE.default_color};
    border-bottom: 0.2em solid ${PALETTE.default_color};
`;

const NoSelect = css`
    padding: 10px 20px;
    font-size: 0.975rem;
    color: ${PALETTE.gray};
    border-bottom: 0.2em solid ${PALETTE.ligth_gray};
`;

export default Detailform;
