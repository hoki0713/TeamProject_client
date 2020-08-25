import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    LoadScript,
    Polyline,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { homeIcon, arrowMarker } from "./mapIcons/imgIndex";
import axios from "axios";
import { Button, ListGroup } from "react-bootstrap";
import {libraries, containerStyle, dottedLine, appKey} from "./mapUtils/mapatt";
import "./map.css";

Geocode.setApiKey(appKey);

const FindBestRoute = () => {
    const [center, setCenter] = useState({});
    const [myLoca, setMyLoca] = useState("");
    const [infoShow, setInfoShow] = useState(false);
    const [bestWay, setBestWay] = useState([]);
    const [map, setMap] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [homePosit, setHomePosit] = useState({});
    const [dropShow, setDropShow] = useState(false);
    const [shortSearched, setShortSearched] = useState([]);
    const [markerShow, setMarkerShow] = useState(false);
    const [paths, setPaths] = useState([]);
    const [temRoutes] = useState([]);
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);


    function getshorList() {
        if (inputValue) {
            axios
                .get(`http://localhost:8080/stores/realTimeSearch/${inputValue}`)
                .then(({ data }) => {
                    if (data.list !== 0) {
                        setShortSearched(data.list);
                        shortSearched.length !== 0 ? setDropShow(true) : setDropShow(false);
                    } else {
                        setDropShow(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
        }
    }

    useEffect(() => {
        setDropShow(false);
        getshorList();
    }, [inputValue]);

    const realTimeSearch = (e) => {
        e.preventDefault();
        let value = e.target.value;
        if (value.charAt[0] !== "") setInputValue(e.target.value);
    };

    function selectRoute(routeInfo) {
        if (temRoutes.length < 3) {
            routeInfo.latitude = Number(routeInfo.latitude);
            routeInfo.longitude = Number(routeInfo.longitude);
            temRoutes.push(routeInfo);
        }
    }

    const getLatLng = (location) => {
        Geocode.fromAddress(location).then(
            response => {
                const resLatLng = response.results[0].geometry.location;
                setHomePosit({lat: Number(resLatLng.lat), lng: Number(resLatLng.lng)});
                setCenter({lat:Number(resLatLng.lat), lng: Number(resLatLng.lng)})
            },
            error => {
                console.error(error);
            }
        );
    }

    useEffect(()=>{
        setMyLoca(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr);
    },[sessionStorage]);

    useEffect(()=>{
        getLatLng(myLoca);
    },[myLoca]);

    const getBestSeq = (homePosition, stopOverList) => {
        let homePosi = homePosition;
        let stopOver = stopOverList;
        let results = [];
        let index = 0;
        switch (stopOverList.length) {
            case 1:
                console.log("switch 1");
                let tmpPaths = [
                    { lat: homePosi.lat, lng: homePosi.lng },
                    { lat: temRoutes[0].latitude, lng: temRoutes[0].longitude },
                    { lat: homePosi.lat, lng: homePosi.lng },
                ];
                setPaths(tmpPaths);
                break;
            case 2:
                console.log("switch 2");
                for (let i = 0; i < stopOver.length; i++) {
                    for (let j = 0; j < stopOver.length; j++) {
                        if (i !== j) {
                            let ways = [i, j];
                            results[index] = {
                                way: ways,
                                distance:
                                    Math.sqrt(
                                        Math.pow(Number(homePosi.lat) - stopOver[i].latitude, 2) +
                                        Math.pow(Number(homePosi.lng) - stopOver[i].longitude, 2)
                                    ) +
                                    Math.sqrt(
                                        Math.pow(stopOver[i].latitude - stopOver[j].latitude, 2) +
                                        Math.pow(stopOver[i].longitude - stopOver[j].longitude, 2)
                                    ) +
                                    Math.sqrt(
                                        Math.pow(Number(homePosi.lat) - stopOver[j].latitude, 2) +
                                        Math.pow(Number(homePosi.lng) - stopOver[j].longitude, 2)
                                    ),
                            };
                            index++;
                        }
                    }
                }
                break;
            case 3:
                console.log("switch 3");
                for (let i = 0; i < stopOver.length; i++) {
                    for (let j = 0; j < stopOver.length; j++) {
                        for (let k = 0; k < stopOver.length; k++) {
                            if (i !== j && j !== k && k !== i) {
                                let ways = [i, j, k];
                                results[index] = {
                                    way: ways,
                                    distance:
                                        Math.sqrt(
                                            Math.pow(homePosit.lat - stopOver[i].latitude, 2) +
                                            Math.pow(homePosit.lng - stopOver[i].longitude, 2)
                                        ) +
                                        Math.sqrt(
                                            Math.pow(stopOver[i].latitude - stopOver[j].latitude, 2) +
                                            Math.pow(
                                                stopOver[i].longitude - stopOver[j].longitude,
                                                2
                                            )
                                        ) +
                                        Math.sqrt(
                                            Math.pow(stopOver[j].latitude - stopOver[k].latitude, 2) +
                                            Math.pow(
                                                stopOver[j].longitude - stopOver[k].longitude,
                                                2
                                            )
                                        ) +
                                        Math.sqrt(
                                            Math.pow(homePosit.lat - stopOver[k].latitude, 2) +
                                            Math.pow(homePosit.lng - stopOver[k].longitude, 2)
                                        ),
                                };
                                index++;
                            }
                        }
                    }
                }
                break;
            default:
                return "경유지를 입력해주세요";
        }
        if (results.length !== 0) {
            const forSortList = [];
            results.map((elem) => forSortList.push(elem.distance));
            for (let i = 0; i < results.length; i++) {
                if (Math.min.apply(null, forSortList) === results[i].distance) {
                    setBestWay(results[i].way);
                }
            }
        }
    };

    function makePath(tmpRouteList) {
        let tmpPath = [];
        if (tmpRouteList.length > 1 || bestWay.length > 1) {
            tmpPath[0] = homePosit;
            for (let i = 0; i < tmpRouteList.length; i++) {
                tmpPath[i + 1] = {
                    lat: tmpRouteList[bestWay[i]].latitude,
                    lng: tmpRouteList[bestWay[i]].longitude,
                };
            }
            tmpPath[tmpRouteList.length + 1] = homePosit;
            console.log("tmpPath" + tmpPath);
            setPaths(tmpPath);
            console.log(tmpPath);
        }
    }

    const dropDownClick = (selectedStore) => {
        selectRoute(selectedStore);
        setInputValue("");
        getBestSeq(homePosit, temRoutes);
        setMarkerShow(true);
    };

    const goNaver = (dir1Name, dir1Lat, dir1Lng, dir2Name, dir2Lat, dir2Lng) => {
        window.open( `
            http://map.naver.com/index.nhn?slng=${dir1Lng}&slat=${dir1Lat}&stext=${dir1Name}
            &elng=${dir2Lng}&elat=${dir2Lat}&etext=${dir2Name}&menu=route&pathType=1`,'')
    };

    return (
        <div style={{"text-align" : "center"}}>
            <h2 className="mt-4">최적 경로 찾아보기</h2>
            <br />
            <table>
                <tr>
                    <td>
                        <div className="first_td">
                            <LoadScript
                                googleMapsApiKey={appKey}
                                libraries={libraries}
                            >
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    onUnmount={onUnmount}
                                    zoom={15}
                                    onLoad={onMapLoad}
                                >
                                    {markerShow &&
                                    temRoutes.map((route, i) => (
                                        <>
                                            <Marker
                                                key={i}
                                                position={{
                                                    lat: temRoutes[i].latitude,
                                                    lng: temRoutes[i].longitude,
                                                }}
                                                icon={{
                                                    url: arrowMarker,
                                                    scaledSize: { width: 40, height: 40 },
                                                }}
                                                animation={4}
                                                title={`${i + 1}`}
                                            >
                                                {infoShow && (
                                                    <InfoWindow
                                                        key={i}
                                                        position={temRoutes[bestWay[i]]}
                                                    >
                                                        <div>
                                                            <h6>{i + 1}</h6>
                                                        </div>
                                                    </InfoWindow>
                                                )}
                                            </Marker>
                                        </>
                                    ))}
                                    <Marker
                                        position={center}
                                        icon={{
                                            url: homeIcon,
                                            scaledSize: { width: 40, height: 40 },
                                        }}
                                        title={"집"}
                                        animation={2}
                                    />
                                    {infoShow && (
                                        <Polyline
                                            path={paths}
                                            visible={true}
                                            options={{
                                                strokeColor: "#053c55",
                                                strokeOpacity: 0,
                                                strokeWeight: 3,
                                                icons: [
                                                    {
                                                        icon: dottedLine,
                                                        offset: "0",
                                                        repeat: "20px",
                                                    },
                                                ],
                                            }}
                                        />
                                    )}
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </td>
                    <td>
                        <div className="second_td">
                            <div className={"route_input"}>
                                <p>가장빠른 장보기 경로 찾기</p>
                                {!infoShow ? (
                                    <div className={"preRoute"}>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                <h6>출발:&nbsp;{myLoca}</h6>
                                            </ListGroup.Item>
                                            {temRoutes[0]&&temRoutes.map((route,i)=>(
                                                <ListGroup.Item>
                                                    <h6>
                                                        {i+1}번째 &#09;{route.storeName} <br/>
                                                        &#09;{route.address}
                                                    </h6>
                                                </ListGroup.Item>
                                            ))}
                                            <ListGroup.Item>
                                                <h6>도착:&nbsp;{myLoca}</h6>
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <div className={"route_box"}>
                                            {temRoutes.length < 3 && (
                                                <div>
                                                    <button className={"addB"}>+</button>
                                                    <input
                                                        id={"searchInput"}
                                                        className={"searchB"}
                                                        onChange={(e) => {
                                                            realTimeSearch(e);
                                                        }}
                                                    />
                                                    <Button variant="success">검색</Button>
                                                </div>
                                            )}
                                        </div>
                                        {inputValue && dropShow && (
                                            <div className={"searchDown"}>
                                                <table>
                                                    {shortSearched[0]&&shortSearched.map((route,i)=>(
                                                        <tr>
                                                            <td>
                                                                <button
                                                                    className={"addB"}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        dropDownClick(route);
                                                                    }}
                                                                >
                                                                    +
                                                                </button>
                                                                {route.storeName}{" "}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={"postRoute"}>
                                        <strong>장보기 가장 빠른 경로</strong>
                                        <ListGroup>
                                            {temRoutes[bestWay[0]] && (
                                                <ListGroup.Item>
                                                    <strong>경로 1!</strong>
                                                    <h6>출발:&nbsp;{myLoca}</h6>
                                                    <h6>
                                                        &#62;&#62;&nbsp;{temRoutes[bestWay[0]].storeName}&#09;
                                                    </h6>
                                                    <button
                                                        className={"find_routeB"}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            goNaver(
                                                                myLoca,
                                                                homePosit.lat,
                                                                homePosit.lng,
                                                                temRoutes[bestWay[0]].storeName,
                                                                temRoutes[bestWay[0]].latitude,
                                                                temRoutes[bestWay[0]].longitude
                                                            );
                                                        }}
                                                    >
                                                        네이버 네비로 보기
                                                    </button>
                                                </ListGroup.Item>
                                            )}
                                            {temRoutes[bestWay[1]] && (
                                                <ListGroup.Item>
                                                    <strong>경로 2!</strong>
                                                    <h6>{temRoutes[bestWay[0]].storeName}</h6>
                                                    <h6>&#62;&#62;&nbsp;{temRoutes[bestWay[1]].storeName}</h6>
                                                    <button
                                                        className={"find_routeB"}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            goNaver(
                                                                temRoutes[bestWay[0]].storeName,
                                                                temRoutes[bestWay[0]].latitude,
                                                                temRoutes[bestWay[0]].longitude,
                                                                temRoutes[bestWay[1]].storeName,
                                                                temRoutes[bestWay[1]].latitude,
                                                                temRoutes[bestWay[1]].longitude
                                                            );
                                                        }}
                                                    >
                                                        네이버 네비로 보기
                                                    </button>
                                                </ListGroup.Item>
                                            )}
                                            {temRoutes[bestWay[2]] && (
                                                <ListGroup.Item>
                                                    <strong>경로 3!</strong>
                                                    <h6>{temRoutes[bestWay[1]].storeName}</h6>
                                                    <h6>&#62;&#62;&nbsp;{temRoutes[bestWay[2]].storeName}</h6>
                                                    <button
                                                        className={"find_routeB"}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            goNaver(
                                                                temRoutes[bestWay[1]].storeName,
                                                                temRoutes[bestWay[1]].latitude,
                                                                temRoutes[bestWay[1]].longitude,
                                                                temRoutes[bestWay[2]].storeName,
                                                                temRoutes[bestWay[2]].latitude,
                                                                temRoutes[bestWay[2]].longitude
                                                            );
                                                        }}
                                                    >
                                                        네이버 네비로 보기
                                                    </button>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item>
                                                <h6>도착:&nbsp;{myLoca}</h6>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                )}
                                {!infoShow ? (
                                    <button
                                        className="best_wayB"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            makePath(temRoutes);
                                            setInfoShow(true);
                                        }}
                                    >
                                        장보러 가는 가장 빠른 길!!
                                    </button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.reload();
                                        }}
                                    >
                                        되돌리기
                                    </Button>
                                )}
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default FindBestRoute;