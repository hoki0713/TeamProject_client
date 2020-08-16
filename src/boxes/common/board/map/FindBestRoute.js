import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    GoogleMap,
    Marker,
    InfoWindow, LoadScript, Polyline,
} from "@react-google-maps/api";
import Geocode from 'react-geocode'
import {
    homeIcon,
    arrowMarker,
} from "./mapIcons/imgIndex";
import {libraries} from "./FindByMap";
import axios from "axios";
import {Button,ListGroup} from "react-bootstrap";

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
    const [dropShow,setDropShow]=useState(false);
    const [shortSearched, setShortSearched] = useState([]);
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


     function getshorList(){
         setShortSearched([{storeName:''},{storeName:''},{storeName:''}]);
        if(inputValue){
           axios.get(`http://localhost:8080/stores/realTimeSearch/${inputValue}`)
                .then(({data})=>{
                    if(data.list!=0){
                        setShortSearched(data.list);
                        (shortSearched.length!=0)?setDropShow(true):setDropShow(false)
                    }
                    else{console.log(data.msg);
                        setShortSearched([{storeName:''},{storeName:''},{storeName:''}])
                        setDropShow(false);}
                })
                .catch(err=>{console.log(err);throw err; })
        }
    }//실시간 검색 드롭다운 함수
    useEffect(()=>{
        console.log("useEffect getsearched");
        setDropShow(false);
        getshorList();
    },[inputValue]) //검색 드롭다운 유즈이펙트
    const realTimeSearch=e=>{
        e.preventDefault();
        let value = e.target.value;
        if(value.charAt[0]!='') setInputValue(e.target.value);
    } //검색창 온체인지 함수


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
    }//get user latitude and longitude from user address


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
    }//최단거리 구하기

    const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 4
    };
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
        console.log("useEffect getStoreList")
        if(!stores[0]) {
            axios.get(`http://localhost:8080/stores/mapClick/의정부`)
                .then(({data})=>{
                    setStores(data.list);
                })
                .catch(err=>{throw(err)});
        };

    },[stores]);
    return (<>
        <h3>&nbsp;&nbsp;최적 경로 찾아보기</h3><br/>
        <table>
            <tr><td>
                <div className="first_td">
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
                                >
                                    {infoShow&&<InfoWindow
                                        key={i}
                                        position={temRoutes[bestWay[i]]}
                                    ><div><h6>{i+1}</h6></div></InfoWindow>}
                                </Marker>

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
                                    strokeColor: "#053c55",
                                    strokeOpacity: 0,
                                    strokeWeight: 3,

                                    icons: [
                                        {
                                            icon:
                                            lineSymbol,
                                            // {path:window.google.maps.SymbolPath.FORWARD_OPEN_ARROW},//화살표
                                            //strokeOpacity 값 필요, repeat 픽셀 늘려야 함
                                            offset: "0",
                                            repeat: "20px"
                                        }
                                    ]
                                }}
                            />}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </td>
                <td>
                    <div className="second_td">
                        <div className={"route_input"}>

                            <button onClick={()=>getBestSeq(homePosit,temRoutes)}>거리계산</button>
                            <button onClick={e=>{
                                e.preventDefault();
                                for (let i=0; i< temRoutes.length;i++){
                                    pathCoordinates.push(temRoutes[bestWay[i]]);
                                }
                                setInfoShow(true);
                            }}>getway</button>
                            <p>가장빠른 장보기 경로 찾기</p>
                            <ListGroup>
                                <ListGroup.Item><h6>출발  우리집:&nbsp;{myLoca}</h6></ListGroup.Item>
                                {temRoutes[bestWay[0]] && <ListGroup.Item><h6>&#62;&#62;1번 경유지&#09;{temRoutes[bestWay[0]].storeName}</h6></ListGroup.Item>}
                                {temRoutes[bestWay[1]] && <ListGroup.Item><h6>&#62;&#62;2번 경유지&#09;{temRoutes[bestWay[1]].storeName}</h6></ListGroup.Item>}
                                {temRoutes[bestWay[2]] && <ListGroup.Item><h6>&#62;&#62;3번 경유지&#09;{temRoutes[bestWay[2]].storeName}</h6></ListGroup.Item>}
                                <ListGroup.Item><h6>도착  우리집:&nbsp;{myLoca}</h6></ListGroup.Item>
                            </ListGroup>
                            <div className={'route_box'}>
                                {temRoutes.length<3 &&
                                <table className={'route_table'}>
                                <tr><td><button className={'addB'}>+</button></td>
                                    <td><text className={'storeNameBox'}>경로추가하기</text></td></tr>
                            </table>}
                            </div>
                            <div>
                            <input className={"searchB"} onChange={e=> {realTimeSearch(e);}}/>
                            <Button variant="success">Success</Button>
                            </div>

                            {inputValue && dropShow &&
                            <table className={'searchDown'}>
                                <tr><td>{shortSearched[0] && shortSearched[0].storeName}</td></tr>
                                <tr><td>{shortSearched[1] && shortSearched[1].storeName}</td></tr>
                                <tr><td>{shortSearched[2] && shortSearched[2].storeName}</td></tr>
                            </table>
                            }
                        </div>
                    </div>
                </td></tr>
        </table>
    </>)
}

export default FindBestRoute;