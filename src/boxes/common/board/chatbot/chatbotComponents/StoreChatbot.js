import React, {useEffect, useState} from 'react';
import axios from "axios";
import {StoreSearchContext} from "../../../../../context/StoreSearchContext";
import {Link} from "react-router-dom";

const StoreChatbot = (props) => {
    const [storeList,setStoreList] = useState([]);
    const [pageNow,setPageNow] = useState(0);
    const [existPrev,setExistPrev] = useState(false);
    const [existNext,setExistNext] = useState(false);
    const [totalCount,setTotalCount] = useState(0);
    useEffect(()=>{
        axios.get(`http://localhost:8080/stores/chatbotSearch/${props.steps.storeIn.value}/${pageNow}`)
            .then(({data})=>{
                setStoreList(data.list);
                setTotalCount(data.count);
            })
            .catch(err=>{throw err});
    },[props,pageNow]);
    useEffect(()=>{
        if(totalCount!=0){
            setExistPrev(pageNow!=0);
            setExistNext(totalCount/10 -pageNow!=0);

        }
    },[totalCount,pageNow])


    return (
        <div>
            가맹점 목록
            {/*{storeList[0] &&*/}
            {/*storeList.map((store, i)=>(*/}
            {/*    <div>*/}
            {/*        <h3>{store.storeName}</h3>*/}
            {/*        <p>{"뭐든 있겠지"}</p>*/}
            {/*        <h4>{'뭐든 있어'}</h4>*/}
            {/*        {existPrev&&<button onClick={setPageNow(pageNow-1)}>이전</button>}*/}
            {/*        {existNext&&<button onClick={setPageNow(pageNow+1)}>다음</button>}*/}
            {/*    </div>*/}
            {/*))*/}

            {/*}*/}
        </div>
    );
};

export default StoreChatbot;