import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SearchBar, NewPagination } from "../../../../items";
import { UserDetailContext } from "./context/UserDetailContext";
import "./UserList.css";
import axios from "axios";

const UserList = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { setUser } = useContext(UserDetailContext);
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(0);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const setCurrentPageZero = () => {
    setCurrentPage(0);
  };

  const handleSearch = (searchWord) => {
    setCurrentPageZero();
    if (selectedOption) {
      axios
        .get(
          `http://localhost:8080/admins/searchUserList/${selectedOption}/${searchWord}/${currentPage}`
        )
        .then((response) => {
          setTotalUsers(response.data.totalUsers);
          setUserList(response.data.users);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      alert("조건을 선택하세요!");
    }
  };

  const handleUserDetail = (userId) => {
    axios
      .get(`http://localhost:8080/users/${userId}`)
      .then((response) => {
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
        setTotalUsers(response.data.totalUsers);
        setUserList(response.data.users);
        setTotalPages(response.data.totalPages);
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
      <h2 className="mt-4" style={{ "text-align": "center" }}>
        회원목록
      </h2>
      <div className="userlist-content-title">
        <div id="userlist-select-search-bar">
          <h6 className="userlist-menu-h6" style={{"margin-right" : "1rem"}}>
            총 회원수: ({Intl.NumberFormat().format(totalUsers)})
          </h6>
          <select
            className="form-control"
            id="userlist-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option>선택</option>
            <option value="userid">아이디</option>
            <option value="username">가입자명</option>
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
              <td>{i + 1 + 20 * currentPage}</td>
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
      {totalUsers > 20 && (
        <NewPagination
          paginate={paginate}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default UserList;
