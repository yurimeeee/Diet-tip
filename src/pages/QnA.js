import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faImage, faThumbsUp, faEye } from "@fortawesome/free-regular-svg-icons";
import "../styles/community.scss";
import Banner from "../asset/community/banner_qna.png";
import icon_q from "../asset/community/icon_q.png"
import level_1 from "../asset/level-1-badge.png";
import level_2 from "../asset/level-2-badge.png";
import level_3 from "../asset/level-3-badge.png";

import PaginationComp from "../components/Pagination";
import QnaView from "../components/QnaView";


const QnA = () => {
  const levelImg = {
    '1': level_1, 
    '2': level_2, 
    '3': level_3,
  };
  
  const [allData, setAllData] = useState([]);
  const [topPostsData, setTopPostsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //전체 데이터 가져오기
        const boardQuery = query(collection(db, "community"), orderBy("date", "desc"));
        const boardQuerySnapshot = await getDocs(boardQuery);
        const boardData = processQuerySnapshot(boardQuerySnapshot);
        setAllData(boardData);

        //주간 인기글 5개 필터링
        const topPosts = boardData
          .filter((post) => post.thumbsUp > 0)
          .sort((a, b) => b.thumbsUp - a.thumbsUp)
          .slice(0, 5);
        setTopPostsData(topPosts);

        //한 페이지에 15개의 게시글 출력
        setFilteredData(boardData.slice(0, itemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleCateClick = (category) => {
    // Set selected category and filter data
    setSelectedCate(category);
    filterDataByCategory(category);
  };

  const filterDataByCategory = (category) => {
    // Filter data based on selected category from the original boardData
    const filteredData = category === '전체' ? allData : allData.filter((post) => post.category === category);
    setFilteredData(filteredData.slice(0, itemsPerPage)); // Apply limit for display
  };

  const [categories, setCategories] = useState(['전체', '식단', '운동', '기타']);
  const [selectedCate, setSelectedCate] = useState('');


  
  console.log(allData);
  console.log(filteredData);

  return(
    <main className="Community">
      <div className="bg-point-1 pd">
        <div className="container df jcsb">
          <div>
            <div className="df jcsb">
              <div>
                <h2 className="tt4 bold white">Q&A</h2>
                <p className="tt2 bold white mg-t1">고민하지 말고 질문해보세요!</p>
                <div className="mg-t2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`qna-category ${selectedCate === category ? 'active' : ''}`}
                      onClick={() => handleCateClick(category)}
                    >
                      {`# ${category}`}
                    </button>
                  ))}
                </div>
              </div>
              <img src={Banner} alt="" />
            </div>
            <form className="mg-t1 search">
              <button type="submit" className="point-1">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input type="text" placeholder="검색어를 입력해주세요." />
            </form>
          </div>
        
          <div className="top-posts bg-green-2 lg-radius sm-shadow">
            <h3 className="tt5 bold">주간 인기글</h3>
            <div className="posts-box df">
              {topPostsData.map((post) => (
                <p key={post.id}>
                  <a href="" className="link">
                    {post.title}
                    <b> <FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />{post.thumbsUp}</b>
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <QnaView/> */}
      <div className="container">
        <button className="w-green-btn mg-t3">
          <FontAwesomeIcon icon={faPencil} /> 글 쓰기
        </button>
        <table className="mg-t1 pna-list">
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
            {filteredData.map(( item ) => (
              <tr key={item.id}>
                <td className="qna-td-1"><img src={icon_q} alt="" /></td>
                <td className="qna-td-2 green-4">{item.category}</td>
                <td className="qna-td-3">
                  <a href="" className="link">{item.title}</a>
                </td>
                <td className="qna-td-4">
                  {item.userLevel && (
                  <>
                    <img src={levelImg[item.userLevel]} alt={`Level ${item.userLevel}`} />
                    {item.userId}
                  </>
                )}
                </td>
                <td className="qna-td-5">
                  {item.date}
                </td>
                <td className="qna-td-6 point-2">미답변</td>
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
      
        <nav className="pagination mg-t3">
          <ul className="pagination">
            <li className="page-item first-page">맨앞</li>
            <li className="page-item">1</li>
            <li className="page-item">2</li>
            <li className="page-item active">3</li>
            <li className="page-item">4</li>
            <li className="page-item">5</li>
            <li className="page-item last-page">맨뒤</li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default QnA;