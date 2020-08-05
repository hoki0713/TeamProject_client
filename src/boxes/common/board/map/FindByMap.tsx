import React, {useEffect, useState} from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker, } from 'react-naver-maps';
import side from './side.jpg'
import './map.css'
import {MapModal, StoreReport} from "./Modals";
import axios from 'axios'

const STORE_LIST = "STORE_LIST"

export const storeAction = data => ({type:STORE_LIST, payload: data})
export const storeReducer =(state={},action)=>{
    switch (action.type) {
        case STORE_LIST:return action.payload;
        default: return state;
    }
}
export const mapLocathunk = searchWD =>dispatch=>{
    axios.get('http://localhost:8080/stores/list')
        .then(({data})=>{
            dispatch(storeAction(data))
            console.log(`${data.list[0].latitude},${data.list[0].longitude}`)
        })
        .catch(err=>{throw(err)})
}



const FindByMap=()=> {
    const storeList:any[]=[]
    const [modalShow, setModalShow] = useState(false);
    const [loca, setLoca]=useState(false);
    const ncpId = 'lyiy7i7pk0';
    const title ='서강대학교';
    const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
    const [firstLoca,setFirstLoca]= useState({lat: 37.736997, lng: 127.034891});
    const [secondLoca]=useState({lat: 37.746097, lng: 127.039861});
    const [thirdLoca]=useState({lat: 37.746097, lng: 127.094861});
    const [center, setCenter]=useState({lat: 37.746997, lng: 127.034861})
    const handleChange=()=>{if(!loca){setLoca(true); setCenter({lat:37.553080,lng: 126.972550})}else {setLoca(false);}};
    const getStoreList=()=>{

    }
    useEffect((()=>{
        getStoreList()
    }),[])

    return (
          <>
              <h3>지도로 찾기</h3>
              <MapModal show={modalShow} onHide={() => setModalShow(false)} />

              <table className="findmap">
                  <tr><td>
                      <h5>내 위치</h5>
                      <label className="switch">
                          <input type="checkbox"  onChange={handleChange}/>
                          <span className="slider round"/>
                      </label>

                  </td>
                      <td>{loca&&<h6>{myLoca}</h6>}</td>
                        <td></td>
                  </tr>
                  <tr><td colSpan={2} className="td-left">
                      <RenderAfterNavermapsLoaded
                      ncpClientId={ncpId}
                      error={<p>Maps Load Error</p>}
                      loading={<p>Maps Loading...</p>}
                  >
                      <NaverMap
                          mapDivId={'find-map'}
                          className="map"
                          defaultCenter={center} // 지도 초기 위치
                          defaultZoom={13} // 지도 초기 확대 배율
                      >
                          <Marker
                          position={firstLoca}
                          title={title}
                          animation={0}
                          onClick={()=>{setModalShow(true)}}
                          />
                          <Marker
                              position={secondLoca}
                              onClick={()=>{alert('22')}}
                              title={title}
                              animation={0}
                          />
                          <Marker
                              position={thirdLoca}
                              onClick={()=>{alert('33')}}
                              title={title}
                              animation={0}
                          />

                          {
                              storeList.map((store, i) => (
                                  <Marker
                                      key={i}
                                      position={{lat:store.latitude, lng: store.longitude}}
                                      animation={0}
                                      onClick={()=>{alert(store.storeName)}}
                                  >
                                  </Marker>
                              ))
                          }

                      </NaverMap>
                  </RenderAfterNavermapsLoaded></td>
                      <td className="td-right">
                          <table className="mapSide">
                            <tr><td><img src={side} alt="사이드이미지"/></td></tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </>
  );
}

export default FindByMap