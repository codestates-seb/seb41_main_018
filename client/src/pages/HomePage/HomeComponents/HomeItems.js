import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//component
import { PALETTE } from "../../../Common";

//UILibrary
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import Swal from "sweetalert2";

//Recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../state/atom";

//API
import { postHeart } from "../../../util/axiosContents";
import { getUserInfo } from "../../../util/axiosUser";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    width: "380px",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const HomeItems = (props) => {
    const { content } = props;
    const [isFavoriteClcik, setFavoriteClick] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const data = useMemo(() => content, [content]);

    const handleFavoriteClick = () => {
        if (userInfo.userId) {
            postHeart(userInfo.userId, data.contentId).then(() => {
                getUserInfo(userInfo.userId).then((data) => {
                    setUserInfo(data.data);
                    setFavoriteClick(!isFavoriteClcik);
                });
            });
        } else {
            Toast.fire({
                icon: "error",
                title: "로그인이 필요합니다.",
            });
        }
    };

    useEffect(() => {
        if (
            userInfo.userId &&
            userInfo.hearts.find((el) => el.contentId === (data && data.contentId))
        ) {
            setFavoriteClick(true);
        } else {
            setFavoriteClick(false);
        }
    }, [userInfo]);

    return (
        <div css={Container}>
            <div onClick={handleFavoriteClick} css={FavoriteIconWrap}>
                {isFavoriteClcik ? (
                    <FaHeart css={FavoriteIconClick} />
                ) : (
                    <FaRegHeart css={NotFavoriteIconClick} />
                )}
            </div>
            <Link to={`/detail/${data && data.contentId}`}>
                <img src={content.image} css={ImgStyle} />

                <div css={TextWrap}>
                    <div css={TitleStyle}>{data && data.title}</div>

                    <div css={FavoriteTextStyle}>
                        <FaHeart css={FavoriteIconStyle} />
                        {data && data.heartCount}
                    </div>
                </div>
                <div>
                    <ul css={UlStyle}>
                        {data &&
                            data.routes.map((el, index) => (
                                <li key={index} css={LiStyle}>
                                    # {el.place}
                                </li>
                            ))}
                    </ul>
                </div>
                <div css={InfoStyle}>
                    <TbHandClick size="25" />
                    <span>{data.viewCount}</span>
                    <div css={PriceStyle}>
                        {data && `총 경비 : ${data.amount.toLocaleString()}원`}
                    </div>
                </div>
            </Link>
        </div>
    );
};

const Container = css`
    width: 100%;
    height: 100%;
`;

const ImgStyle = css`
    width: 100%;
    width: 100%;
    border-radius: ${PALETTE.border_radius};
    object-fit: cover;
`;

const FavoriteIconWrap = css`
    position: relative;
    text-align: end;
    padding: 0 5px;
    top: 35px;
    font-size: 22px;
`;

const FavoriteIconClick = css`
    color: #ff5675;
`;

const NotFavoriteIconClick = css`
    color: white;
`;

const TextWrap = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const TitleStyle = css`
    font-size: 1rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const FavoriteTextStyle = css`
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    margin: 0 5px;
`;

const FavoriteIconStyle = css`
    margin: 0 7px;
    color: #ff5675;
`;

const UlStyle = css`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 700;
    margin-top: 3px;
    color: ${PALETTE.default_color};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 50px;
`;

const LiStyle = css`
    margin-right: 10px;
    margin-bottom: 10px;
`;

const PriceStyle = css`
    width: 100%;
    text-align: end;
    font-weight: 600;
    font-size: 1rem;
`;

const InfoStyle = css`
    display: flex;
    span {
        margin-left: 0.2rem;
    }
`;

export default HomeItems;
