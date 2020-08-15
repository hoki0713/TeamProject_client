import React from 'react';
import {Pagination} from 'react-bootstrap'

const PaginationItem = ({postPerPage,totalPosts,currentPage}) => {

    const paginationStyle={
        justifyContent: 'center',


    }

    const pageNumber =[];

    for(let i =1;i<Math.ceil(totalPosts/postPerPage);i++){
        pageNumber.push(i);
    }

    const indexOfLastPage = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPage-postPerPage;
    const currentPosts = totalPosts.slice(indexOfFirstPost,indexOfLastPage)

    // const totalBlock = Math.ceil(pageNumber.length /)

    const paginate = (pageNumber) => currentPage =pageNumber;
    const nextPage = () => currentPage+1;
    const prevPage = () => currentPage-1;

    
    

    let active = currentPage;
    let items = [];
    for (let number = 1; number <= postPerPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }





    return (
        <>
          <ul className="pagination">
            {pageNumber.map((pageNum)=>(
                <li
                key={pageNum}
                onClick={()=>currentPage(pageNum)}
                >
                    {pageNum}
                </li>
            ))}
          </ul>
        </>
    );
};

export default PaginationItem;