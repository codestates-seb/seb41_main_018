import React, { useEffect, useState } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DetailMap = () => {
    const [xpo, setXpo] = useState(37.365264512305174);
    const [ypo, setYpo] = useState(127.10676860117488);
    const [dpo, setDpo] = useState("이태원");

    const { kakao } = window;
    useEffect(() => {
        const container = document.getElementById("map");

        const options = {
            center: new kakao.maps.LatLng(xpo, ypo),
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        //위도, 경도로 변환 및 마커표시
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(dpo, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(xpo, ypo);

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                });

                var iwContent = `<div style="padding:5px;">${dpo}<br>
                                <a href="https://map.kakao.com/link/map/${dpo},${xpo},${ypo}" style="color:blue" target="_blank">큰지도보기</a>
                                <a href="https://map.kakao.com/link/to/${dpo},${xpo},${ypo}" style="color:blue" target="_blank">길찾기</a></div>`;
                // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: iwContent,
                });
                infowindow.open(map, marker);

                map.setCenter(coords);
            }
        });
    });

    return (
        <div css={Map}>
            <div id="map"></div>
        </div>
    );
};

const Map = css`
    #map {
        border-radius: 10px;
        width: 90vw;
        height: 300px;
        overflow: hidden;
        margin: 0 auto;
        @media (min-width: 768px) {
            /* width: 370px;
            position: relative;
            bottom: 320px;
            right: 640px; */
            height: 500px;
            margin: 40px auto;
        }
    }
`;

export default DetailMap;
