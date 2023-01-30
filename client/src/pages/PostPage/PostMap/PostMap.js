import React, { useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const PostMap = (props) => {
    const { index, setValue } = props;

    let xposition = "";
    let yposition = "";

    const { kakao } = window;

    function searchMap(keyword) {
        // 마커를 담을 배열입니다
        var markers = [];

        var mapContainer = document.getElementById("map");
        var mapOptions = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 4,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        console.log("loading kakaomap");

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        var geocoder = new kakao.maps.services.Geocoder();

        var callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // console.log(result[0])
                setValue(`routes.${index}.address`, result[0].address.address_name);
                setValue(`routes.${index}.x`, yposition);
                setValue(`routes.${index}.y`, xposition);
            }
        };

        geocoder.coord2Address(xposition, yposition, callback);

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {
            var el = document.createElement("li"),
                itemStr =
                    '<span class="markerbg marker_' +
                    (index + 1) +
                    '"></span>' +
                    '<div class="info">' +
                    "   <h5>" +
                    places.place_name +
                    "</h5>";

            // setDpo(places.address_name[0]);

            if (places.road_address_name) {
                itemStr +=
                    "    <span>" +
                    places.road_address_name +
                    "</span>" +
                    '   <span class="jibun gray">' +
                    places.address_name +
                    "</span>";
            } else {
                itemStr += "    <span>" + places.address_name + "</span>";
            }

            itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

            el.innerHTML = itemStr;
            el.className = "item";

            return el;
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            var imageSrc =
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
                imgOptions = {
                    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage,
                });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker); // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            var paginationEl = document.getElementById("pagination");
            var fragment = document.createDocumentFragment();
            var i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement("a");
                el.href = "#";
                el.innerHTML = i;

                if (i === pagination.current) {
                    el.className = "on";
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        };
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {
            var listEl = document.getElementById("placesList"),
                menuEl = document.getElementById("menu_wrap"),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = "";

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for (var i = 0; i < places.length; i++) {
                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i),
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);
                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function (marker, title) {
                    kakao.maps.event.addListener(marker, "mouseover", function () {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, "mouseout", function () {
                        infowindow.close();
                    });

                    itemEl.onmouseover = function () {
                        displayInfowindow(marker, title);
                        ps.keywordSearch(title, listSearchCB);
                    };

                    /////
                    itemEl.onmousedown = function () {
                        setValue(`routes.${index}.place`, title);
                        // console.log(title)
                        geocoder.coord2Address(xposition, yposition, callback);
                    };
                    /////

                    itemEl.onmouseout = function () {
                        infowindow.close();
                    };
                })(marker, places[i].place_name);

                fragment.appendChild(itemEl);
            }

            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);

                // 페이지 번호를 표출합니다
                displayPagination(pagination);
                console.log(data);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                // alert('검색 결과가 존재하지 않습니다.');
                return;
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
                return;
            }
        }

        function listSearchCB(data, status) {
            if (status === kakao.maps.services.Status.OK) {
                xposition = data[0].x;
                yposition = data[0].y;
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                // alert('검색 결과가 존재하지 않습니다.');
                return;
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
                return;
            }
        }

        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces() {
            // if (!keyword.replace(/^\s+|\s+$/g, '')) {
            //     return;
            // }

            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword, placesSearchCB);
        }

        // 키워드로 장소를 검색합니다
        searchPlaces();
    }

    useEffect(() => {
        searchMap(props.placeword);
    }, [props.placeword]);

    return (
        <div css={SearchMap}>
            <div id="menu_wrap">
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
            <div id="map"></div>
        </div>
    );
};

const SearchMap = css`
    display: flex;
    flex-direction: column;

    #map {
        display: none;
        width: 85vw;
        height: 510px;
        overflow: hidden;
        border-radius: 10px;
        @media (min-width: 768px) {
            flex-direction: row;
            position: absolute;
            left: 5vw;
            display: inline-block;
            width: 40vw;
            margin: auto 20px;
        }
        @media (min-width: 1200px) {
            flex-direction: row;
            position: absolute;
            left: 5vw;
            display: inline-block;
            width: 50vw;
            margin: auto 20px;
        }
    }

    #menu_wrap {
        position: relative;
        width: 85vw;
        height: 100%;
        max-height: 300px;
        margin: -20px auto 0;
        padding: 5px;
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.9);
        z-index: 2;
        font-size: 1rem;
        border-radius: 10px;

        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */

        ::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
        @media (min-width: 768px) {
            position: relative;
            width: 38vw;
            height: 100%;
            max-height: 220px;
            margin: 0 auto;
            font-size: 0.875rem;
            right: 23vw;
            top: 260px;
        }
        @media (min-width: 1200px) {
            position: relative;
            width: 15vw;
            height: 100%;
            min-width: 240px;
            max-height: 480px;
            right: 4vw;
            top: 10px;

            font-size: 0.875rem;
        }
    }

    #map_title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 10px;
    }

    #keyword {
        width: 70%;
        outline: none;
    }

    #submit_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ff6e30;
        border: none;
        outline: none;
    }

    #placesList h5 {
        color: #ff6e30;
    }

    #placesList li {
        list-style: square;
    }
    #placesList .item {
        border-bottom: 1px solid #888;
        overflow: hidden;
        cursor: pointer;
    }

    #placesList .item .info {
        padding: 10px 0 10px 5px;
    }

    #placesList .item span {
        display: block;
        margin-top: 4px;
    }
    #placesList .info .gray {
        color: #8a8a8a;
    }

    #placesList .info .tel {
        color: #009900;
    }

    #pagination {
        margin: 10px auto;
        text-align: center;
    }
    #pagination a {
        display: inline-block;
        margin-right: 10px;
        color: #7b7b7b;
    }
    #pagination .on {
        font-weight: bold;
        cursor: default;
        color: #ff6e30;
    }
`;

export default PostMap;
