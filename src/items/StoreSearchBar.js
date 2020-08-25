import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StoreSearchContext } from "../context/StoreSearchContext";
import axios from "axios";

const StoreSearchBar = () => {
  const [searchedStore, setSearchedStore] = useState({});
  const [searchWord, setSearchWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [shortSearched, setShortSearched] = useState([]);
  const { setStore } = useContext(StoreSearchContext);
  const history = useHistory();

  useEffect(() => {
    if (inputValue) {
      getshorList();
    } else {
      setShortSearched([]);
    }
  }, [inputValue]);

  const handleStoreSearch = (store) => {
    if (store.storeName) {
      setStore(store);
      history.push("/storeDetail");
    } else {
      alert("검색어를 입력하세요!");
    }
  };

  const getshorList = () => {
    if (inputValue) {
      axios
        .get(`http://localhost:8080/stores/searchStore/${inputValue}`)
        .then((response) => {
          if (response.data.length) {
            setShortSearched(response.data);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const realTimeSearch = (e) => {
    setSearchWord(e.target.value);
    const value = e.target.value;
    if (value.charAt[0] !== "") setInputValue(value);
  };

  return (
    <div
      className="container"
      style={{ position: "relative", display: "inline-block" }}
    >
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="상호명을 입력하세요."
          value={searchWord}
          onChange={realTimeSearch}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              handleStoreSearch(searchedStore);
            }}
          >
            검색
          </button>
        </div>
      </div>
      <div>
        <ul
          className="list-group"
          style={{ position: "absolute", zIndex: 99, width: "95%" }}
        >
          {shortSearched.map((info) => (
            <li
              className="list-group-item"
              onClick={() => {
                setSearchWord(info.storeName);
                setSearchedStore(info);
                setShortSearched([]);
              }}
            >
              {info.storeName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoreSearchBar;
