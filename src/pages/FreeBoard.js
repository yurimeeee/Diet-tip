import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMagnifyingGlass, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faImage, faCommentDots, faThumbsUp, faEye } from "@fortawesome/free-regular-svg-icons";
import "../styles/community.scss";
import Banner from "../asset/community/banner_freeboard.png";
import CustomSelect from "../components/CustomSelect";
import News from "../components/News";
import freeBoard_data from "../data/freeBoard_data.json"


const FreeBoard = () => {

  const FreeBoardList = freeBoard_data;
  const sortedData = FreeBoardList.sort((a, b) => b.id - a.id).slice(0, 20);
  
  return(
    <main className="Community">
      <section className="fb-banner bg-point-1 pd">
        <div className="container df jcsb">
          <div className="fb-banner-content">
            <h2 className="tt4 bold white">자유게시판</h2>
            <p className="tt2 bold white mg-t1">경험, 정보, 후기! 무엇이든 자유롭게 공유해보세요!</p>
            <form className="mg-t2 search">
              <button type="submit" className="point-1">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input type="text" placeholder="검색어를 입력해주세요." />
            </form>
          </div>
          <img src={Banner} alt="" />
        </div>
      </section>
  
      <div className="container">
        <div className="df mg-t3">
          <CustomSelect/>
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
                <td className="free-td-4">{item.userId}</td>
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
  
  
      <div className="container">
        <h2 className="mg-t3 tt5 bold">오늘의 뉴스</h2>
        <News/>
  
      </div>
    </main>
  );

};

export default FreeBoard;