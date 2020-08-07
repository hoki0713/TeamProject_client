import React, {useEffect, useState} from 'react';
import {} from 'react-google-maps';
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");
const StoreMap = () => {
    const linePath=[
        {lat: 37.551191, lng: 126.940970},
        {lat: 37.550191, lng: 126.940970}
    ] // 라인 위치 지정
    const [modalShow, setModalShow] =useState(false);
    const [loca,setLoca] = useState(false); // 사용자 위치 on/off
    const [center, setCenter]=useState({lat: 37.746997, lng: 127.034861}); // 맵 중심 위치 설정
    const [state,setState] =useState('');
    const[area,setArea]= useState("");
    const [mapPosition, setMapPosition]=useState({lat:0,lng:0})
    const [markerPosition,setMarkerPosition]=useState({lat:0,lng:0})
    useEffect(()=>{
            if(navigator.geolocation){ navigator.geolocation.getCurrentPosition(position => {

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                setMapPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }),
                    setMarkerPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })

            })}
        }
    )


    const handleChange=()=>{if(!loca){setLoca(true); setCenter({lat:37.553080,lng: 126.972550})}else {setLoca(false);}};
    return (
        <div>

        </div>
    );
};

export default StoreMap;