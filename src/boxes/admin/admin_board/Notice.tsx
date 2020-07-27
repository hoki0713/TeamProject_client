import React from 'react';
import {Button} from 'react-bootstrap';
import {PaginationItem, SearchBar} from "../../../items";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

const Notice = () => {
    const handleSearch = (searchWord) => {
        alert(searchWord);
    }

    return (
        <>
            <div className="userlist-content-title">
                <h2 className="userlist-menu-h2"> - 공지사항</h2>
                <div id="userlist-select-search-bar">
                    <select className="form-control" id="userlist-select">
                        <option selected>선택</option>
                        <option>제목</option>
                        <option>내용</option>
                        <option>제목 및 내용</option>
                    </select>
                    <select className="form-control" id="userlist-select">
                        <option selected>구분</option>
                        <option>지역</option>
                        <option>사이트</option>
                    </select>
                    <span id="userlist-search-bar">
          <SearchBar onSearch={handleSearch}/>
        </span>
                </div>
            </div>



            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                        <th>조회수</th>
                        <th>링크</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                                           </tr>
                    <tr>
                        <td>2</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                                          </tr>
                    <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                                          </tr>
                    <tr>
                        <td>4</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                                          </tr>
                    <tr>
                        <td>5</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                                           </tr>
                    <tr>
                        <td>6</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                                           </tr>
                    </tbody>
                </Table>
                <PaginationItem/>
                <Link to="/admin/notice-write">
                <Button variant="primary">글쓰기</Button>
                </Link>
            </div>




        </>
    );
}

export default Notice;