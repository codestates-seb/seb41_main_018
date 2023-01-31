import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { DummyImg } from "../../assets/image.js";

const MyPostItem = ({ post }) => {
    const { title, createdAt, contentId } = post;
    const randomImg = Math.floor(Math.random() * DummyImg.length);
    return (
        <div css={MyPostItem_Wrap}>
            <div css={PostImg}>
                <img src={DummyImg[randomImg]} />
            </div>
            <div css={MyPostItem_Content}>
                <Link to={`/detail/${contentId}`}>
                    <h3 css={PostTitle}>{title}</h3>
                </Link>

                <div css={MyPostItem_Body}>
                    <div css={Right_Content}>{dayjs(createdAt).format("YY.MM.DD")}</div>
                </div>
            </div>
        </div>
    );
};

const MyPostItem_Wrap = css`
    display: flex;
    align-items: center;
    padding: 21px 8px;
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

    img {
        width: 100%;
        height: 100%;
    }
`;
const MyPostItem_Content = css`
    padding: 5px 20px;
    width: 100%;
    text-align: left;
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
