import React,{useState, useEffect} from 'react';
import {Pagination} from 'react-bootstrap'
import { Notice } from '../boxes/admin/admin_board/index';


const PaginationItem = ({postPerPage,TotalPostList,paginate,nextPage,prevPage}) => {

    
    // const [totalPost,setTotalPost] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    // const [postPerPage] = useState(5);
    
    
  
    //1.받아옴
    // useEffect(()=>{
    //     const fetchData = () =>{
    //         setTotalPost(postList);
    //     }
    //     fetchData();
    // },[])


    
    const pageNumber =[];

    for(let i =1;i<=Math.ceil(TotalPostList/postPerPage);i++){
        
        pageNumber.push(i);
    }

    

    // const indexOfLastPage = currentPage * postPerPage;
    // const indexOfFirstPost = indexOfLastPage-postPerPage;
    // const currentPosts = postList.slice(indexOfFirstPost,indexOfLastPage)

    // // const totalBlock = Math.ceil(pageNumber.length /)

    // const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // const nextPage = () => setCurrentPage(currentPage+1);
    // const prevPage = () => setCurrentPage(currentPage-1);

    
    

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