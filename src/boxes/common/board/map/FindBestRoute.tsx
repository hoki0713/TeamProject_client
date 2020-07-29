import React, {useState} from 'react';

import { RenderAfterNavermapsLoaded, NaverMap, Marker, } from 'react-naver-maps';
import Directions from "./Directions";
import { createStore } from 'redux'
import {rootReducer} from "./Directions";
import { Provider } from 'react-redux'
function FindBestRoute() {

  const ncpId = 'lyiy7i7pk0';
  const title ='서강대학교';
  const handleChange=()=>{alert('change');};
  const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
  const [firstLoca,setFirstLoca]= useState({lat: 37.551191, lng: 126.940970});
  const [secondLoca, setSecondLoca]=useState({lat: 37.551180, lng: 126.952200});
  const [thirdLoca, setThirdLoca]=useState({lat: 37.553980, lng: 126.972550});
  const store = createStore(rootReducer)
  return( <>
    <h3>최적 경로 찾아보기</h3>
    <table className="findmap">
      <tr>

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
              defaultCenter={firstLoca} // 지도 초기 위치
              defaultZoom={13} // 지도 초기 확대 배율
          >
            <Marker
                position={firstLoca}
                onClick={()=>{alert('알러트이벤')}}
                title={title}
                animation={1}
            ></Marker>
            <Marker
                position={secondLoca}
                onClick={()=>{alert('22')}}
                title={title}
                animation={1}
            />
            <Marker
                position={thirdLoca}
                onClick={()=>{alert('33')}}
                title={title}
                animation={1}
            />
          </NaverMap>
        </RenderAfterNavermapsLoaded></td>
        <td className="td-right">
          <table className="mapSide">
            <tr><td>
              <h3>경로검색</h3>
              <Provider store={store}><Directions/></Provider>

            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </>)
}

export default FindBestRoute;