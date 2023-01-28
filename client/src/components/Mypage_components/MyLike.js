import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import dayjs from "dayjs";
import { userInfoState } from "../../state/atom";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

const MyLike = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    return (
        <div css={MyLike_Wrap}>
            {userInfo.hearts.map((hearts) => (
                <div css={MyLike_Item} key={hearts.contentId}>
                    <div css={PostImg}>사진</div>
                    <div css={MyLike_Content}>
                        <Link to={`/detail/${hearts.contentId}`}>
                            <h3 css={PostTitle}>{hearts.title}</h3>
                        </Link>
                        <div>경로</div>
                        <div css={Right_Content}>{dayjs(hearts.createdAt).format("YY.MM.DD")}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MyLike_Wrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const MyLike_Item = css`
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

const MyLike_Content = css`
    padding: 20px;
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

export default MyLike;
