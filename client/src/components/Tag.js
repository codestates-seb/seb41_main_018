import { useState } from "react";
/** @jsxImportSource @emotion/react */
import React from "react";
import { PALETTE } from "../Common";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";

const Tag = () => {
    const initialTags = ["CodeStates", "kimcoding"];

    const [tags, setTags] = useState(initialTags);
    const removeTags = (indexToRemove) => {
        const filter = tags.filter((el, index) => index !== indexToRemove);
        setTags(filter);
    };

    const addTags = (event) => {
        const inputVal = event.target.value;
        if (event.key === "Enter" && inputVal !== "" && !tags.includes(inputVal)) {
            setTags([...tags, inputVal]);
            event.target.value = "";
        }
    };

    return (
        <>
            <div css={TagsInput}>
                <ul id="tags">
                    {tags.map((tag, index) => (
                        <li key={index}>
                            <span css={tagStyle}>
                                {tag}
                                <AiOutlineClose
                                    onClick={() => removeTags(index)}
                                    css={css`
                                        position: relative;
                                        top: 3px;
                                        left: 1px;
                                    `}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
const TagsInput = css`
    margin: 1rem auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    min-height: 48px;
    width: 27vw;
    border-radius: 6px;

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 8px 0 0 0;

        li {
            width: auto;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: black;
            padding: 0 8px;
            font-size: 14px;
            list-style: none;
            border-radius: 6px;
            margin: 0 8px 8px 0;
            background: var(--coz-purple-600);
        }
    }
`;

const tagStyle = css`
    display: block;
    width: auto;
    height: auto;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    padding: 5px;
    color: #497174;
    border-radius: ${PALETTE.border_radius};
    background-color: #eff5f5;
    cursor: pointer;
`;
export default Tag;
