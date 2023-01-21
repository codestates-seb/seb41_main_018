import React from "react";
import { useState, useRef, useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import PostformItems from "./PostformItems";
import Button from "../Button";
import Tag from "./Tag";
import { PALETTE } from "../../Common";

import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineConsoleSql } from "react-icons/ai";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import { addBtnClickState } from "../../state/atom";

import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const Postform = (props) => {
    const [countList, setCountList] = useState([0]);
    const [isAddBtnClick, setAddBtnClick] = useRecoilState(addBtnClickState);
    const [isDragging, setDragging] = useState(false);
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [iscalendarClick, setCalendarClick] = useState(false);
    const calendarRef = useRef();

    const options = [
        "국내여행",
        "해외여행",
        "효도여행",
        "커플여행",
        "친구여행",
        "혼자여행",
        "카페투어",
        "맛집투어",
    ];
    const defaultOption = options[0];

    const onAddBtnClick = () => {
        let countArr = [...countList];
        setAddBtnClick(isAddBtnClick + 1);
        countArr.push(isAddBtnClick);
        setCountList(countArr);
    };

    const onRemoveBtnClick = (index) => {
        console.log(countList);
        console.log(index);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = [...countList];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCountList(items);
        setDragging(false);
    };

    const onDragStart = () => {
        setDragging(true);
    };

    const defaultValues = {
        title: "자동차",
        body: "강남역",
    };
    const putdate = async () => {
        const jsonData = JSON.stringify(defaultValues);
        await axios
            .post(
                "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users",
                jsonData,
                {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                }
            )
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                alert("error");
            });
    };
    // calendar
    const handleClickOutSide = (e) => {
        if (iscalendarClick && !calendarRef.current.contains(e.target)) {
            setCalendarClick(false);
        }
    };
    useEffect(() => {
        if (iscalendarClick) document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    });

    // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    //     <button className="example-custom-input" onClick={onClick} ref={ref}>
    //         {value}
    //     </button>
    // ));

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <div css={wrap}>
                <div css={container}>
                    {isDragging ? (
                        <Button
                            width="27vw"
                            maxWidth="400px"
                            minWidth="250px"
                            minheigth="47px"
                            text={[<MdDelete />, "삭제하기"]}
                            onClick={onRemoveBtnClick}
                        />
                    ) : null}
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {countList.map((e, i) => (
                                    <Draggable draggableId={`${e}`} index={i} key={`${e}`}>
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
                        margin="0 auto"
                        onClick={onAddBtnClick}
                    />

                    {/* 공통 정보 */}
                    <div css={ContentsBody}>
                        <div css={ComContent}>
                            <span>카테고리</span>
                            <Dropdown
                                options={options}
                                value={defaultOption}
                                placeholder="Select an option"
                                onChange={(e) => setCategory(e.value)}
                            />
                            {/* <span>혼자 여행</span> */}
                        </div>
                        <div css={ComContent}>
                            <span>여행일</span>
                            <div ref={calendarRef}>
                                <FaRegCalendarAlt
                                    onClick={() => {
                                        setCalendarClick(!iscalendarClick);
                                    }}
                                />
                                {iscalendarClick ? (
                                    <DatePicker
                                        selected={startDate}
                                        dateFormat="yyyy/MM/dd일"
                                        onChange={(date) => setStartDate(date)}
                                        onSelect={(date) => setStartDate(date)}
                                        // customInput={<ExampleCustomInput />}
                                    />
                                ) : null}
                            </div>
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
                            "작성완료!",
                        ]}
                        ftweight="700"
                        ftsize="1.4rem"
                        color="white"
                        onClick={putdate}
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
    align-items: center;
    font-weight: 600;
    padding: 15px;
`;

export default Postform;
