import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SearchBar } from "../../../../items";
import { UserDetailContext } from "./context/UserDetailContext";
import Pagination from "./Pagination";
import "./UserList.css";
import axios from "axios";

const UserList = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { setUser } = useContext(UserDetailContext);
  const history = useHistory();

  const [startPage, setStartPage] = useState(0);
  const [numOfPages, setNumOfPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);



  const paginate = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {};

  const handleUserDetail = (userId) => {
    axios
      .get(`http://localhost:8080/users/${userId}`)
      .then((response) => {
        console.log(response.data.salesList);
        setUser(response.data);
        history.push("/admin/user-detail");
      })
      .catch((error) => {
        throw error;
      });
  };

  const getUserList = () => {
    axios
      .get(`http://localhost:8080/admins/userList/${currentPage}`)
      .then((response) => {
        setUserList(response.data.users);
        setTotalPages(response.data.totalPages)
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    getUserList();
  }, [currentPage]);

  return (
    <div>
      <div className="userlist-content-title">
        <h2 className="userlist-menu-h2"> - 회원목록</h2>
        <h6 className="userlist-menu-h6">총회원수:()</h6>
        <div id="userlist-select-search-bar">
          <select
            className="form-control"
            id="userlist-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option>선택</option>
            <option value="userid">아이디</option>
            <option value="username">가입자명</option>
            <option value="userlocal">거주지역</option>
          </select>

          <span id="userlist-search-bar">
            <SearchBar onSearch={handleSearch} />
          </span>
        </div>
      </div>

      <table className="table userslist-table">
        <thead className="thead-light">
          <tr>
            <th>No</th>
            <th>아이디</th>
            <th>가입자명</th>
            <th>성별</th>
            <th>주소</th>
            <th>이메일</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, i) => (
            <tr key={i}>
              <td>{(i + 1)+(20*currentPage)}</td>
              <td
                onClick={() => {
                  handleUserDetail(user.id);
                }}
                className="userId"
              >
                {user.userId}
              </td>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.defaultAddr}</td>
              <td>{user.email}</td>
              <td>{user.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        paginate={paginate}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default UserList;
