import react, { useEffect, useState } from "react";

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
import { ContentDetail, GetPosition } from "../../state/atom";

const routes = [
    {
        place: "아르떼 뮤지엄",
        x: 33.39669867756354,
        y: 126.34501061612566,
    },
    {
        place: "금오름",
        x: 33.354052786802654,
        y: 126.30773703851709,
    },
];

const DetailMap = () => {
    const [contentDetail, setContentDetail] = useRecoilState(ContentDetail);
    const [position, setPosition] = useRecoilState(GetPosition);
    const data = contentDetail.data;
    const RouteData = data && data.routes;
    const [path, setPath] = useState([]);

    console.log(RouteData);

    //polyLine 좌표 따는 함수 (보류)
    // useEffect(() => {
    //     routes.map((el, index) => {
    //         let position = { lat: el.x, lng: el.y };
    //         setPath([...path, position]);
    //     });
    // }, []);
    //

    const b = {
        lat: contentDetail && contentDetail.data && contentDetail.data.routes[0].x,
        lng: contentDetail && contentDetail.data && contentDetail.data.routes[0].y,
    };
    const a = {
        lat: 36,
        lng: 127.152557091072,
    };

    console.log(b);

    return (
        //하드 코딩 데이터 출력용
        <Map center={a} css={MapStyle} level={13}>
            {data &&
                data.routes.map((position, index) => (
                    <div key={index}>
                        <MapMarker key={position} position={{ lat: position.x, lng: position.y }} />
                        <CustomOverlayMap
                            position={{ lat: position.x, lng: position.y }}
                            yAnchor={1}
                        >
                            <div css={customoverlay}>
                                <span css={title}>{position.place}</span>
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

const title = css``;
export default DetailMap;
