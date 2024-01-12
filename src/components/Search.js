import React, { useState } from 'react';
import styled from "styled-components";

// width, background, border 등 개별 스타일 적용, 변경해서 사용 
const SearchForm = styled.form`
  position: relative;

  > input{
    border-radius: 50px;
    padding: 15px 24px 15px 48px;

    &:focus,
    &:active{
      -webkit-box-shadow: 0px 0px 0px 5px rgba(148, 223, 182, 0.35);
      box-shadow: 0px 0px 0px 5px rgba(148, 223, 182, 0.35);
      transition: 0.3s;
    }
  }

  > button{
    position: absolute;
    color: #32a061;
    left: 0;
    top: 0;
    padding: 15.5px 17px;

    &:focus,
    &:active{
      background: transparent;
    }

    svg.bi-search{
      width: 20px;
      height: 20px;
    }
  }
  
  //mobile size
  @media (max-width: 480px) {
    > input{
      font-size: 14px;
      padding: 14px 22px 14px 44px;
    }

    > button{
      padding: 14px 15px;

      svg.bi-search{
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const Search = ({ onSearch }) => {
    
  const [ searchVal, setSearchVal ] = useState('');

  const onChangeSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  return (
    <SearchForm className="search" onSubmit={handleSearch}>
      <input type="text" value={searchVal} onChange={onChangeSearch} placeholder="검색어를 입력해주세요." />
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </button>
    </SearchForm>
  );
};

export default Search;
