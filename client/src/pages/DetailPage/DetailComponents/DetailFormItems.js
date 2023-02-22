import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BsFillHeartFill } from "react-icons/bs";

//component
import DetialImg from "../DetailComponents/DetailImg";

//recoil
import { useRecoilValue } from "recoil";
import { ContentDetail } from "../../../state/atom";

const DetailformItems = (props) => {
    const contentDetail = useRecoilValue(ContentDetail);
    const data = contentDetail.data;
    const routeData = contentDetail.data && contentDetail.data.routes[props.index];

    return (
        <div css={Wrap}>
            <DetialImg />
            <div css={LikePosition}>
                <BsFillHeartFill css={HeartIcon} />
                <span>{`${data && data.heartCount} likes`}</span>
            </div>
            <ul css={UlStyle}>
                <div css={PriceVehicleWrap}>
                    <li>
                        <span>경비</span>
                        <div>{routeData && routeData.price.toLocaleString()}</div>
                    </li>
                    <li>
                        <span>이동 수단</span>
                        <div>{routeData && routeData.vehicle}</div>
                    </li>
                </div>
                <li>
                    <span>주소</span>
                    <div>{routeData && routeData.address}</div>
                </li>
            </ul>
            <div css={Contents}>{routeData && routeData.body}</div>
        </div>
    );
};

const Wrap = css`
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

const LikePosition = css`
    margin-left: 10px;
`;

const Contents = css`
    margin: 10px;
`;

const PriceVehicleWrap = css`
    display: flex;
    margin-bottom: 10px;
`;

const HeartIcon = css`
    font-size: 1rem;
    margin-top: 7px;
    color: #ff6d75;
`;

const UlStyle = css`
    @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
    }
`;
export default DetailformItems;
