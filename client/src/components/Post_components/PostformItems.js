/** @jsxImportSource @emotion/react */
import React from "react";
import { useState, useRef } from "react";
import { PALETTE } from "../../Common";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Map from "../../pages/PostPage/searchMap";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";

import ImgUpload from "./ImgUpload";
import { Post, Input } from "../../util/UseForm";

import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

import { FiPlus } from "react-icons/fi";
import { PostFormIndex } from "../../state/atom";

const defaultValues = {
    title: "",
    body: "",
    themeType: "",
    date: new Date(),
    routeName: "",
    routes: [
        {
            price: Number(),
            vehicle: "",
            place: "",
            body: "",
            x: "",
            y: "",
        },
    ],
};

const PostformItems = (props) => {
    const [isClick, setClick] = useState(true);
    const [data, setData] = useState("");
    const [placeTitle, setPlaceTitle] = useState("");
    const methods = useForm({ defaultValues });
    const { control, handleSubmit, watch } = methods;
    const [index, setIndex] = useRecoilState(PostFormIndex);

    const submit = (data) => {
        // setData(JSON.stringify(data));
        // setPlaceTitle(data.place);
        console.log(props);
    };

    const handleClick = () => {
        setClick(!isClick);
    };

    return (
        // <FormProvider {...methods}>
        <form onChange={handleSubmit(submit)}>
            <div css={isClick ? clickedwrap : wrap}>
                <div
                    css={css`
                        display: flex;
                        justify-content: space-between;
                    `}
                    onClick={handleClick}
                >
                    <div
                        css={css`
                            margin: 0 auto;
                        `}
                    >
                        {String(placeTitle)}
                    </div>
                    {isClick ? <IoMdArrowDropupCircle /> : <IoMdArrowDropdownCircle />}
                </div>
                {isClick ? (
                    <div css={clicked}>
                        <ul>
                            <li css={listStyle}>
                                <div css={ListName}>장소</div>
                                <Input name={`routes[${props.index}].place`} />
                            </li>
                            <li css={listStyle}>
                                <div css={ListName}>경비</div>
                                <Input name={`routes[${props.index}].price`} />
                            </li>
                            <li css={listStyle}>
                                <div css={ListName}>이동 수단</div>
                                <Input name={`routes[${props.index}].vehicle`} />
                            </li>
                            <li css={listStyle}>
                                <div css={ListName}>상세 설명</div>
                                <Input name={`routes[${props.index}].body`} />
                            </li>
                            <li>
                                <ImgUpload />
                            </li>
                            <div
                                css={css`
                                    display: flex;
                                    justify-content: end;
                                `}
                            >
                                <button type="button" css={addBtnStyle} onClick={props.onClick[0]}>
                                    <FiPlus />
                                    Add to Route
                                </button>
                                <button type="button" onClick={props.onClick[1]} css={delBtnStyle}>
                                    delete
                                </button>
                            </div>
                        </ul>
                    </div>
                ) : null}
            </div>
        </form>
        // </FormProvider>
    );
};
const wrap = css`
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    width: 370px;
    padding: 10px;
`;

const clickedwrap = css`
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    width: 370px;
    padding: 10px;
`;
const clicked = css`
    margin: 5px auto;
    text-align: start;
    animation: identifier 0.5s ease-in-out;

    @keyframes identifier {
        0% {
            max-height: 0px;
            opacity: 0;
        }
        100% {
            max-height: 300px;
            opacity: 1;
        }
    }
    li {
        margin: 30px 0;
        animation: fadein 1s ease-in-out;
        @keyframes fadein {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }
`;

const ListName = css`
    border-radius: ${PALETTE.border_round};
    background-color: #eff5f5;
    color: #497174;
    padding: 7px;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    margin: 10px;
    width: fit-content;
`;

const listStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const addBtnStyle = css`
    display: flex;
    align-self: center;
    padding: 10px;
    margin: 5px;
    border: 1px solid ${PALETTE.default_color};
    background-color: ${PALETTE.default_color};
    box-shadow: ${PALETTE.box_shadow};
    color: white;
    border-radius: 100px;
    width: fit-content;
    font-size: 0.8rem;
    &:hover {
        cursor: pointer;
    }
`;

const delBtnStyle = css`
    display: flex;
    justify-content: center;
    padding: 10px;
    margin: 5px;
    color: white;
    font-size: 0.8rem;
    width: 100px;
    border: 1px solid ${PALETTE.default_color};
    background-color: ${PALETTE.default_color};
    border-radius: 100px;
    box-shadow: ${PALETTE.box_shadow};
    &:hover {
        cursor: pointer;
    }
`;
export default PostformItems;
