import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Geocode from "react-geocode";
import {appKey} from "../../map/mapUtils/mapatt";
import {Link} from "react-router-dom";
import {StoreSearchContext} from "../../../../../items/context/StoreSearchContext";
import {useHistory} from "react-router";
import {LoginedCheckContext} from "../../../../../items/context/LoginedCheckContext";
Geocode.setApiKey(appKey);
const RecoStores = () => {
    const [homePosit, setHomePosit] = useState({});
    const [storeList,setStoreList] = useState([]);
    const {setStore}=useContext(StoreSearchContext);
    const {loginedCheck} = useContext(LoginedCheckContext);
    const history = useHistory();
    useEffect(()=>{
        if(loginedCheck){console.log(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr);
        Geocode.fromAddress(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr).then(
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
        if(homePosit.lat && loginedCheck){axios.get(`http://localhost:8080/stores/chatbotRecoMain/${homePosit.lat}/${homePosit.lng}`)
            .then(({data})=>{
                setStoreList(data);
            })
            .catch(err=>{throw err});}
    },[homePosit])
    return (
       <> {(loginedCheck)?<div>
            <>추천 가맹점</><br/>
            {(storeList[0])?
                storeList.map((store, i)=>(
                            <div key={i} style={{padding:4}}>
                                <img
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
        </div>:
           <><h3>로그인 해주세요</h3>
               <button onClick={()=>history.push('/account/login')}>로그인 하러가기</button></>
       }</>
    );
};

export default RecoStores;