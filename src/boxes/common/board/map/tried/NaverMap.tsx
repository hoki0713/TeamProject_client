// import React, {useEffect, useState} from 'react';
// import { RenderAfterNavermapsLoaded, NaverMap, Marker} from 'react-naver-maps';
// import side from './side.jpg'
// import './map.css'
// import {MapModal, StoreReport} from "./Modals";
// import axios from 'axios'
// import {setFlagsFromString} from "v8";
//
// const GET_STORELOCA='GET_STORELOCA'
//
// export const mapLocaAction = data => ({type:GET_STORELOCA, payload: data})
// export const mapLocaReducer =(state={},action)=>{
//     switch (action.type) {
//         case GET_STORELOCA:return action.payload;
//         default: return state;
//     }
// }
// export const mapLocathunk = searchWD =>dispatch=>{
//     axios.get(`http://localhost:8080/stores/location/${searchWD}`)
//         .then(res=>{
//             dispatch(mapLocaAction(res.data))
//         })
//         .catch(err=>{throw(err)})
// }
//
//
//
//
//
//
// const FindByMap=()=> {
//
//     const [modalShow, setModalShow] = useState(false);
//     const [loca, setLoca]=useState(false);
//     const ncpId = 'lyiy7i7pk0';
//     const title ='서강대학교';
//     const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
//     const [firstLoca,setFirstLoca]= useState({lat: 37.551191, lng: 126.940970});
//     const [secondLoca]=useState({lat: 37.551180, lng: 126.952200});
//     const [thirdLoca]=useState({lat: 37.553980, lng: 126.972550});
//     const [center, setCenter]=useState({lat: 37.551191, lng: 126.940970})
//     const handleChange=()=>{if(!loca){setLoca(true); setCenter({lat:37.553080,lng: 126.972550})}else {setLoca(false);}};
//     return (
//         <>
//             <h3>지도로 찾기</h3>
//             <MapModal show={modalShow} onHide={() => setModalShow(false)} />
//
//             <table className="findmap">
//                 <tr><td>
//                     <h5>내 위치</h5>
//                     <label className="switch">
//                         <input type="checkbox"  onChange={handleChange}/>
//                         <span className="slider round"/>
//                     </label>
//
//                 </td>
//                     <td>{loca&&<h6>{myLoca}</h6>}</td>
//                     <td></td>
//                 </tr>
//                 <tr><td colSpan={2} className="td-left">
//                     <RenderAfterNavermapsLoaded
//                         ncpClientId={ncpId}
//                         error={<p>Maps Load Error</p>}
//                         loading={<p>Maps Loading...</p>}
//                     >
//                         <NaverMap
//                             mapDivId={'find-map'}
//                             className="map"
//                             defaultCenter={center} // 지도 초기 위치
//                             defaultZoom={13} // 지도 초기 확대 배율
//                         >
//                             <Marker
//                                 position={firstLoca}
//                                 title={title}
//                                 animation={0}
//                                 onClick={()=>{setModalShow(true)}}
//                             />
//                             <Marker
//                                 position={secondLoca}
//                                 onClick={()=>{alert('22')}}
//                                 title={title}
//                                 animation={0}
//                             />
//                             <Marker
//                                 position={thirdLoca}
//                                 onClick={()=>{alert('33')}}
//                                 title={title}
//                                 animation={0}
//                             />
//                         </NaverMap>
//                     </RenderAfterNavermapsLoaded></td>
//                     <td className="td-right">
//                         <table className="mapSide">
//                             <tr><td><img src={side} alt="사이드이미지"/></td></tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
//         </>
//     );
// }
//
// export default FindByMap
import React from 'react';

const NaverMap = () => {
    return (
        <div>
            
        </div>
    );
};

export default NaverMap;