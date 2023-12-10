import React, { useState } from "react";
import Select from "react-select"; //react-select 라이브러리
import styled from "styled-components"; //css-in-js 라이브러리
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMagnifyingGlass, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faImage, faCommentDots, faThumbsUp, faEye } from "@fortawesome/free-regular-svg-icons";
import "../styles/community.scss";
import Banner from "../asset/community/banner_freeboard.png";

const SelectBox = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
  .react-select__control {
    cursor: pointer;
    background: transparent;
    border-radius: 66px;
    border: 1px solid #32a061;
    box-shadow: none;
    // width: 136px;
    // text-align: center;
    &:hover{
      border: 1px solid #32a061;
    }
  }
  .react-select__single-value {
    color: #32a061; /* 텍스트 색상 지정 */
    font-size: 16px;
  }
  .react-select__menu {
    background-color: #f2f3f5;
    border-radius: 10px;
    border: 1px solid #32a061;
    box-shadow: none;
    overflow: hidden;
  }
  .react-select__option {
    background-color: transparent; /* option 배경색 */
    color: black; /* option 텍스트 색상 */
  }
  .react-select__option--is-selected {
    background-color: #32a061; /* 클릭된 option 배경색 */
    color: white; /* click 옵션 텍스트 색상 */
  }
  .react-select__option--is-focused {
    background-color: #94dfb6;
    color: #000; /* hover 옵션 텍스트 색상 */
  }
  .react-select__option:active{
    background-color: #94dfb6;
  }
`;

const FreeBoard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'all', label: '전체' },
    { value: 'review', label: '후기' },
    { value: 'beforeAfter', label: '비포&애프터' },
    { value: 'tip', label: '꿀 TIP' },
    { value: 'etc', label: '기타' },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  


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
          <div className="free-select">
            <SelectBox
              value={selectedOption}
              onChange={handleChange}
              options={options}
            />
          </div>

          

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
            <tr>
              <td className="free-td-1">1566</td>
              <td className="free-td-2 green-4">후기</td>
              <td className="free-td-3 link"><a href="" className="link">평양 마라톤 풀코스 참가 후기</a></td>
              <td className="free-td-4">아임닭맛있닭</td>
              <td className="free-td-5">2023-12-02</td>
              <td className="free-td-6">
                <FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />136
              </td>
              <td className="free-td-7">
                <FontAwesomeIcon icon={faEye} className="mg-r1 gray-3" />954
              </td>
            </tr>
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
  
  
      <div className="container news">
        <h2 className="mg-t3 tt5 bold">오늘의 뉴스</h2>
  
        <div className="mg-t1 news-box lg-radius df sm-shadow">
          <img src="news-01.jpg" alt="" />
          <div>
            <p className="tt5 bold">불가사리 머리는 어디? 첨단 분석 기법 총동원</p>
            <p className="tt7 news-md">사이언스타임즈</p>
            <p>바다의 별인 불가사리에게 모자를 씌운다면 어디에 올려야 할까. 중앙에 볼록 튀어나온 지점일까, 아니면 5개의 모서리 중 하나일까....</p>
          </div>
        </div>
      </div>
    </main>
  );

};

export default FreeBoard;