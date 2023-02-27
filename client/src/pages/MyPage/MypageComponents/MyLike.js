import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";

import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../state/atom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { SampleImgSrc } from "../../../sampleImage";

const MyLike = () => {
    const GachiArr = Object.values(SampleImgSrc);

    const userInfo = useRecoilValue(userInfoState);
    const randomImg = Math.floor(Math.random() * GachiArr.length);
    return (
        <div css={MyLikeWrap}>
            {userInfo.hearts.map((el) => (
                <div css={MyLikeItem} key={el.contentId}>
                    <div css={PostImg}>
                        <img src={GachiArr[randomImg]} />
                    </div>
                    <div css={MyLikeContent}>
                        <Link to={`/detail/${el.contentId}`}>
                            <h3 css={PostTitle}>{el.title}</h3>
                        </Link>
                        <div css={RightContent}>{dayjs(el.createdAt).format("YY.MM.DD")}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MyLikeWrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const MyLikeItem = css`
    display: flex;
    align-items: center;
    padding: 21px 8px;
    margin: 10px;
    width: 90%;

    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: ${PALETTE.box_shadow};
`;
const PostImg = css`
    border: ${PALETTE.border};
    width: 90px;
    height: 84px;
    img {
        width: 100%;
        height: 100%;
    }
`;

const MyLikeContent = css`
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

const RightContent = css`
    position: relative;
    text-align: right;
`;

export default MyLike;
