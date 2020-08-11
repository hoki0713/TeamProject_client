import React, {useState} from 'react';
import Directions from "./Directions";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline
} from "react-google-maps";
import Geocode from 'react-geocode'
import {Provider, useStore} from 'react-redux'

const appKey="AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY"
Geocode.setApiKey(appKey);


function FindBestRoute() {
  const pathCoordinates = [
    {lat: 37.746997, lng: 127.044861},
    {lat: 37.746897, lng: 127.040861}
  ];
  const store=useStore()
  const [lineShow,setLineShow]=useState(false)
  const handleChange=e=>{
    e.preventDefault();
    alert('change');};
  const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
  const [firstLoca,setFirstLoca]= useState({lat: 37.746897, lng: 127.040861});
  const [secondLoca, setSecondLoca]=useState({lat: 37.551180, lng: 126.952200});
  const [thirdLoca, setThirdLoca]=useState({lat: 37.553980, lng: 126.972550});
  const [infoShow, setInfoShow]=useState(false)
  const BestRoute= withScriptjs(withGoogleMap(props =>
      <GoogleMap
          defaultCenter={firstLoca}
          defaultZoom={16}>
        <Marker
            defaultAnimation={2}
            defaultCursor={"pointer"}
            defaultDraggable={true}
            defaultLabel={"1"}
            defaultClickable={true}
            defaultTitle={"defaultTitle"}
            defaultPosition={{lat: 37.746997, lng: 127.044861}}
        />
        <Marker
            defaultAnimation={3}
            defaultCursor={"pointer"}
            defaultDraggable={true}
            defaultLabel={"2"}
            defaultClickable={true}
            defaultTitle={"인포창"}
            defaultPosition={{lat: 37.746897, lng: 127.040861}}
            onClick={()=>setInfoShow(true)}
        >
          {infoShow&&
          <InfoWindow onCloseClick={()=>setInfoShow(false)}>
            <h5>인포창</h5>
          </InfoWindow>}
        </Marker>
        <Polyline
            path= {pathCoordinates}
            visible={lineShow}
            options={{
              strokeColor: "#d502b9",
              strokeOpacity: 0.75,
              strokeWeight: 2,
              icons: [
                {
                  icon: '',
                  offset: "0",
                  repeat: "20px"
                }
              ]
            }}
        />
      </GoogleMap>
  ))



  return( <>
    <h3>최적 경로 찾아보기</h3>
    <table className="findmap">
      <tr>

        <td></td>
      </tr>
      <tr><td colSpan={2} className="td-left">

        <BestRoute containerElement={<div style={{ height: `600px` }} />}
                   mapElement={<div style={{ height: `100%` }} />}
                   googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${appKey}&v=3.exp&libraries=geometry,drawing,places`}
                   loadingElement={<div style={{ height: `100%` }} />}/>
      </td>
        <td className="td-right">
          <table className="mapSide">
            <tr><td>
              <h3>경로검색</h3>
              <Provider store={store}><Directions/></Provider>
              <button onClick={()=>setLineShow(true)}>검색</button>
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </>)
}

export default FindBestRoute;