import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Geocode from "react-geocode";
import {appKey} from "../../map/mapUtils/mapatt";
import {Link} from "react-router-dom";
import {StoreSearchContext} from "../../../../../items/context/StoreSearchContext";
Geocode.setApiKey(appKey);
const RecoStores = (props) => {
    const [homePosit, setHomePosit] = useState({});
    const [storeList,setStoreList] = useState([]);
    const {setStore}=useContext(StoreSearchContext);
    useEffect(()=>{
        console.log(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr);
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
        );
    },[])
    useEffect(()=>{
        console.log(homePosit);
        if(homePosit.lat){axios.get(`http://localhost:8080/stores/chatbotRecoMain/${homePosit.lat}/${homePosit.lng}`)
            .then(({data})=>{
                setStoreList(data);
            })
            .catch(err=>{throw err});}
    },[homePosit])
    return (
        <div>
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
        </div>
    );
};

export default RecoStores;