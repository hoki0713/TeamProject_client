import React from 'react';
import {PaginationItem, SearchBar} from "../../../items";
import {Link} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

const Enquiry = () => {
    const handleSearch = (searchWord) => {
        alert(searchWord);
    }

    return (
        <>
            <div className="userlist-content-title">
                <h2 className="userlist-menu-h2"> - 1:1 문의</h2>
                <div id="userlist-select-search-bar">
                    <select className="form-control" id="userlist-select">
                        <option selected>진행 상태</option>
                        <option>전체</option>
                        <option>미해결</option>
                        <option>해결</option>
                    </select>
                    <span id="userlist-search-bar">
          <SearchBar onSearch={handleSearch}/>
                    </span></div>
            </div>
            <Table responsive bordered>
                <thead>
                <tr>
                    <th>문의번호</th>
                    <th>ID</th>
                    <th>제목</th>
                    <th>등록일</th>
                    <th>처리일</th>
                    <th>진행상태</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>parksrazor</td>
                    <td>이미지가 안 뜹니다</td>
                    <td>2020/07/27</td>
                    <td>-</td>
                    <td>미해결</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>yogojogo</td>
                    <td>챗봇 답변이 이상해요</td>
                    <td>2020/07/25</td>
                    <td>2020/07/27</td>
                    <td>해결</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>turtle</td>
                    <td>어플은 없습니까?</td>
                    <td>2020/07/20</td>
                    <td>2020/07/22</td>
                    <td>해결</td>
                </tr>
                </tbody>
            </Table>
            <PaginationItem/>

        </>
    );
};

export default Enquiry;