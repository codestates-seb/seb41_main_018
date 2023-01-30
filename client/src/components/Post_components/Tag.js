import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import React from "react";
import { PALETTE } from "../../Common";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { TagsStringState } from "../../state/atom";

const Tag = (props) => {
    const { detailTags } = props;

    const [tagsArr, setTagsArr] = useState([]);
    const [tagsStr, setTagsStr] = useRecoilState(TagsStringState);

    const removeTags = (indexToRemove) => {
        const filter = tagsArr.filter((el, index) => index !== indexToRemove);
        setTagsArr(filter);
        setTagsStr(tagsArr.join());
    };

    const addTags = (event) => {
        event.preventDefault();
        const inputVal = event.target.value;
        if (event.key === "Enter" && inputVal !== "" && !tagsArr.includes(inputVal)) {
            setTagsArr([...tagsArr, inputVal]);
            event.target.value = "";
            setTagsStr(tagsArr.join());
        }
    };



    const defaultTag = () => {
        if(detailTags) {
            setTagsArr(detailTags.split(","))
        }
    }

    useEffect(() => {
        defaultTag()
    }, [detailTags])

    return (
        <>
            <div css={TagsInput}>
                <ul id="tags">
                    {tagsArr.map((tag, index) => (
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
                <input
                        css={css`
                            flex: 1;
                            border: none;
                            height: 46px;
                            font-size: 1rem;
                            padding: 10px;
                            :focus {
                                outline: transparent;
                            }
                        `}
                        type="text"
                        onKeyUp={(e) => {
                            return addTags(e);
                            {
                                /* 키보드의 Enter 키에 의해 addTags 메소드가 실행되어야 합니다. */
                            }
                        }}
                        placeholder="태그를 입력해보세요!"
                    />

            </div>
        </>
    );
};

// {/* <input
// css={css`
//     flex: 1;
//     border: none;
//     height: 46px;
//     font-size: 1rem;
//     padding: 10px;
//     :focus {
//         outline: transparent;
//     }
// `}
// // defaultValue={detailTags ? '' : ''}
// type="text"
// onKeyUp={(e) => {
//     return addTags(e);
//     {
//         /* 키보드의 Enter 키에 의해 addTags 메소드가 실행되어야 합니다. */
//     }
// }}
// placeholder="태그를 입력해보세요!"
// /> */}

const TagsInput = css`
    margin: 40px 10px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    min-height: 48px;
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
