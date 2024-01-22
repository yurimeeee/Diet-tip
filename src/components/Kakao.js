// import React, { useState, useEffect } from "react";

// const { kakao } = window;
// var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

// function Kakao() {
//   const [value, setValue] = useState("");
//   const [kmap, setKmap] = useState("");

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };
//   const handleClick = (e) => {
//     e.preventDefault();
//     var itv = 0.005;
//     var sw = new kakao.maps.LatLng(37.5455744 - itv, 126.8318208 - itv),
//       ne = new kakao.maps.LatLng(37.5455744 + itv, 126.8318208 + itv);
//     var bo = new kakao.maps.LatLngBounds(sw, ne);

//     // 장소 검색 객체를 생성합니다
//     var ps = new kakao.maps.services.Places();
//     // // 키워드로 장소를 검색합니다
//     ps.keywordSearch(value, placesSearchCB, { bounds: bo });
//   };

//   // 키워드 검색 완료 시 호출되는 콜백함수 입니다
//   function placesSearchCB(data, status, pagination) {
//     if (status === kakao.maps.services.Status.OK) {
//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//       // LatLngBounds 객체에 좌표를 추가합니다
//       var bounds = new kakao.maps.LatLngBounds();

//       for (var i = 0; i < data.length; i++) {
//         displayMarker(data[i]);
//         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//       }

//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//       kmap.setBounds(bounds);
//     }
//   }

//   // 지도에 마커를 표시하는 함수입니다
//   function displayMarker(place) {
//     // 마커를 생성하고 지도에 표시합니다
//     var marker = new kakao.maps.Marker({
//       map: kmap,
//       position: new kakao.maps.LatLng(place.y, place.x),
//     });

//     // 마커에 클릭이벤트를 등록합니다
//     kakao.maps.event.addListener(marker, "click", function () {
//       // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//       infowindow.setContent(
//         '<div style="padding:5px;font-size:12px;">' +
//           place.place_name +
//           "</div>"
//       );
//       infowindow.open(kmap, marker);
//     });
//   }

//   useEffect(() => {
//     //useEffect는 처음 render됐을 때 한 번 실행하고 다시 실행되지 않을 곳에 사용
//     const container = document.getElementById("map");
//     const options = {
//       center: new kakao.maps.LatLng(33.450701, 126.570667),
//       level: 3,
//     };

//     const map = new kakao.maps.Map(container, options);
//     setKmap(map);

//     if (navigator.geolocation) {
//       // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//       navigator.geolocation.getCurrentPosition(function (position) {
//         var lat = position.coords.latitude, // 위도
//           lon = position.coords.longitude; // 경도

//         var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
//           message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다

//         // 마커와 인포윈도우를 표시합니다
//         displayMarker(locPosition, message);
//       });
//     } else {
//       // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

//       var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
//         message = "geolocation을 사용할수 없어요..";

//       displayMarker(locPosition, message);
//     }

//     // 지도에 마커와 인포윈도우를 표시하는 함수입니다
//     function displayMarker(locPosition, message) {
//       // 마커를 생성합니다
//       var marker = new kakao.maps.Marker({
//         map: map,
//         position: locPosition,
//       });

//       var iwContent = message, // 인포윈도우에 표시할 내용
//         iwRemoveable = true;

//       // 인포윈도우를 생성합니다
//       var infowindow = new kakao.maps.InfoWindow({
//         content: iwContent,
//         removable: iwRemoveable,
//         zIndex: 1,
//       });

//       // // 인포윈도우를 마커위에 표시합니다
//       infowindow.open(map, marker);

//       // // 지도 중심좌표를 접속위치로 변경합니다
//       map.setCenter(locPosition);
//     }
//   }, []);

//   return (
//     <>
//       <form>
//         <input
//           type="text"
//           placeholder="검색어를 입력하세요"
//           name="search"
//           value={value}
//           onChange={handleChange}
//         />
//         <button onClick={handleClick}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="25"
//             height="25"
//             viewBox="0 0 20 20"
//             fill="none"
//           >
//             <path
//               d="M14.6777 12.9299C15.6661 11.5841 16.25 9.92275 16.25 8.125C16.25 3.63769 12.6123 0 8.125 0C3.63769 0 0 3.63769 0 8.125C0 12.6123 3.63769 16.25 8.125 16.25C9.92323 16.25 11.585 15.6658 12.9309 14.6769L12.9299 14.6777C12.9667 14.7277 13.0078 14.7756 13.053 14.8208L17.8661 19.6339C18.3543 20.122 19.1457 20.122 19.6339 19.6339C20.122 19.1457 20.122 18.3543 19.6339 17.8661L14.8208 13.053C14.7756 13.0078 14.7277 12.9667 14.6777 12.9299ZM15 8.125C15 11.922 11.922 15 8.125 15C4.32804 15 1.25 11.922 1.25 8.125C1.25 4.32804 4.32804 1.25 8.125 1.25C11.922 1.25 15 4.32804 15 8.125Z"
//               fill="#32A061"
//             />
//           </svg>
//         </button>
//       </form>
//       <div
//         id="map"
//         className="web-shadow"
//       ></div>
//     </>
//   );
// }

// export default Kakao;
