import React, { useState } from "react";
import UseForm, { Post, Input } from "../util/UseForm";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { PALETTE } from "../Common";
import { Calendar } from "../util/Calendar";
import { AiOutlineConsoleSql } from "react-icons/ai";

const TitleCard = () => {
    const [category, setCategory] = useState("");
    console.log(category);

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

    return (
        <div
            css={css`
                width: 380px;
                height: 250px;
                border: ${PALETTE.border};
                margin: 10px;
            `}
        >
            <div
                css={css`
                    margin: 20px;
                `}
            >
                <div>
                    <Post placeholder="제목을 입력해주세요." width="340px" />
                </div>
                <div
                    css={css`
                        width: inherit;
                        justify-content: space-between;
                        display: flex;
                        align-items: center;
                        margin: 20px 0;
                    `}
                >
                    <span>카테고리</span>
                    <Dropdown
                        options={options}
                        value={defaultOption}
                        placeholder="Select an option"
                        onChange={(e) => setCategory(e.value)}
                    />
                </div>
                <div
                    css={css`
                        width: inherit;
                        justify-content: space-between;
                        display: flex;
                        align-items: center;
                        margin: 20px 0;
                    `}
                >
                    <span>여행일</span>
                    <div
                        css={css`
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <Calendar />
                    </div>
                </div>
                <div
                    css={css`
                        width: inherit;
                        justify-content: space-between;
                        display: flex;
                        align-items: center;
                        margin: 20px 0;
                    `}
                >
                    <span>총 여행 경비</span>
                    <Post />
                </div>
            </div>
        </div>
    );
};

export default TitleCard;
