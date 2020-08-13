import React, {useCallback, useRef, useState} from 'react';
import Directions from "./Directions";
import {
    GoogleMap,
    Marker,
    InfoWindow, LoadScript,Polyline
} from "@react-google-maps/api";
import Geocode from 'react-geocode'
import {Provider, useStore} from 'react-redux'
import {homeIcon} from "./mapIcons/imgIndex";
import {libraries} from "./FindByMap";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");


function FindBestRoute() {
  const pathCoordinates = [
    {lat: 37.746997, lng: 127.044861},
    {lat: 37.746897, lng: 127.040861}
  ];
  const store=useStore()
  const [lineShow,setLineShow]=useState(false)
  const [infoShow, setInfoShow]=useState(false);
    const [map, setMap] = useState(null);
    const mapRef = useRef();
    const onMapLoad = useCallback(map => {
        mapRef.current = map;
    }, []);
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    const containerStyle = {
        width: '600px',
        height: '600px'
    };


  return( <>
    <h3>최적 경로 찾아보기</h3>
    <table className="findmap">
      <tr>

        <td></td>
      </tr>
      <tr><td colSpan={2} className="td-left">
          <LoadScript
              googleMapsApiKey="AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY"
              libraries={libraries}>
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={{lat: 37.746897, lng: 127.040861}}
              onUnmount={onUnmount}
              zoom={16}
              onLoad={onMapLoad}>
              <Marker
                  position={{lat: 37.746897, lng: 127.040861}}
                  icon={{url: homeIcon,
                      scaledSize: {width:40, height:40},
                  }}
                  title={'집'}
                  animation={2}
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
          </LoadScript>
      </td>
        <td className="td-right">
          <table className="mapSide">
            <tr><td>
              <h3>경로검색</h3>
                  <Directions/>
              <button onClick={()=>setLineShow(true)}>검색</button>
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </>)
}

export default FindBestRoute;