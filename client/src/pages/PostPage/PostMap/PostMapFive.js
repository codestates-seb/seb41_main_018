import React, { useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const PostMapFive = (props) => {
    const { index, setValue } = props;

    let xposition = "";
    let yposition = "";

    const { kakao } = window;

    function searchMap(keyword) {
        // 마커를 담을 배열입니다
        var markers = [];

        var mapContainer = document.getElementById("map5");
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
            var el = document.createElement("li5"),
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
            var paginationEl = document.getElementById("pagination5");
            var fragment = document.createDocumentFragment();
            var i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement("a5");
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
            var listEl = document.getElementById("placesList5"),
                menuEl = document.getElementById("menu_wrap5"),
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
            <div id="menu_wrap5">
                <ul id="placesList5"></ul>
                <div id="pagination5"></div>
            </div>
            <div id="map5"></div>
        </div>
    );
};

const SearchMap = css`
    display: flex;

    #map5 {
        display: none;
        width: 85vw;
        height: 70vh;
        overflow: hidden;
        border-radius: 10px;
        @media (min-width: 768px) {
            width: 40vw;
            margin-top: 30px;
            margin-left: -100px;
        }
    }

    #menu_wrap5 {
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
            margin-left: -90px;
            margin-top: 45px;
        }
    }

    #map_title5 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 10px;
    }

    #keyword5 {
        width: 70%;
        outline: none;
    }

    #submit_btn5 {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ff6e30;
        border: none;
        outline: none;
    }

    #placesList5 h5 {
        color: #ff6e30;
    }

    #placesList5 li {
        list-style: square;
    }
    #placesList5 .item {
        border-bottom: 1px solid #888;
        overflow: hidden;
        cursor: pointer;
    }

    #placesList5 .item .info {
        padding: 10px 0 10px 5px;
    }

    #placesList5 .item span {
        display: block;
        margin-top: 4px;
    }
    #placesList5 .info .gray {
        color: #8a8a8a;
    }

    #placesList5 .info .tel {
        color: #009900;
    }

    #pagination5 {
        margin: 10px auto;
        text-align: center;
    }
    #pagination5 a {
        display: inline-block;
        margin-right: 10px;
        color: #7b7b7b;
    }
    #pagination5 .on {
        font-weight: bold;
        cursor: default;
        color: #ff6e30;
    }
`;

export default PostMapFive;
