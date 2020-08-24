import React,{useState, useEffect} from 'react';
import {Pagination} from 'react-bootstrap'



const PaginationItem = ({postPerPage,TotalPostList,paginate,nextPage,prevPage}) => {

    const [currentPage,setCurrentPage] = useState(1);


    
    const pageNumber =[];

    for(let i =1;i<=Math.ceil(TotalPostList/postPerPage);i++){
        
        pageNumber.push(i);
    }

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
          <ul className="pagination justify-content-center">
           <li className="page-item">
            <span
                onClick={()=>{
                    prevPage();
                    window.scrollTo(0,0);
                }}
                className="page-link"
                >
                Previous
            </span>
           </li>

           {pageNumber.map((number)=>(
               <li key={number} className="page-item">
                   <span
                    onClick={()=>{
                        paginate(number);
                        
                    }}
                    className="page-link page-btn"
                    >
                        {number}
                   </span>
               </li>
           ))}

            <li className="page-item">
                <span
                    onClick={()=>{
                        nextPage();
                        window.scrollTo(0,0);
                    }}
                    className="page-link"
                    >
                    Next

                </span>
            </li>
          </ul>
        </>
    );
};

export default PaginationItem;