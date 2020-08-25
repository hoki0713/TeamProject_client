import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {StoreSearchContext} from "../../../../../items/context/StoreSearchContext";
import Geocode from "react-geocode";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {LoginedCheckContext} from "../../../../../items/context/LoginedCheckContext";

const StarRank = () => {
    const [homePosit, setHomePosit] = useState({});
    const [storeList,setStoreList] = useState([]);
    const {setStore}=useContext(StoreSearchContext);
    const {loginedCheck} = useContext(LoginedCheckContext);
    const history = useHistory();
    useEffect(()=>{
        if(loginedCheck){Geocode.fromAddress(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr).then(
            (response) => {
                const resLatLng = response.results[0].geometry.location;
                setHomePosit({
                    lat: Number(resLatLng.lat),
                    lng: Number(resLatLng.lng),
                });
            },
            (error) => {
                console.error(error);
            }
        );}
    },[])
    useEffect(()=>{
        if(homePosit.lat &&loginedCheck){axios.get(`http://localhost:8080/stores/chatbotStarRank/${JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr.substring(4,8)}`)
            .then(({data})=>{
                setStoreList(data);
            })
            .catch(err=>{throw err});}
    },[homePosit])
    return (
       <> {(loginedCheck)?<div>
             <>우리 시 별점별 순위</><br/>
            {(storeList[0])?
                storeList.map((store, i)=>(
                        <div key={i} style={{padding:4}}>
                            {i+1}.&nbsp;&nbsp;<img
                            src={store.imgUrl}
                            alt={store.storeName}
                            width={30}
                            height={30}

                        />&nbsp;
                            <Link onClick={()=>setStore(store)} to={'/storeDetail'}>{store.storeName}</Link><br/>
                        </div>
                    )

                ):<>로딩중</>
            }
        </div>:<>로그인해주세요 <br/>
           <button onClick={()=>history.push('/account/login')}>로그인하기</button></>}</>
    );
};

export default StarRank;