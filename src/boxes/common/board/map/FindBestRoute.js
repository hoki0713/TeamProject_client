import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    GoogleMap,
    Marker,
    InfoWindow, LoadScript, Polyline
} from "@react-google-maps/api";
import Geocode from 'react-geocode'
import {homeIcon2,homeIcon,arrowMarker} from "./mapIcons/imgIndex";
import {libraries} from "./FindByMap";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");


function FindBestRoute() {

    const [lineShow, setLineShow] = useState(true);
    const [center, setCenter] = useState({lat: 0, lng: 0})
    const [map, setMap] = useState(null);
    const [inputValue,setInputValue] =useState("")
    let markers = [];
    let markDetail = {};
    const mapRef = useRef();
    const pathCoordinates = [
        center,
        {lat: 37.746897, lng: 127.040861}
    ];
    const onMapLoad = useCallback(map => {
        mapRef.current = map;
    }, []);
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    const containerStyle = {
        width: '100%',
        height: '600px'
    };
    var searchNames = ['Sydney', 'Melbourne', 'Brisbane',
        'Adelaide', 'Perth', 'Hobart'];
    const getLatLng = (location) => {
        Geocode.fromAddress(location).then(
            response => {
                const resLatLng = response.results[0].geometry.location;
                setCenter({lat: resLatLng.lat, lng: resLatLng.lng})
                console.log(`getLatLng ${resLatLng.lat} ${resLatLng.lng}`);
            },
            error => {
                console.error(error);
            }
        );
    }
    useEffect(() => {
        getLatLng(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr);
    }, [])


    const Map=()=>{
        return(<></>)
    }


    return (<>
        <h3>&nbsp;&nbsp;최적 경로 찾아보기</h3><br/>
        <table>
            <tr>
                <td className="first_td">
                    <LoadScript
                        googleMapsApiKey="AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY"
                        libraries={libraries}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            onUnmount={onUnmount}
                            zoom={15}
                            onLoad={onMapLoad}>
                            <Marker
                                position={center}
                                icon={{
                                    url: homeIcon,
                                    scaledSize: {width: 40, height: 40},
                                }}
                                title={'집'}
                                animation={2}
                            />
                            <Marker position={{lat: 37.746897, lng: 127.040861}}
                                    icon={{
                                        url: arrowMarker,
                                        scaledSize: {width: 40, height: 40},
                                    }}
                            />
                            <Polyline
                                path={pathCoordinates}
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
                <td className="second_td">
                    <table>
                        <tr><td>{
                        }</td></tr>
                        <tr><td>
                            
                        </td></tr>
                    </table>
                </td>
            </tr>
        </table>
    </>)
}

export default FindBestRoute;