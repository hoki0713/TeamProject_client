import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { libraries, containerStyle, dottedLine } from "./mapUtils/mapatt";
import "./map.css";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");

const FindBestRoute = () => {
  const [center, setCenter] = useState({ lat: 37.73633262, lng: 127.0447991 }); //지도 센터 좌표
  const [myLoca, setMyLoca] = useState(""); // 사용자 주소 담는 state
  const [infoShow, setInfoShow] = useState(false); // 인포창 show
  const [bestWay, setBestWay] = useState([]); // 최단 경로 순서
  const [map, setMap] = useState(null);
  const [inputValue, setInputValue] = useState(""); //검색어
  const [stores, setStores] = useState([]);
  const [homePosit, setHomePosit] = useState({
    lat: 37.73633262,
    lng: 127.0447991,
  });
  const [dropShow, setDropShow] = useState(false); // 검색 드롭다운 show
  const [shortSearched, setShortSearched] = useState([]); // 드롭다운 검색 목록
  const [markerShow, setMarkerShow] = useState(false); // 마커 show
  const [paths, setPaths] = useState([]); //polyline pathCoordinate
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const [temRoutes, setTemRoutes] = useState([
    // {storeName:"",mainCode:"",storeType:"",storeTypeCode:0, address:"3. 주소",storePhone:"",latitude:37.746197,longitude:127.030861}
  ]);

  function getshorList() {
    if (inputValue) {
      axios
        .get(`http://localhost:8080/stores/realTimeSearch/${inputValue}`)
        .then(({ data }) => {
          if (data.list != 0) {
            setShortSearched(data.list);
            shortSearched.length != 0 ? setDropShow(true) : setDropShow(false);
          } else {
            setDropShow(false);
          }
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  } //실시간 검색 드롭다운 함수

  useEffect(() => {
    console.log("useEffect getsearched");
    setDropShow(false);
    getshorList();
  }, [inputValue]); //검색 드롭다운 유즈이펙트

  const realTimeSearch = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (value.charAt[0] != "") setInputValue(e.target.value);
  }; //검색창 온체인지 함수

  function selectRoute(routeInfo) {
    if (temRoutes.length < 3) {
      routeInfo.latitude = Number(routeInfo.latitude);
      routeInfo.longitude = Number(routeInfo.longitude);
      temRoutes.push(routeInfo);
    }
  } // 선택한 가게 루트에 추가하기

  const getLatLng = (location) => {
    Geocode.fromAddress(location).then(
      (response) => {
        const resLatLng = response.results[0].geometry.location;
        alert(`받아온 좌표${JSON.stringify(resLatLng)}`);
        setHomePosit({
          lat: Number(resLatLng.lat),
          lng: Number(resLatLng.lng),
        });
        setCenter(homePosit);
        console.log(`getLatLng ${resLatLng.lat} ${resLatLng.lng}`);
      },
      (error) => {
        console.error(error);
      }
    );
  }; //get user latitude and longitude from user address

  const getBestSeq = (homePosition, stopOverList) => {
    let homePosi = homePosition; // start, end position
    let stopOver = stopOverList; // middle positions, must be like [{lat: 0, lng: 0}, ...]
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
            if (i != j) {
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
              if (i != j && j != k && k != i) {
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
      results.map((elem) => {
        forSortList.push(elem.distance);
      });
      for (let i = 0; i < results.length; i++) {
        if (Math.min.apply(null, forSortList) === results[i].distance) {
          setBestWay(results[i].way);
        }
      }
    }
  }; //최단거리 구하기
  
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
  } //폴리라인 좌표 넣기
  const dropDownClick = (selectedStore) => {
    selectRoute(selectedStore);
    setInputValue("");
    getBestSeq(homePosit, temRoutes);
    setMarkerShow(true);
  }; //드롭다운 클릭, 경로추가
  const goNaver = (dir1Name, dir1Lat, dir1Lng, dir2Name, dir2Lat, dir2Lng) => {
    document.location.href = `
            http://map.naver.com/index.nhn?slng=${dir1Lng}&slat=${dir1Lat}&stext=${dir1Name}
            &elng=${dir2Lng}&elat=${dir2Lat}&etext=${dir1Name}&menu=route&pathType=1`;
  }; //네이버 네비 링크
  useEffect(() => {
    setMyLoca(JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr);
    getLatLng(myLoca);
  }, [homePosit]); // 주소로 유저 좌표 가져오기
  return (
    <>
      <h3>&nbsp;&nbsp;최적 경로 찾아보기</h3>
      <br />
      <table>
        <tr>
          <td>
            <div className="first_td">
              <LoadScript
                googleMapsApiKey="AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY"
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
                            // {path:window.google.maps.SymbolPath.FORWARD_OPEN_ARROW},//화살표
                            //strokeOpacity 값 필요, repeat 픽셀 늘려야 함
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
                      {temRoutes[0] && (
                        <ListGroup.Item>
                          <h6>
                            &#62;&#62;1번 경유지&#09;{temRoutes[0].storeName}
                            &#09;{temRoutes[0].address}
                          </h6>
                        </ListGroup.Item>
                      )}
                      {temRoutes[1] && (
                        <ListGroup.Item>
                          <h6>
                            &#62;&#62;2번 경유지&#09;{temRoutes[1].storeName}
                          </h6>
                        </ListGroup.Item>
                      )}
                      {temRoutes[2] && (
                        <ListGroup.Item>
                          <h6>
                            &#62;&#62;3번 경유지&#09;{temRoutes[2].storeName}
                          </h6>
                        </ListGroup.Item>
                      )}
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
                          {shortSearched[0] && (
                            <tr>
                              <td>
                                <button
                                  className={"addB"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    dropDownClick(shortSearched[0]);
                                  }}
                                >
                                  +
                                </button>
                                {shortSearched[0].storeName}{" "}
                              </td>
                            </tr>
                          )}
                          {shortSearched[1] && (
                            <tr>
                              <td>
                                <button
                                  className={"addB"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    dropDownClick(shortSearched[1]);
                                  }}
                                >
                                  +
                                </button>
                                {shortSearched[1].storeName}{" "}
                              </td>
                            </tr>
                          )}
                          {shortSearched[2] && (
                            <tr>
                              <td>
                                <button
                                  className={"addB"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    dropDownClick(shortSearched[2]);
                                  }}
                                >
                                  +
                                </button>
                                {shortSearched[2].storeName}{" "}
                              </td>
                            </tr>
                          )}
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
                            {temRoutes[bestWay[0]].storeName}&#09;
                            {temRoutes[bestWay[0]].address}
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
                          <h6>{temRoutes[bestWay[1]].storeName}</h6>
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
                          <h6>{temRoutes[bestWay[2]].storeName}</h6>
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
    </>
  );
};

export default FindBestRoute;
