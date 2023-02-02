import react, { useEffect, useState, useRef } from "react";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//mui (삭제)
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

//Kakao Map API
import { MapMarker, Map, CustomOverlayMap, Polyline, Polygon } from "react-kakao-maps-sdk";

//recoil
import { useRecoilState } from "recoil";
import { ContentDetail } from "../../state/atom";
import { PALETTE } from "../../Common";

const DetailMap = (props) => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const data = contentDetail.data;
    const RouteData = data && data.routes;
    const [zoomable, setZoomable] = useState(false);
    const [path, setPath] = useState([]);
    const [isClick, setIsClick] = useState(false);

    // const center = useRef();
    // center.current = props.position;
    console.log(props.position && props.position.center);


    const mapZoomBtnClick = (click) => {
        setIsClick(click);
        setZoomable(click);
    };


    return (
        //하드 코딩 데이터 출력용
        <Map center={props.position} css={MapStyle} level={4} zoomable={zoomable}>
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

                        {/* <Polyline
                            path={[path]}
                            strokeWeight={5} // 선의 두께 입니다
                            strokeColor={"#FFAE00"} // 선의 색깔입니다
                            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                        /> */}
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
        // 사용할 것
        // <Map center={a} css={MapStyle} level={3}>
        //     {RouteData &&
        //         RouteData.map((position, index) => (
        //             <div key={index}>
        //                 <MapMarker key={index} position={{ lat: position.x, lng: position.y }} />
        //                 <CustomOverlayMap
        //                     position={{ lat: position.x, lng: position.y }}
        //                     yAnchor={1}
        //                 >
        //                     <div css={customoverlay}>
        //                         <span css={title}>{position.place}</span>
        //                     </div>
        //                 </CustomOverlayMap>

        //                 {/* <Polyline
        //                     path={[path]}
        //                     strokeWeight={5} // 선의 두께 입니다
        //                     strokeColor={"#FFAE00"} // 선의 색깔입니다
        //                     strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //                     strokeStyle={"solid"} // 선의 스타일입니다
        //                 /> */}
        //             </div>
        //         ))}
        // </Map>
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
