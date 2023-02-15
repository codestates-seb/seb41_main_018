import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BsFillHeartFill } from "react-icons/bs";

//component
import DetialImg from "../DetailComponents/DetailImg";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../../state/atom";

const DetailformItems = (props) => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const data = contentDetail.data;
    const RouteData = contentDetail.data && contentDetail.data.routes[props.index];

    return (
        <div css={wrap}>
            <Detial_Img />
            <div
                css={css`
                    margin-left: 10px;
                `}
            >
                <BsFillHeartFill css={heartIcon} />
                <span>{`${data && data.heartCount} likes`}</span>
            </div>
            <ul css={ulStyle}>
                <div css={PriceVehicleWrap}>
                    <li>
                        <span>경비</span>
                        <div>{RouteData && RouteData.price.toLocaleString()}</div>
                    </li>
                    <li>
                        <span>이동 수단</span>
                        <div>{RouteData && RouteData.vehicle}</div>
                    </li>
                </div>
                <li>
                    <span>주소</span>
                    <div>{RouteData && RouteData.address}</div>
                </li>
            </ul>
            <div css={Contents}>{RouteData && RouteData.body}</div>
        </div>
    );
};

const wrap = css`
    font-size: 0.9rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        font-size: 1.175rem;
    }
    ul {
        margin: 20px 0;
    }

    li {
        display: flex;
    }

    span {
        font-weight: 600;
        margin: 0 10px;
    }
`;

const Contents = css`
    margin: 10px;
`;

const PriceVehicleWrap = css`
    display: flex;
    margin-bottom: 10px;
`;

const heartIcon = css`
    font-size: 1rem;
    margin-top: 7px;
    color: #ff6d75;
`;

const ulStyle = css`
    @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
    }
`;
export default DetailformItems;
