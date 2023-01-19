import React from "react";
import { useState, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PostformItems from "./PostformItems";
import Button from "./Button";
import Tag from "./Tag";
import { PALETTE } from "../Common";
import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { addBtnClickState } from "../state/atom";

const Postform = (props) => {
    const [countList, setCountList] = useState([0]);
    const [isAddBtnClick, setAddBtnClick] = useRecoilState(addBtnClickState);

    const onAddBtnClick = () => {
        let countArr = [...countList];
        setAddBtnClick(isAddBtnClick + 1);
        countArr.push(isAddBtnClick);
        setCountList(countArr);
    };
    const handleChange = (result) => {
        if (!result.destination) return;
        const items = [...countList];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCountList(items);
        console.log(countList);
    };

    return (
        <DragDropContext onDragEnd={handleChange}>
            <div css={wrap}>
                <div css={container}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {countList.map((e, i) => (
                                    <Draggable draggableId={`${e}`} index={`${i}`} key={`${e}`}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <PostformItems
                                                        isDragging={snapshot.isDragging}
                                                    />
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Button
                        width="27vw"
                        maxWidth="400px"
                        minWidth="250px"
                        minheigth="47px"
                        text="추가하기"
                        onClick={onAddBtnClick}
                    />

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
        </DragDropContext>
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

export default Postform;
