import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faImage, faThumbsUp, faEye } from "@fortawesome/free-regular-svg-icons";
import "../styles/community.scss";
import Banner from "../asset/community/banner_freeboard.png";
import level_1 from "../asset/level-1-badge.png";
import level_2 from "../asset/level-2-badge.png";
import level_3 from "../asset/level-3-badge.png";
import PaginationComp from "../components/Pagination";
import CustomSelect from "../components/CustomSelect";
import News from "../components/News";
import Search from "../components/Search";
import freeBoard_data from "../data/freeBoard_data.json"

const FreeBoard = () => {
  const [ freeBoardList, setFreeBoardList ] = useState(freeBoard_data);
  const itemsPerPage = 20;
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalItems, setTotalItems ] = useState(freeBoardList.length);
  const [ sortedData, setSortedData ] = useState([]);
  const [ searchedData, setSearchedData ] = useState("");
  const [ selectedCategory, setSelectedCategory ] = useState(null);

  const levelImg = {
    '1': level_1,
    '2': level_2,
    '3': level_3,
  };

  const fetchData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 선택한 카테고리에 따라 데이터 필터링
    const filteredData =
      selectedCategory && selectedCategory.label !== '전체'
        ? freeBoardList.filter((item) => item.category === selectedCategory.label)
        : freeBoardList;

    // 검색 결과에 따라 데이터 필터링
    const searchedFilteredData = searchedData.length > 0
      ? filteredData.filter((item) =>
          (item.title && item.title.toLowerCase().includes(searchedData.toLowerCase())) ||
          (item.content && item.content.toLowerCase().includes(searchedData.toLowerCase()))
        )
      : filteredData;

    // 데이터 정렬
    const sortedFilteredData = searchedFilteredData.sort((a, b) => b.id - a.id);

    // 현재 페이지에 맞게 데이터 추출
    const currentItems = sortedFilteredData.slice(indexOfFirstItem, indexOfLastItem);

    // 필터링된 데이터의 갯수 업데이트
    setTotalItems(sortedFilteredData.length);

    // 데이터 정렬 후 상위 20개 데이터로 업데이트
    setSortedData(currentItems);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory, freeBoardList, searchedData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 검색
  const onSearch = (searchValue) => {
    // 검색된 결과를 상태에 업데이트
    setSearchedData(searchValue);
    setCurrentPage(1);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSearchedData("");
    fetchData();
  };

  const renderingData = [...sortedData];

  console.log(freeBoardList);
  console.log("Rendering Data:", renderingData);

  return(
    <main className="Community">
      <section className="fb-banner bg-point-1 pd">
        <div className="container df jcsb">
          <div className="fb-banner-content">
            <h2 className="tt4 bold white">자유게시판</h2>
            <p className="tt2 bold white mg-t1">경험, 정보, 후기! 무엇이든 자유롭게 공유해보세요!</p>
            <Search onSearch={onSearch} />
          </div>
          <img src={Banner} alt="" />
        </div>
      </section>
  
      <div className="container">
        <div className="df mg-t3">
          <CustomSelect onSelectChange={handleSelectChange} />
          <button className="w-green-btn">
            <FontAwesomeIcon icon={faPencil} /> 글 쓰기
          </button>
        </div>
  
        <table className="mg-t1">
          <thead className="hidden">
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>추천</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            {renderingData.map((item, index) => (
              <tr key={index}>
                <td className="free-td-1">{item.id}</td>
                <td className="free-td-2 green-4">{item.category}</td>
                <td className="free-td-3"><a href="" className="link">{item.title}</a></td>
                <td className="free-td-4">
                  {item.level && (
                    <>
                      <img src={levelImg[item.level]} alt={`Level ${item.level}`} />
                      {item.userId}
                    </>
                  )}
                </td>
                <td className="free-td-5">{item.date}</td>
                <td className="free-td-6">
                  <FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />{item.thumbUp}
                </td>
                <td className="free-td-7">
                  <FontAwesomeIcon icon={faEye} className="mg-r1 gray-3" />{item.view}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <PaginationComp
          currentPage={currentPage}
          totalPageCount={Math.ceil(totalItems / itemsPerPage)}
          handlePageChange={handlePageChange}
        />
      </div>
  
      <div className="container">
        <h2 className="mg-t3 tt5 bold">오늘의 뉴스</h2>
        <News/>
  
      </div>
    </main>
  );

};

export default FreeBoard;