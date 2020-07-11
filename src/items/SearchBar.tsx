import * as React from 'react';
import { Link } from "react-router-dom";

function SearchBar() {
  return (
    <div className="container">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" />
        <div className="input-group-append">
          <Link to="/merchant-list">
            <button className="btn btn-primary" type="button">
              검색
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;