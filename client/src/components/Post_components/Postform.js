import React from "react";
import { useState, useRef, useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import PostformItems from "./PostformItems";
import TitleCard from "../../components/TitleCard";
import Button from "../Button";
import Tag from "./Tag";
import { PALETTE } from "../../Common";

import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { addBtnClickState } from "../../state/atom";

import { Route } from "../../util/UseForm";

import axios from "axios";

const Postform = (props) => {
    const [countList, setCountList] = useState([0]);
    const [isAddBtnClick, setAddBtnClick] = useRecoilState(addBtnClickState);
    const [isDragging, setDragging] = useState(true);

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

    return (
        <>
            <div css={container}>
                <TitleCard />
                <Tag />
                <Route />
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
        </>
    );
};

const container = css`
    width: 90vw;
    border-radius: ${PALETTE.border_radius};
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    margin: 10px auto;
    padding: 20px;
`;

export default Postform;
