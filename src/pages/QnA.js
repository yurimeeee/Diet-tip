import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faImage, faThumbsUp, faEye } from "@fortawesome/free-regular-svg-icons";
import "../styles/community.scss";
import Banner from "../asset/community/banner_qna.png";
import icon_q from "../asset/community/icon_q.png";
import level_1 from "../asset/level-1-badge.png";
import level_2 from "../asset/level-2-badge.png";
import level_3 from "../asset/level-3-badge.png";
import PaginationComp from "../components/Pagination";
import Search from "../components/Search";
import QnaView from "../components/QnaView";

const QnA = () => {
  const levelImg = {
    '1': level_1, 
    '2': level_2, 
    '3': level_3,
  };
  
  const [ allData, setAllData ] = useState([]);
  const [ topPostsData, setTopPostsData ] = useState([]);
  const [ filteredData, setFilteredData ] = useState([]);
  const itemsPerPage = 15;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //전체 데이터 가져오기
        const boardQuery = query(collection(db, "community"), orderBy("date", "desc"));
        const boardQuerySnapshot = await getDocs(boardQuery);
        const boardData = processQuerySnapshot(boardQuerySnapshot);
        setAllData(boardData);

        // 각 게시글에 대한 댓글을 가져오기
        const boardDataWithComments = await Promise.all(boardData.map(async (post) => {
          const commentsQuery = query(collection(db, `community/${post.id}/comments`), orderBy("timestamp", "asc"));
          const commentsQuerySnapshot = await getDocs(commentsQuery);
          const commentsData = commentsQuerySnapshot.docs.map((doc) => doc.data());
          return { ...post, commentsData };
        }));

        setAllData(boardDataWithComments);

        //주간 인기글 5개 필터링
        const topPosts = boardData
          .filter((post) => post.thumbsUp > 0)
          .sort((a, b) => b.thumbsUp - a.thumbsUp)
          .slice(0, 5);
        setTopPostsData(topPosts);
        setFilteredData(boardData.slice(0, itemsPerPage)); //페이지에 15개의 게시글 출력

        setSelectedCate('전체');
        filterDataByCategory('전체');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //date 포맷 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  const processQuerySnapshot = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => {
      const dateObject = doc.data().date.toDate();
      const formattedDate = formatDate(dateObject);
      const { date, ...restData } = doc.data();
      return {
        id: doc.id,
        date: formattedDate,
        ...restData,
      };
    });
  };

  //카테고리
  const [ categories, setCategories ] = useState(['전체', '식단', '운동', '기타']);
  const [ selectedCate, setSelectedCate ] = useState('전체');

  const handleCateClick = (category) => {
    setSelectedCate(category);
    filterDataByCategory(category);
  };

  //카테고리 선택시 전체 데이터에서 필터링 
  const filterDataByCategory = (category) => {
    const filteredData = category === '전체' ? allData : allData.filter((post) => post.category === category);
    setSelectedCateData(filteredData);
    setCurrentPage(1); // 새로운 카테고리로 전환될 때 현재 페이지를 1로 설정
  };

  //페이지네이션
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPageCount, setTotalPageCount ] = useState(1);
  const [ currentPageData, setCurrentPageData ] = useState([]);
  const [ selectedCateData, setSelectedCateData ] = useState([]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // allData가 업데이트될 때 페이지네이션을 다시 렌더링
  useEffect(() => {
    let dataForPagination = selectedCateData.length > 0 ? selectedCateData : allData;
    setTotalPageCount(Math.ceil(dataForPagination.length / itemsPerPage));
  
    if (dataForPagination.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentPageData(dataForPagination.slice(startIndex, endIndex));
    }
  }, [selectedCateData, allData, currentPage, itemsPerPage]);
  
  // 검색
  const onSearch = (searchValue) => {
    const filteredData = allData.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.content.toLowerCase().includes(searchValue.toLowerCase())
    );

    // 검색된 결과를 상태에 업데이트
    setSelectedCateData(filteredData);
    setCurrentPage(1);
  };

  //게시물 상세보기
  const [ selectedPost, setSelectedPost ] = useState(null);

  //선택한 게시물 Id
  const handlePostClick = (postId) => {
    setSelectedPost(postId);
    console.log(postId);
  };

  //미답변 또는 답변완료 여부를 판단하여 반환하는 함수
  const getAnswerStatus = (post) => {
    return post.commentsData && post.commentsData.length > 0 ? "답변완료" : "미답변";
    // return Array.isArray(post.comments) && post.comments.length > 0 ? "답변완료" : "미답변";
  };

  console.log(allData);

  //주간인기글 mobile size modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    <main className="Community">
      <div className="bg-point-1 pd">
        <div className="Qna-banner container">
          <div className="Qna-banner-content">
            <div className="df jcsb">
              <div>
                <h2 className="tt4 bold white">Q&A</h2>
                <p className="tt2 bold white mg-t1 sm">
                  고민하지 말고 질문해보세요!
                </p>
                <div className="mg-t2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`qna-category ${
                        selectedCate === category ? "active" : ""}`}
                      onClick={() => handleCateClick(category)}
                    >
                      {`# ${category}`}
                    </button>
                  ))}
                </div>
              </div>
              <img src={Banner} alt="" />
            </div>
            <Search onSearch={onSearch} />
          </div>

          <div className={`top-posts bg-green-2 lg-radius sm-shadow ${isModalOpen ? 'modal-open' : ''}`}>
            <h3 className="tt5 bold">주간 인기글</h3>
            <div className="posts-box df">
              {topPostsData.map((post, index) => (
                <p key={post.id} className="df" onClick={(e) => {e.preventDefault(); handlePostClick(post.id, e);}}>
                  <span className="posts-number bold">{index + 1}.</span>
                  <a href="">
                    <span className="posts-tt link mg-r1">{post.title}</span>
                    <span><FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />{post.thumbsUp}</span>
                  </a>
                </p>
              ))}
            </div>
            </div>
        </div>
      </div>

      {selectedPost ? (
        <QnaView
          post={allData.find((item) => item.id === selectedPost)}
          onClose={() => setSelectedPost(null)}
          setAllData={setAllData}
        />
      ) : (
        <div className="container">
          <div className="qna-btns">
            <button onClick={openModal} className="posts-btn w-red-btn mg-t3">주간 인기글</button>
            <button className="w-green-btn mg-t3">
              <FontAwesomeIcon icon={faPencil} /> 글 쓰기
            </button>
          </div>

          <table className="qna-list mg-t1">
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
              {currentPageData.map(( item ) => (
                <tr key={item.id} className="container" onClick={() => handlePostClick(item.id)}>
                  <td className="qna-td-1"><img src={icon_q} alt="" /></td>
                  <td className="qna-td-2 green-4">{item.category}</td>
                  <td className="qna-td-3 link" style={{ cursor: 'pointer' }}>
                    {item.title}
                  </td>
                  <td className="qna-td-4">
                    {item.userLevel && (
                      <>
                        <img 
                          src={levelImg[item.userLevel]} 
                          alt={`Level ${item.userLevel}`} 
                          className="level-img"
                        />
                        {item.userId}
                      </>
                    )}
                  </td>
                  <td className="qna-td-5">
                    {item.date}
                  </td>
                  <td className={`qna-td-6 ${getAnswerStatus(item) === "답변완료" ? "green-4" : "point-2"}`}>
                    {getAnswerStatus(item)}
                  </td>
                  <td className="qna-td-7">
                    <FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />
                    {item.thumbsUp}
                  </td>
                  <td className="qna-td-8">
                    <FontAwesomeIcon icon={faEye} className="mg-r1 gray-3" />
                    {item.view}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="qna-list-mobile mg-t1">
            {currentPageData.map(( item ) => (
              <div key={item.id} className="list-item" onClick={() => handlePostClick(item.id)}>
                <div className="list-item-st df">
                  <p>{item.date}</p>
                  <p className="green-4">{item.category}</p>
                </div>
                <div className="list-item-tt df">
                  <img src={icon_q} alt="" />
                  <p className="tt7 link bold" style={{ cursor: 'pointer' }}>
                    {item.title}
                  </p>
                </div>
                <div className="df jcsb">
                  <p>
                    {item.userLevel && (
                      <>
                        <img
                          src={levelImg[item.userLevel]}
                          alt={`Level ${item.userLevel}`}
                          className="level-img"
                        />
                        {item.userId}
                      </>
                    )}
                  </p>
                  <div className="list-item-st df">
                    <p className={`${getAnswerStatus(item) === "답변완료" ? "green-4" : "point-2"}`}>
                      {getAnswerStatus(item)}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />
                      {item.thumbsUp}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faEye} className="mg-r1 gray-3" />
                      {item.view}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          <PaginationComp
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
};

export default QnA;
