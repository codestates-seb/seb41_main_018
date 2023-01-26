import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import { FaPencilAlt } from "react-icons/fa";
import dayjs from "dayjs";

const MyPostItem = ({ post }) => {
    const { title, createdAt } = post;
    return (
        <div css={MyPostItem_Wrap}>
            <div css={PostImg}>사진</div>
            <div css={MyPostItem_Content}>
                <div css={MyPostItem_Header}>
                    <h3 css={PostTitle}>{title}</h3>
                    <FaPencilAlt size="25" />
                </div>
                <div css={MyPostItem_Body}>
                    <div>경로</div>
                    <div css={Right_Content}>{dayjs(createdAt).format("YY.MM.DD")}</div>
                </div>
            </div>
        </div>
    );
};

const MyPostItem_Wrap = css`
    display: flex;
    align-items: center;
    padding: 8px;
    margin: 10px;
    width: 90%;

    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: ${PALETTE.box_shaodw};
`;
const PostImg = css`
    padding: 20px;
    border: ${PALETTE.border};
    width: 90px;
    height: 90px;
`;
const MyPostItem_Content = css`
    width: 100%;
    padding-left: 15px;
`;

const MyPostItem_Header = css`
    display: flex;
    justify-content: space-between;
    width: 100%;

    h3 {
        width: 75%;
        text-align: left;
    }
`;

const PostTitle = css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    line-height: 2rem;
`;

const MyPostItem_Body = css`
    padding: 5px;
    text-align: left;
`;

const Right_Content = css`
    position: relative;
    text-align: right;
`;

export default MyPostItem;
