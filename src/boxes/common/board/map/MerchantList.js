import React, {useContext, useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios'

import {StoreSearchContext} from "../../../../context/StoreSearchContext";
import {Link} from "react-router-dom";


const MerchantList=()=> {
    const {setStore}=useContext(StoreSearchContext);
    const [storeList, setStoreList]=useState([]);
    const [pageNow,setPageNow]=useState(0);
    const [totalCount,setTotalCount]=useState(0);
    const [pageSize]=useState(10);
    const [blockSize]=useState(10);
    const [blockNow,setBlockNow]=useState(0);
    const [blockCount,setBlockCount]=useState(0)
    const [pageStart,setPageStart]=useState(0);
    const [rowStart,setRowStart]=useState(0);
    const [pageCount,setPageCount]=useState(0);
    const [existPrev, setExistPrev]=useState(false);
    const [existNext,setExistNext]=useState(false);
    const [nextBlock,setNextBlock]=useState(0);
    const [pageList, setPageList]=useState([]);
    const [pageNumArr,setPageNumArr]=useState([]);


    function pageNation(){
        setBlockNow(parseInt(pageNow/blockSize));
        setPageStart(blockNow *  blockSize);
        setRowStart(parseInt(pageNow*pageSize));
        setPageCount(parseInt((totalCount % pageSize !== 0) ? totalCount / pageSize +1 :totalCount / pageSize ));
        setExistPrev(blockNow !== 0);
        setExistNext( blockNow !== (blockCount-1));
        setNextBlock(pageStart + blockSize);
        setBlockCount(parseInt((pageCount % blockSize !== 0) ? pageCount / blockSize +1:pageCount / blockSize));
    }

    function setPageNums() {
        let pageNumArr=[];
        let startNum=0;
        let limitNum = (existNext)?nextBlock:totalCount/blockSize;
            for(let i=pageStart;i<limitNum;i++){
                pageNumArr[startNum]=i;
                startNum++;
            }
        setPageNumArr(pageNumArr);
    }
    function setPageArr(){
        if(totalCount!== 0){
            let startNum =rowStart%(blockSize*pageSize);
            let tmpArr =[];
            let limitNum = (pageCount!== 0&&pageNow+1 === pageCount)?totalCount-pageNow*pageSize:pageSize;
                for(let i=0;i<limitNum;i++){
                    tmpArr[i]=storeList[startNum];
                    startNum++;
                }
            setPageList(tmpArr);
            }
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/stores/getSome/""/""/${blockNow*pageSize*blockSize}/${blockSize*pageSize}`)
            .then(({data})=>{
                setStoreList(data.list);
                setTotalCount(data.count);
            })
            .catch(err=>{console.log(err);throw err;});

    },[blockNow]);

    useEffect(()=>{
       pageNation();
    },[pageNow,blockNow,pageList]);

    useEffect(()=>{
        setPageArr();
    },[rowStart,pageNumArr]);

    useEffect(()=>{
        setPageNums();
    },[storeList]);

    return (
        <div className="container" id={"merchan_list"}>
            <h2 className="mt-4">리스트로 찾아보기</h2>
            <Table striped bordered hover className="list_table">
                <tbody>
                <tr>
                    <td>#</td>
                    <td>등록번호</td>
                    <td>가게명</td>
                    <td>가게주소</td>
                    <td>업종</td>
                </tr>


                {pageList[pageList.length-1]&&pageList.map((store,i)=>(
                        <tr>
                            <td></td>
                            <td>{store.id}</td>
                            <td><Link to={'/storeDetail'} onClick={()=>setStore(store)}>{store.storeName}</Link> </td>
                            <td>{store.address}</td>
                            <td>{store.storeType}</td>
                        </tr>
                    )
                )}


                </tbody>
            </Table>
            <table className={"paging"}>
                <tr>
                    {existPrev&&<td  className={"nums"} onClick={e=>{e.preventDefault();setPageNow(0)}}>{"<<"}</td>}
                    <td  className={"nums"} onClick={()=>{if(pageNow!==0){setPageNow(pageNow-1)}}}>{"<"}</td>


                            {pageNumArr.map((num)=>
                                (
                                <td className={"nums"} onClick={()=>setPageNow(num)}>&nbsp;{num+1}</td>
                                )
                            )}


                    <td  className={"nums"} onClick={()=>{if(pageNow!==blockSize){setPageNow(pageNow+1)}}}>&nbsp;{">"}</td>
                    {existNext&&<td  className={"nums"} onClick={e=>{e.preventDefault();setPageNow(parseInt(pageCount/blockSize)*blockSize);}}>&nbsp;{">>"}</td>}
                </tr>
            </table>

        </div>
    );
}

export default MerchantList;