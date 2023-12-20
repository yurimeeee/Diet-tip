import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faImage,
  faThumbsUp,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import "../styles/community.scss";
import Banner from "../asset/community/banner_qna.png";
import icon_q from "../asset/community/icon_q.png";
import level_1 from "../asset/level-1-badge.png";
import level_2 from "../asset/level-2-badge.png";
import level_3 from "../asset/level-3-badge.png";

// import QnaView from "../components/QnaView";

const QnA = () => {
  //firebase 데이터 불러오기
  const [Data, setData] = useState([]);
  const itemsPerPage = 15;

  useEffect(() => {
    //날짜 포맷 함수
    const formatDate = (date, format) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return format
        .replace("YYYY", year)
        .replace("MM", month)
        .replace("DD", day);
    };

    const fetchData = async () => {
      const q = query(collection(db, "community"), limit(itemsPerPage));
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => {
        //Timestamp -> 'YYYY-MM-DD' 형태로 변경
        const dateObject = doc.data().date.toDate();
        const formattedDate = formatDate(dateObject, "YYYY-MM-DD");
        const { date, ...restData } = doc.data();

        return {
          id: doc.id,
          date: formattedDate,
          ...restData,
        };
      });
      setData(newData);
      console.log(newData);
    };
    fetchData();
  }, []);

  //카테고리
  const categories = ["전체", "식단", "운동", "기타"];
  const [selectedCate, setSelectedCate] = useState("전체");
  const handleCateClick = (category) => {
    setSelectedCate(category);
  };

  return (
    <main className="Community">
      <div className="bg-point-1 pd">
        <div className="container df jcsb">
          <div>
            <div className="df jcsb">
              <div>
                <h2 className="tt4 bold white">Q&A</h2>
                <p className="tt2 bold white mg-t1">
                  고민하지 말고 질문해보세요!
                </p>
                <div className="mg-t2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`qna-category ${
                        selectedCate === category ? "active" : ""
                      }`}
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
              <p>
                1. 12월에 평양에서 열리는 마라톤대회 도전하려고 합니다. 풀코스
                관련..
                <b>
                  <FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />
                </b>
              </p>
              <p>2. 네고왕 아임닭 배송 받으신 분 있나요?</p>
              <p>3. 효과적인 체중 감량 운동은 무엇인가요?</p>
              <p>
                4. 다이어트 중 적절한 탄수화물 섭취를 위한 가이드라인이
                궁금합니다.
              </p>
              <p>
                5. 단백질 풍부한 식품은 어떤게 있나요? 운동 후에 근육을 늘리고
                유지하는 데에 효과적인 식품을 알고 싶습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <QnaView/> */}
      <div className="container">
        {/* <div className="container"> */}
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
            {Data.filter(
              (post) =>
                selectedCate === "전체" || post.category === selectedCate
            ).map((item) => (
              <tr key={item.id}>
                <td className="qna-td-1">
                  <img src={icon_q} alt="" />
                </td>
                <td className="qna-td-2 green-4">{item.category}</td>
                <td className="qna-td-3">{item.title}</td>
                <td className="qna-td-4">{item.userId}</td>
                <td className="qna-td-5">{item.date}</td>
                <td className="qna-td-6 point-2">미답변</td>
                <td className="qna-td-7">
                  <FontAwesomeIcon icon={faThumbsUp} className="mg-r1 gray-3" />
                  {item.thumbsUp}
                </td>
                <td className="free-td-7">
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
