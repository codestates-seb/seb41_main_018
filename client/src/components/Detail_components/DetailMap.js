import React, { useState, useRef } from "react";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//Kakao Map API
import { MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";
import { PALETTE } from "../../Common";

const DetailMap = (props) => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const [zoomable, setZoomable] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const position = useRef();
    position.current = props.position && props.position.center;
    const data = contentDetail.data;

    const mapZoomBtnClick = (click) => {
        setIsClick(click);
        setZoomable(click);
    };

    return (
        <Map center={position.current} css={MapStyle} level={4} zoomable={zoomable}>
            {data &&
                data.routes.map((position, index) => (
                    <div key={index}>
                        <MapMarker key={position} position={{ lat: position.x, lng: position.y }} />
                        <CustomOverlayMap
                            position={{ lat: position.x, lng: position.y }}
                            yAnchor={1}
                        >
                            <div css={customoverlay}>
                                <span>{position.place}</span>
                            </div>
                        </CustomOverlayMap>
                    </div>
                ))}
            <div css={BtnWrap}>
                <button
                    css={BtnStyle}
                    className={isClick ? "" : "click"}
                    onClick={() => mapZoomBtnClick(false)}
                >
                    지도 확대/축소 끄기
                </button>
                <button
                    css={BtnStyle}
                    className={isClick ? "click" : ""}
                    onClick={() => mapZoomBtnClick(true)}
                >
                    지도 확대/축소 켜기
                </button>
            </div>
        </Map>
    );
};

const MapStyle = css`
    border-radius: 10px;
    width: 90vw;
    height: 300px;
    overflow: hidden;
    margin: 0 auto;

    @media (min-width: 768px) {
        height: 500px;
        margin: 40px auto;
    }
`;

const customoverlay = css`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    width: fit-content;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    color: #000;

    &:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 12px solid #fff;
        border-right: 6px solid transparent;
        border-top: 6px solid #fff;
        border-bottom: 10px solid transparent;
        left: 32px;
        bottom: -12px;
    }
`;
const BtnWrap = css`
    display: flex;
    margin: 10px 0 0 40px;

    @media (min-width: 768px) {
        margin: -30px 0 0 40px;
    }
`;
const BtnStyle = css`
    padding: 5px 10px;
    font-size: 0.725px;
    margin: 0 5px;
    background-color: white;
    border: 1.5px solid ${PALETTE.default_color};
    border-radius: ${PALETTE.border_radius};

    @media (min-width: 768px) {
        margin: 5px;
        font-size: 1rem;
    }

    &.click {
        color: white;
        background-color: ${PALETTE.default_color};
    }
`;
export default DetailMap;
