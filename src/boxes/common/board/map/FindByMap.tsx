import React from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker, } from 'react-naver-maps';
function FindByMap() {
  return (
      <div>
          <h1>지도로 찾기</h1>
          <RenderAfterNavermapsLoaded
              ncpClientId={'lyiy7i7pk0'}
              error={<p>Maps Load Error</p>}
              loading={<p>Maps Loading...</p>}
          >
              <NaverMap
                  mapDivId={'maps-getting-started-uncontrolled'}
                  style={{
                      width: '500px',
                      height: '500px',
                  }}
                  defaultCenter={{ lat: 37.5666103, lng: 127.105399}} // 지도 초기 위치
                  defaultZoom={13} // 지도 초기 확대 배율
              >
                  <Marker
                      position={{lat: 37.5666103, lng: 127.105399}}
                      onClick={()=>{alert('알러트이벤')}}
                      title={'잠깐뜨는 이름'}
                      animation={2}

                  />
              </NaverMap>
          </RenderAfterNavermapsLoaded>
      </div>
  );
}

export default FindByMap;