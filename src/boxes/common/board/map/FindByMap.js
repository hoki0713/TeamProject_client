import React, {useEffect, useState} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    Polyline
} from "react-google-maps";
import side from './side.jpg'
import Geocode from 'react-geocode'
import './map.css'
import {MapModal} from "./Modals";
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");

const STORE_LIST = "STORE_LIST"

export const storeAction = data => ({type:STORE_LIST, payload: data})
export const storeReducer =(state={},action)=>{
    switch (action.type) {
        case STORE_LIST:return action.payload;
        default: return state;
    }
}
export const storeThunk = () =>dispatch=>{
    console.log("storeThunk")
    if(!storeList[0])
        axios.get('http://localhost:8080/stores/ui')
        .then(({data})=>{
            dispatch(storeAction(data))
            console.log(`1번${data.list[0].latitude},${data.list[0].longitude}`)
            data.list.forEach(elem=>{
                storeList.push(elem)
            });
            console.log(JSON.stringify(storeList[0]))
        })
        .catch(err=>{throw(err)});

}
export const storeList=[]

export const FindMapMarker=({setModalShow})=>{

    return(
        <div>
            {storeList.map((store, i) => (
                <Marker
                    key={i}
                    position={{lat:store.latitude, lng: store.longitude}}
                    animation={1}
                    onClick={()=>{
                    setModalShow(true);
                    }}
                    title={store.storeName}
                />))}
        </div>
    )
}



const FindByMap=()=> {

    const [modalShow, setModalShow] = useState(false);
    const [loca, setLoca]=useState(false);
    const [storeName,setStoreName]=useState("")
    const [storeInfo,setStoreInfo]=useState({})
    const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
    const [center, setCenter]=useState({lat: 37.746997, lng: 127.044861})
    const handleChange=()=>{if(!loca){setLoca(true); setCenter({lat: 37.746897, lng: 127.040861})}else {setLoca(false);}};
    const dispatch = useDispatch()
    const FindMap = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={16}
            defaultCenter={center}
        >
        <FindMapMarker  setModalShow={setModalShow} />
        </GoogleMap>));




    useEffect((()=>{
        dispatch(storeThunk())
    }),[])

    return (
          <>
              <h3>지도로 찾기</h3>


              <MapModal  show={modalShow} onHide={() => setModalShow(false)} />

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
                      <FindMap
                          storeInfo={storeInfo}
                          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY&v=3.exp&libraries=geometry,drawing,places"
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `600px` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                      />
                  </td>
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