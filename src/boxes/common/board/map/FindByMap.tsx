import React, {useState} from 'react';
// @ts-ignore
import { RenderAfterNavermapsLoaded, NaverMap, Marker, } from 'react-naver-maps';
import side from './side.jpg'
import './map.css'
function FindByMap() {
    const ncpId = 'lyiy7i7pk0';
    const title ='서강대학교';
    const handleChange=()=>{alert('change');};
    const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
    const [firstLoca,setFirstLoca]= useState({lat: 37.551191, lng: 126.940970});
    const [secondLoca, setSecondLoca]=useState({lat: 37.551180, lng: 126.952200});
    const [thirdLoca, setThirdLoca]=useState({lat: 37.553980, lng: 126.972550})
  return (
          <>
              <h3>지도로 찾기</h3>
              <table className="findmap">
                  <tr><td>
                      <h5>내 위치</h5>
                      <label className="switch">
                          <input type="checkbox"  onChange={handleChange}/>
                          <span className="slider round"></span>
                      </label>

                  </td>
                      <td><h6>{myLoca}</h6></td>
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
                            <tr><td><img src={side} alt="사이드이미지"/></td></tr>
                            {/*<tr><td>첫째칸</td></tr>*/}
                            {/*<tr><td>둘째칸</td></tr>*/}
                            {/*<tr><td>셋째칸</td></tr>*/}
                            {/*<tr><td>넷째칸</td></tr>*/}
                            {/*<tr><td>다섯째칸</td></tr>*/}
                          </table>
                      </td>
                  </tr>
              </table>
          </>
  );
}

export default FindByMap;