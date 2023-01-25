import React, { useState, useEffect } from "react";
import UseForm, { Post, Input } from "../util/UseForm";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { PALETTE } from "../Common";
import { Calendar } from "../util/Calendar";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { CategoryData, PostFormData, TitleData, DateData } from "../state/atom";

const TitleCard = () => {
    const [category, setCategory] = useRecoilState(CategoryData);
    const [postFormData, setPostFormData] = useRecoilState(PostFormData);
    const [title, setTitle] = useRecoilState(TitleData);
    const [Date, setDate] = useRecoilState(DateData);

    const options = [
        "국내여행",
        "해외여행",
        "가족여행",
        "커플여행",
        "친구여행",
        "혼자여행",
        "카페투어",
        "맛집투어",
    ];
    const defaultOption = options[0];

    const getCategroy = (e) => {
        if (e.value === "국내여행") {
            return setCategory("DOMESTIC");
        } else if (e.value === "해외여행") {
            return setCategory("ABROAD");
        } else if (e.value === "가족여행") {
            return setCategory("FAMILY");
        } else if (e.value === "커플여행") {
            return setCategory("COUPLE");
        } else if (e.value === "친구여행") {
            return setCategory("FRIENDS");
        } else if (e.value === "혼자여행") {
            return setCategory("ALONE");
        } else if (e.value === "카페투어") {
            return setCategory("CAFE");
        } else if (e.value === "맛집투어") {
            return setCategory("FOOD");
        }
    };

    const getTitle = (e) => {
        console.log(e);
    };

    useEffect(() => {
        let tmp = { ...postFormData };
        tmp.themeType = category;
        setPostFormData(tmp);
    }, [category]);

    /*  useEffect(() => {
        let tmp = { ...postFormData };
        console.log(`tmp:`, tmp);
        tmp.title = title;
        setPostFormData(tmp);
        console.log(postFormData);
    }, [title]); */
    /* 
    useEffect(() => {
        let tmp = { ...postFormData };
        console.log(`tmp:`, tmp);
        tmp.themeType = category;
        setPostFormData(tmp);
        console.log(postFormData);
    }, [category]); */

    return (
        <div css={wrap}>
            <div
                css={css`
                    margin: 20px;
                `}
            >
                <div>
                    <Post placeholder="제목을 입력해주세요." width="340px" onChange={getTitle} />
                </div>
                <div css={ComContainer}>
                    <span>카테고리</span>
                    <Dropdown
                        options={options}
                        value={defaultOption}
                        placeholder="Select an option"
                        onChange={getCategroy}
                    />
                </div>
                <div css={ComContainer}>
                    <span>여행일</span>
                    <div
                        css={css`
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <Calendar onChange={getDate} />
                    </div>
                </div>
                <div css={ComContainer}>
                    <span>총 여행 경비</span>
                    <Post placeholder="얼마를 사용하셨나요?" width="80px" />
                </div>
            </div>
        </div>
    );
};

const wrap = css`
    width: 370px;
    height: 250px;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    margin: 10px 0;
`;

const ComContainer = css`
    width: inherit;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin: 20px 0;
`;

export default TitleCard;
