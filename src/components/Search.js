import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onSearch }) => {
  const [ search, setSearch ] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form className="search mg-t2 sm" onSubmit={handleSearch}>
      <button type="submit" className="point-1">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <input type="text" value={search} onChange={onChangeSearch} placeholder="검색어를 입력해주세요." />
    </form>
  );
};

export default Search;
