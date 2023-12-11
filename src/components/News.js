import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react"

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
          headers: {
            'X-Naver-Client-Id': 'ugNYxtATUlGXyJit4E4C',
            'X-Naver-Client-Secret': 'ayNvMCZVLl',
          },
          params: {
            query: '건강',  // 검색어 예시 (원하는 검색어로 변경)
            display: 4,       // 표시할 뉴스 수
          },
        });
        console.log(response);
        setNewsData(response.data.items);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    console.log(setNewsData);
    fetchData();
  }, []);

  return (
    <>
      <h2 className="mg-t3 tt5 bold">오늘의 뉴스</h2>
        {newsData.map((news, index) => (
          <div key={index} className="mg-t1 news-box lg-radius df sm-shadow">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <img src="news-01.jpg" alt="" />
              <div>
                <p className="tt5 bold">{news.title}</p>
                <p className="tt7 news-md">사이언스타임즈</p>
                <p>바다의 별인 불가사리에게 모자를 씌운다면 어디에 올려야 할까. 중앙에 볼록 튀어나온 지점일까, 아니면 5개의 모서리 중 하나일까....</p>
              </div>
            </a>
          </div>
        ))}
    </>
  );
}

export default News;
