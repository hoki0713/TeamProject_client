import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    GoogleMap,
    Marker,
    InfoWindow, LoadScript, Polyline
} from "@react-google-maps/api";
import Geocode from 'react-geocode'
import {
    homeIcon,
    arrowMarker,
} from "./mapIcons/imgIndex";
import {libraries} from "./FindByMap";
import axios from "axios";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");


const FindBestRoute=()=> {

    const [lineShow, setLineShow] = useState(true);// 폴리라인 조건부랜더링
    const [center, setCenter] = useState({lat: 37.73633262, lng: 127.0447991}); //지도 센터 좌표
    const [myLoca,setMyLoca] = useState("");
    const [infoShow, setInfoShow] =useState(false);
    const [bestWay,setBestWay] = useState([])
    const [map, setMap] = useState(null);
    const [inputValue,setInputValue] =useState(""); //검색어
    const [stores, setStores] =useState([]);
    const [homePosit,setHomePosit]=useState({lat: 37.73633262, lng: 127.0447991});
    let markers = []; //경로 마커 좌표들 추가 제거 가능한 컬렉션
    let markDetail = {}; // 마커 디테일
    const mapRef = useRef();

    const onMapLoad = useCallback(map => {
        mapRef.current = map;
    }, []);
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    const containerStyle = {
        width: '100%',
        height: '600px'
    };// 지도 스타일
    const realTimeSearch=e=>{
        e.preventDefault();
        setInputValue(e.target.value);
        //실시간 검색 드롭다운 함수
    }
    let temRoutes =[
        {lat: 37.746897, lng: 127.040861},
        {lat: 37.745897, lng: 127.040831},
        {lat: 37.746197, lng: 127.030861},
    ]

    const getLatLng = (location) => {
        Geocode.fromAddress(location).then(
            response => {
                const resLatLng = response.results[0].geometry.location;
                alert(`받아온 좌표${JSON.stringify(resLatLng)}`)
                setHomePosit({lat: resLatLng.lat, lng: resLatLng.lng});
                setCenter(homePosit);
                console.log(`getLatLng ${resLatLng.lat} ${resLatLng.lng}`);
            },
            error => {
                console.error(error);
            }
        );
    }
    const getBestSeq=(homePosition, stopOverList)=>{
        const homePosit = homePosition;// start, end position
        const stopOver = stopOverList; // middle positions, must be like [{lat: 0, lng: 0}, ...]
        let results = [];
        let index =0;
        for(let i = 0;i<stopOver.length;i++){
            for(let j = 0;j<stopOver.length;j++){
                for(let k = 0;k<stopOver.length;k++){
                    if(i!=j&&j!=k&&k!=i){
                        let ways = [i,j,k]
                        results[index]={way: ways, distance:(
                                Math.sqrt(Math.pow((homePosit.lat-stopOver[i].lat),2)+Math.pow((homePosit.lng - stopOver[i].lng),2))+
                                Math.sqrt(Math.pow((stopOver[i].lat-stopOver[j].lat),2)+Math.pow((stopOver[i].lng - stopOver[j].lng),2))+
                                Math.sqrt(Math.pow((stopOver[j].lat-stopOver[k].lat),2)+Math.pow((stopOver[j].lng - stopOver[k].lng),2))+
                                Math.sqrt(Math.pow((homePosit.lat-stopOver[k].lat),2)+Math.pow((homePosit.lng - stopOver[k].lng),2))
                            )};
                        index++
                    }

                }}
        }

        const forSortList = [];
        results.map(elem=>{
            forSortList.push(elem.distance)
        });
        for(let i=0;i<results.length;i++){
            if(Math.min.apply(null,forSortList)==results[i].distance){
                setBestWay(results[i].way)
            };
        };


    }
    let pathCoordinates = [
        center,
        temRoutes[bestWay[0]],
        temRoutes[bestWay[1]],
        temRoutes[bestWay[2]],
        center
    ];// 경로간 라인 그리는 path좌표
    useEffect(() => {
        setMyLoca(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr)
        getLatLng(myLoca);
    }, [homePosit]); // 주소로 유저 좌표 가져오기
    useEffect(()=>{

        console.log(pathCoordinates)
    },[pathCoordinates])

    useEffect(()=>{
        console.log("useEffect getStoreList")
        if(!stores[0]) {
            axios.get(`http://localhost:8080/stores/mapClick/의정부`)
                .then(({data})=>{
                    let temList =[]
                    data.list.map(elem=>{
                        temList.push(elem)
                    });
                    setStores(temList);
                })
                .catch(err=>{throw(err)});
        };

    },[stores]);
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
                            {temRoutes.map((route, i) => (
                                <><Marker
                                    key={i}
                                    position={temRoutes[bestWay[i]]}
                                    onClick={()=>{
                                    }}
                                    icon={{
                                        url: arrowMarker,
                                        scaledSize: {width: 40, height: 40},
                                    }}
                                    animation={4}
                                    title={`${i+1}`}
                                />
                                {infoShow&&<InfoWindow
                                        key={i}
                                        position={temRoutes[bestWay[i]]}
                                    ><div><h1>{i+1}</h1></div></InfoWindow>}
                                    </>

                            ))}
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


                            {infoShow &&<Polyline
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
                            />}
                        </GoogleMap>
                    </LoadScript>
                </td>
                <td className="second_td">
                    <table className={"route_input"}>
                        <tr><td><h5>우리집:&nbsp;{myLoca}</h5></td></tr>
                        <button onClick={()=>getBestSeq(homePosit,temRoutes)}>거리계산</button>
                        <button onClick={e=>{
                            e.preventDefault();
                            for (let i=0; i< temRoutes.length;i++){

                                console.log(`tems${JSON.stringify(temRoutes[bestWay[i]])}`)
                                pathCoordinates.push(temRoutes[bestWay[i]]);
                            }
                            setInfoShow(true);
                        }}>getway</button>
                        {
                            <tr><td>
                            <p>경로</p>

                        </td></tr>}
                        <tr><td><input onChange={e=> {
                            realTimeSearch(e)
                        }
                        }/></td></tr>
                        <tr><td><p className="dropdown-item">검색드롭다운</p></td></tr>
                    </table>
                </td>
            </tr>
        </table>
    </>)
}

export default FindBestRoute;