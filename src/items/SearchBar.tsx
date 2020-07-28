import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => onSearch(searchWord)}
          >
            검색
            </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;