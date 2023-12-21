import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const News = () => {
  //카테고리
  const [ category, setCategory ] = useState('all');
  const onSelect = useCallback(category => {
    setCategory(category);
  }, []);

  const categories = [
    {
      name:'all',
      text:'전체'
    },
    {
      name:'health',
      text:'건강'
    },
    {
      name:'entertainment',
      text:'엔터테인먼트'
    }
  ];

  //뉴스 api 불러오기
  const [ articles, setArticles ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    //async를 사용하는 함수 선언
    const fatchData = async() => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=577ab2fa6f994abba6cd12f0b2a44fef`,
        );
        const newsFiltered = response.data.articles.filter(
          article => article.urlToImage && article.description
        );
        setArticles(newsFiltered.slice(0, 4));
      } catch (e){
        console.log(e);
      }
      console.log(articles);
      setLoading(false);
    };
    fatchData();
  }, [category]);
  // category 값이 바뀔 때마다 뉴스를 새로 불러와야 함으로 
  // useEffect의 의존배열(두번째 파라미터 설정)에 category 넣어줌

  if(loading){
    return <p className="mg-t1">불러오는 중...</p>
  }

  if(!articles){
    return null;
  }

  // 날짜를 'YYYY-MM-DD HH:mm:ss' 형식으로 포맷팅
  const formatDate = (publishedAt) => {
    return new Date(publishedAt).toISOString().replace('T', ' ').replace('Z', '').slice(0, 19);
  };

  return (
    <>
      <div className="news-category mg-t1">
        <ul className="df point-1">
          {categories.map(c => (
            <li
              key={c.name}
              className={category === c.name ? 'active' : ''}
              onClick={() => onSelect(c.name)}
            >
              {c.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="news-frame df">
        {articles.map((article) => (
          <div key={article.url} className="mg-t1 news-box lg-radius df sm-shadow">
            {article.urlToImage && (
              <img src={article.urlToImage} alt="thumbnail" />
            )}
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <p className="tt5 news-tt bold">{article.title}</p>
              <p className="tt7 news-date">{formatDate(article.publishedAt)}</p>
              <p className="news-content">{article.description}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default News;
