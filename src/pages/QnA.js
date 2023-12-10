import React from "react";
import "../styles/community.scss";

const QnA = () => {
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
              <button className="qna-category"># 전체</button>
              <button className="qna-category"># 식단</button>
              <button className="qna-category"># 운동</button>
              <button className="qna-category"># 기타</button>
            </div>
          </div>
          <img src="banner_qna.png" alt="" />
        </div>
        <form className="mg-t1 search">
          <button type="submit"><i className="fa-solid fa-magnifying-glass point-1"></i></button>
          <input type="text" placeholder="검색어를 입력해주세요." />
        </form>
      </div>
    
      <div className="top-posts bg-green-2 lg-radius sm-shadow">
        <h3 className="tt5 bold">주간 인기글</h3>
        <div className="posts-box df">
          <p>1. 12월에 평양에서 열리는 마라톤대회 도전하려고 합니다. 풀코스 관련..</p>
          <p>2. 네고왕 아임닭 배송 받으신 분 있나요?</p>
          <p>3. 효과적인 체중 감량 운동은 무엇인가요?</p>
          <p>4. 다이어트 중 적절한 탄수화물 섭취를 위한 가이드라인이 궁금합니다.</p>
          <p>5. 단백질 풍부한 식품은 어떤게 있나요? 운동 후에 근육을 늘리고 유지하는 데에 효과적인 식품을 알고 싶습니다.</p>
        </div>
      </div>
    </div>
    </div>

    <div className="container">
      <button className="w-green-btn mg-t3"><i className="fa-solid fa-pencil"></i> 글 쓰기</button>
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
          <tr>
            <td className="qna-td-1"><img src="icon_q.png" alt="" /></td>
            <td className="qna-td-2 point-1">기타</td>
            <td className="qna-td-3">12월에 평양에서 열리는 마라톤대회 도전하려고 합니다. 풀코스 관련..</td>
            <td className="qna-td-4">아임닭맛있닭</td>
            <td className="qna-td-5">2023-00-00</td>
            <td className="qna-td-6 point-2">미답변</td>
            <td className="qna-td-7">136</td>
            <td className="qna-td-8">954</td>
          </tr>
          <tr>
            <td className="qna-td-1"><img src="icon_q.png" alt="" /></td>
            <td className="qna-td-2 point-1">기타</td>
            <td className="qna-td-3">12월에 평양에서 열리는 마라톤대회 도전하려고 합니다. 풀코스 관련..</td>
            <td className="qna-td-4">아임닭맛있닭</td>
            <td className="qna-td-5">2023-11-19</td>
            <td className="qna-td-6 point-2">미답변</td>
            <td className="qna-td-7">136</td>
            <td className="qna-td-8">954</td>
          </tr>
          <tr>
            <td className="qna-td-1"><img src="icon_q.png" alt="" /></td>
            <td className="qna-td-2 point-1">기타</td>
            <td className="qna-td-3">12월에 평양에서 열리는 마라톤대회 도전하려고 합니다. 풀코스 관련..</td>
            <td className="qna-td-4">아임닭맛있닭</td>
            <td className="qna-td-5">2023-11-19</td>
            <td className="qna-td-6 point-1">답변완료</td>
            <td className="qna-td-7">136</td>
            <td className="qna-td-8">954</td>
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

    </main>
  );
};

export default QnA;