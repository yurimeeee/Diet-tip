import React, { useEffect, useState } from "react";
import "../styles/meal.css";
import TitleBanner from "../components/TitleBanner";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
// import "./styles.css";

import image1 from "../asset/meal/season_1.png";
import image2 from "../asset/meal/season_2.png";
import image3 from "../asset/meal/season_3.png";

const seasonList = [
  {
    name: "우엉",
    nutrient: "비타민·미네랄",
    img: image1,
    imgDesc: "겨울 제철 채소 - 우엉",
    desc: "겨울 뿌리채소의 대표 주자 중 하나인 우엉 역시 건강에 좋은 웰빙식품으로 큰 인기를 끌고 있습니다. 채소가 자라기 힘든 겨울에 우엉은 양질의 비타민·미네랄을 공급해주는...",
  },
  {
    name: "귤",
    nutrient: "비타민C",
    img: image2,
    imgDesc: "겨울 제철 과일 - 귤",
    desc: "귤은 ‘겨울’하면 가장 먼저 떠오르는 과일 중 하나로, 추운 날 먹는 대표 간식 중 하나다. 귤은 각종 비타민과 무기염류, 섬유질이 풍부해 건강 유지와 질병 예방에 좋은 과일로 알려져 있습니다...",
  },
  {
    name: "대하",
    nutrient: "비타민·미네랄",
    img: image3,
    imgDesc: "오메가-3 지방산",
    desc: "대하는 콜레스테롤 수치를 억제하는 타우린이 풍부합니다. 간기능 회복시켜주고 간의 해독작용을 돕습니다. 또한 알코올로 인한 장애를 개선하는 효과도 있으며 혈관계 질환을 예방하고...",
  },
];

const Calories = () => {
  const [rowdata, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  // console.log("response:");
  useEffect(() => {
    // fc61d1b656c44d8ebab1
    const apiKey = "fc61d1b656c44d8ebab1";
    // API 주소
    const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/${apiKey}/I2790/json/1/50`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `서버 응답이 올바르지 않습니다. 상태 코드: ${response.status}`
          );
        }
        const data = await response.json();
        console.log("data", data.I2790.row);
        // console.log("API 데이터:", data.I2790.row);
        // setRowData(data.I2790.row);
        // const descKorArray = data.I2790.row.map((item) => item.DESC_KOR);
        // console.log(descKorArray);
        const extractedData = data.I2790.row.map((item) => {
          return {
            DESC_ENG: item.DESC_ENG,
            SERVING_SIZE: item.SERVING_SIZE,
            NUTR_CONT1: item.NUTR_CONT1,
            // 원하는 필드들을 추가로 포함시키세요.
          };
        });

        setRowData(extractedData);
        console.log("rowdata", rowdata);
      } catch (error) {
        console.error("API 호출 중 오류:", error);
      }
    };

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  // 전체 데이터에서 현재 페이지에 해당하는 데이터만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowdata.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <TitleBanner />
      <div className="search-bar">
        <form>
          <input type="text" placeholder="검색어를 입력해주세요." />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M14.6777 12.9299C15.6661 11.5841 16.25 9.92275 16.25 8.125C16.25 3.63769 12.6123 0 8.125 0C3.63769 0 0 3.63769 0 8.125C0 12.6123 3.63769 16.25 8.125 16.25C9.92323 16.25 11.585 15.6658 12.9309 14.6769L12.9299 14.6777C12.9667 14.7277 13.0078 14.7756 13.053 14.8208L17.8661 19.6339C18.3543 20.122 19.1457 20.122 19.6339 19.6339C20.122 19.1457 20.122 18.3543 19.6339 17.8661L14.8208 13.053C14.7756 13.0078 14.7277 12.9667 14.6777 12.9299ZM15 8.125C15 11.922 11.922 15 8.125 15C4.32804 15 1.25 11.922 1.25 8.125C1.25 4.32804 4.32804 1.25 8.125 1.25C11.922 1.25 15 4.32804 15 8.125Z"
                fill="#32A061"
              />
            </svg>
          </button>
        </form>
      </div>
      <table className="calories-table">
        <thead className="sm-radius">
          <tr className="sm-radius">
            <th scope="col">#</th>
            <th scope="col">음식명</th>
            <th scope="col">단위</th>
            <th scope="col">칼로리</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentItems.map((item, index) => ( */}
          {rowdata.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>{item.DESC_KOR}</td>
              <td>
                {item.SERVING_SIZE}
                {item.SERVING_UNIT}
              </td>
              <td>{item.NUTR_CONT1}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="pagination">
        <ul className="pagination">
          <li className="page-item first-page">맨앞</li>
          {Array.from({ length: Math.ceil(rowdata.length / itemsPerPage) }).map(
            (item, index) => (
              <li
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={
                  currentPage === index + 1 ? "active page-item" : "page-item"
                }
              >
                {index + 1}
              </li>
            )
          )}
          <li className="page-item last-page">맨뒤</li>
        </ul>
      </nav>
      {/* 페이지네이션 추가 */}
      <div className="pagination-container">
        {Array.from({ length: Math.ceil(rowdata.length / itemsPerPage) }).map(
          (item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <div className="recom-list bg-white web-shadow container md-radius df jcsb">
        <div>
          <h3 className="point-1">올 겨울 먹킷리스트</h3>
          <p className="gray-3">겨울에 꼭 먹어야 할 제철 음식 BEST 10!</p>
          <button className="w-green-btn">자세히 보기</button>
        </div>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {seasonList.map((list, index) => (
              <SwiperSlide key={index}>
                <div className="recom-wrap">
                  <img src={list.img} alt={list.imgDesc} />
                  <div className="recom-desc">{list.desc}</div>
                </div>
                <span className="recom-name">{list.name}</span>
                <span>{list.nutrient}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default Calories;
