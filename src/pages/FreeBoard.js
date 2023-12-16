import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faImage, faThumbsUp, faEye } from "@fortawesome/free-regular-svg-icons";
import "../styles/community.scss";
import Banner from "../asset/community/banner_freeboard.png";
import level_1 from "../asset/level-1-badge.png";
import level_2 from "../asset/level-2-badge.png";
import level_3 from "../asset/level-3-badge.png";
import PaginationComp from "../components/Pagination";
import CustomSelect from "../components/CustomSelect";
import News from "../components/News";
import freeBoard_data from "../data/freeBoard_data.json"

const FreeBoard = () => {

  const FreeBoardList = freeBoard_data;
  const itemsPerPage = 20;
  const [ sortedData, setSortedData ] = useState(
    FreeBoardList.sort((a, b) => b.id - a.id).slice(0, itemsPerPage)
  );
  const [ totalFilteredItems, setTotalFilteredItems ] = useState(FreeBoardList.length);
  const levelImg = {
    '1': level_1, 
    '2': level_2, 
    '3': level_3,
  };

  //검색
  const [ search, setSearch ] = useState('');
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value); //input value로 들어온 검색어 가져오기
  };
  const onSearch = (e) => {
    e.preventDefault();
    const filteredData = FreeBoardList.filter((item) => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
    );

    //검색된 결과를 정렬 후 상위 20개 데이터로 업데이트
    setSortedData(filteredData.sort((a,b) => b.id - a.id).slice(0, itemsPerPage));
    setTotalFilteredItems(filteredData.length);
    setCurrentPage(1);
  }
  
  //페이지네이션
  const [ currentPage, setCurrentPage ] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //카테고리
  const [ selectedCategory, setSelectedCategory ] = useState(null);
  const handleSelectChange = (selectedOption) => {
    setSelectedCategory(selectedOption);

    //선택한 카테고리에 따라 데이터 필터링
    const filteredData = selectedOption && selectedOption.label !== '전체' 
      ? FreeBoardList.filter((item) => item.category === selectedOption.label)
      : FreeBoardList;

    //데이터 정렬 후 상위 20개 데이터로 업데이트
    setSortedData(filteredData.sort((a,b) => b.id - a.id).slice(0, itemsPerPage));

    // 현재 페이지를 1로 리셋
    setCurrentPage(1);
  };

  //페이지네이션 및 카테고리 변경 감지
  useEffect(() => {
    const fetchData = async () => {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      let currentItems;

      // 선택한 카테고리에 따라 데이터 필터링
      if (selectedCategory && selectedCategory.label !== '전체') {
        const filteredData = FreeBoardList.filter((item) => item.category === selectedCategory.label);
        currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        setTotalFilteredItems(filteredData.length); // 필터링된 데이터의 갯수 업데이트
      } else {
        currentItems = FreeBoardList.slice(indexOfFirstItem, indexOfLastItem);
        setTotalFilteredItems(FreeBoardList.length); // 전체 데이터의 갯수로 업데이트
      }

      // 데이터 정렬 후 상위 20개 데이터로 업데이트
      setSortedData(currentItems.sort((a, b) => b.id - a.id));
    };

    fetchData();
  }, [currentPage, selectedCategory, FreeBoardList]);

  return(
    <main className="Community">
      <section className="fb-banner bg-point-1 pd">
        <div className="container df jcsb">
          <div className="fb-banner-content">
            <h2 className="tt4 bold white">자유게시판</h2>
            <p className="tt2 bold white mg-t1">경험, 정보, 후기! 무엇이든 자유롭게 공유해보세요!</p>
            <form className="mg-t2 search" onSubmit={e => onSearch(e)}>
              <button type="submit" className="point-1">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input type="text" value={search} onChange={onChangeSearch} placeholder="검색어를 입력해주세요." />
            </form>
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
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td className="free-td-1">{item.id}</td>
                <td className="free-td-2 green-4">{item.category}</td>
                <td className="free-td-3 link"><a href="" className="link">{item.title}</a></td>
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
          totalPageCount={Math.ceil(totalFilteredItems / itemsPerPage)}
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