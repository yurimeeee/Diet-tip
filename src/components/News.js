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
        setArticles(response.data.articles);
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

  // publishedAt에서 'T' 이전의 날짜를 추출하는 함수
  const formatDate = (publishedAt) => {
    return publishedAt.split('T')[0];
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
              <p className="tt5 bold">{article.title}</p>
              <p className="tt7 news-date">{formatDate(article.publishedAt)}</p>
              <p>{article.description}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default News;
