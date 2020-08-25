import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {StoreSearchContext} from "../../../../../context/StoreSearchContext";
import {Link} from "react-router-dom";

const StoreChatbot = (props) => {
    const [storeList,setStoreList] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [searched,setSearched]=useState('');
    const [pageSize,setPageSize]=useState(10);
    const {setStore}=useContext(StoreSearchContext);


    useEffect(()=>{
        setSearched(props.steps.storeIn.value);
    },[])

    useEffect(()=>{
        if(searched!==''){
            axios.get(`http://localhost:8080/stores/chatbotSearch/${searched}/${pageSize}`)
            .then(({data})=>{
                setStoreList(data.list);
                setTotalCount(data.count);
            })
            .catch(err=>{throw err});}
    },[searched,pageSize]);


    return (
        <div>
            <>가맹점 목록</><br/>
            {(storeList.length!==0)?
            storeList.map((store, i)=>(
                (i%10)?
                    <div key={i}>
                        <Link onClick={()=>setStore(store)} to={'/storeDetail'}>{store.storeName}</Link>
                    </div>:
                    <div key={i} style={{'border-top':'1px solid black'}}>
                        <Link onClick={()=>setStore(store)} to={'/storeDetail'}>{store.storeName}</Link>
                    </div>

                )

            ):<>해당하는 가맹점이 없습니다.</>
            }
            {totalCount-pageSize>0&&<button onClick={()=>setPageSize(pageSize+10)}>더보기</button>}
        </div>
    );
};

export default StoreChatbot;