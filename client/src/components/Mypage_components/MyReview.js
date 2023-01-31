import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import dayjs from "dayjs";
import { userInfoState } from "../../state/atom";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { DummyImg } from "../../assets/image.js";

const MyReview = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const randomImg = Math.floor(Math.random() * DummyImg.length);

    return (
        <div css={MyReview_Wrap}>
            {userInfo.comments.map((review) => (
                <div css={MyReview_Item} key={review.reviewId}>
                    <div css={PostImg}>
                        <img src={DummyImg[randomImg]} />
                    </div>
                    <div css={MyReview_Content}>
                        <Link to={`/detail/${review.contentId}`}>
                            <h3 css={PostTitle}>{review.title}</h3>
                        </Link>
                        <div>{review.body}</div>
                        <div css={Right_Content}>{dayjs(review.createdAt).format("YY.MM.DD")}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MyReview_Wrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const MyReview_Item = css`
    display: flex;
    align-items: center;
    padding: 8px;
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

const MyReview_Content = css`
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

const Right_Content = css`
    position: relative;
    text-align: right;
`;

export default MyReview;
