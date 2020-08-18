import React, { useEffect, useState, useCallback, useRef } from "react";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";
import "./map.css";
import {
  homeIcon,
  hospIcon,
  chinaIcon,
  conviStore,
  drug,
  cafe,
  hotelIcon,
  soju,
  bab,
  normal,
  recom,
} from "./mapIcons/imgIndex";
import { MapModal, Star } from "./Modals";
import axios from "axios";
import { libraries, containerStyle } from "./mapUtils/mapatt";
import Geocode from "react-geocode";
import StarAvg from "./StarAvg";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");

const FindByMap = ({ isLogined }) => {
  const [map, setMap] = useState(null);
  const [recoList, setRecoList] = useState([]);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const [center, setCenter] = useState({ lat: 37.73633262, lng: 127.0447991 });
  const [modalShow, setModalShow] = useState(false);
  const [homePosit, setHomePosit] = useState({});
  const [storeInfo, setStoreInfo] = useState({});
  const [myLoca, setMyLoca] = useState("");
  const [storeList, setStoreList] = useState([]);
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    setMap(mapRef.current);
  }, []);

  const showHome = () => {
    setCenter({ lat: homePosit.lat, lng: homePosit.lng });
    if (center === homePosit) window.location.reload();
  };
  const getLatLng = (location) => {
    Geocode.fromAddress(location).then(
      (response) => {
        const resLatLng = response.results[0].geometry.location;
        setHomePosit({
          lat: Number(resLatLng.lat),
          lng: Number(resLatLng.lng),
        });
        setCenter({ lat: Number(resLatLng.lat), lng: Number(resLatLng.lng) });
      },
      (error) => {
        console.error(error);
      }
    );
  }; //get user latitude and longitude from user address

  useEffect(() => {
    console.log(isLogined); //check 하고 없애기
    if (isLogined) {
      setMyLoca(
        JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr
      );
    }
  }, [isLogined]);

  useEffect(() => {
    if (isLogined) {
      getLatLng(myLoca);
    }
  }, [myLoca]);

  useEffect(() => {
    console.log("useEffect getStoreList");
    if (!storeList[0]) {
      if (!isLogined) {
        axios
          .get(
            `http://localhost:8080/stores/mapClick/${sessionStorage.getItem("")}`
          )
          .then(({ data }) => {
            if (data.list.length > 0) {
              let temList = [];
              data.list.forEach((elem) => {
                switch (elem.storeType) {
                  case "의원":
                    elem.icon = hospIcon;
                    temList.push(elem);
                    return;
                  case "중국식":
                    elem.icon = chinaIcon;
                    temList.push(elem);
                    return;
                  case "편의점":
                    elem.icon = conviStore;
                    temList.push(elem);
                    return;
                  case "약국":
                    elem.icon = drug;
                    temList.push(elem);
                    return;
                  case "기타음료식품":
                    elem.icon = cafe;
                    temList.push(elem);
                    return;
                  case "숙박업":
                    elem.icon = hotelIcon;
                    temList.push(elem);
                    return;
                  case "주점":
                    elem.icon = soju;
                    temList.push(elem);
                    return;
                  case "일반한식":
                    elem.icon = bab;
                    temList.push(elem);
                    return;
                  default:
                    elem.icon = normal;
                    temList.push(elem);
                    return;
                }
              });
              setStoreList(temList);
            } else {
              alert("주변에 상점이 없습니다.");
            }
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  }, [storeList, recoList]);

  useEffect(() => {
    if (homePosit.lat) {
      console.log(homePosit);
      axios
        .get(
          `http://localhost:8080/stores/fromAddr/${homePosit.lat}/${homePosit.lng}`
        )
        .then(({ data }) => {
          let temList = [];
          let bestList = [];
          data.list.forEach((elem) => {
            switch (elem.storeType.toString()) {
              case "의원":
                elem.icon = hospIcon;
                temList.push(elem);
                return;
              case "중국식":
                elem.icon = chinaIcon;
                temList.push(elem);
                return;
              case "편의점":
                elem.icon = conviStore;
                temList.push(elem);
                return;
              case "약국":
                elem.icon = drug;
                temList.push(elem);
                return;
              case "기타음료식품":
                elem.icon = cafe;
                temList.push(elem);
                return;
              case "숙박업":
                elem.icon = hotelIcon;
                temList.push(elem);
                return;
              case "주점":
                elem.icon = soju;
                temList.push(elem);
                return;
              case "일반한식":
                elem.icon = bab;
                temList.push(elem);
                return;
              default:
                elem.icon = normal;
                temList.push(elem);
                return;
            }
          });
          let searchResultCount = "searchResultCount";
          temList.sort(function(a, b) {
            return b[searchResultCount] - a[searchResultCount];
          });
          for (let i = 0; i < 20; i++) {
            temList[i].icon = recom;
          }
          for (let i = 0; i < 5; i++) {
            bestList[i] = temList[i];
          }
          setRecoList(bestList);
          setStoreList(temList);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  }, [homePosit]);

  return (
    <>
      <h3>지도로 찾기</h3>
      {modalShow && (
        <MapModal
          isLogined={isLogined}
          modalClose={() => setModalShow(false)}
          storeInfo={storeInfo}
        />
      )}
      <table className="findmap">
        <tr>
          <td>
            {sessionStorage.getItem("accountDetail") && (
              <>
                <img
                  src={homeIcon}
                  alt={"집"}
                  onClick={(e) => {
                    e.preventDefault();
                    showHome();
                  }}
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                />
                <h6>내 위치</h6>
              </>
            )}
          </td>
          <td>
            <h6>{myLoca}</h6>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2} className="td-left">
            <LoadScript
              googleMapsApiKey="AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY"
              libraries={libraries}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                onUnmount={onUnmount}
                zoom={16}
                onLoad={onMapLoad}
              >
                {storeList.map((store, i) => (
                  <Marker
                    key={i}
                    position={{ lat: store.latitude, lng: store.longitude }}
                    onClick={() => {
                      setStoreInfo(store);
                      setCenter({ lat: store.latitude, lng: store.longitude });
                      setModalShow(true);
                    }}
                    title={store.storeName}
                    store={store}
                    animation={4}
                    icon={{
                      url: store.icon,
                      scaledSize: { width: 30, height: 30 },
                    }}
                  />
                ))}
                {isLogined && (
                  <Marker
                    position={homePosit}
                    icon={{
                      url: homeIcon,
                      scaledSize: { width: 40, height: 40 },
                    }}
                    title={"집"}
                    animation={2}
                  >
                    <InfoWindow>
                      <h6>우리집</h6>
                    </InfoWindow>
                  </Marker>
                )}
              </GoogleMap>
            </LoadScript>
          </td>
          <td className="td-right">
            <table className="mapSide">
              {recoList.map((store, i) => (
                <>
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <td className={"side_td_1"}>
                      <h7> &nbsp;추천!!</h7>
                      <img
                        alt={"storeIcon"}
                        src={store.icon}
                        style={{ width: 25, height: 25 }}
                      />
                    </td>
                    <td className={"side_td_2"}>
                      {" "}
                      <img
                        alt={"storeImg"}
                        src={store.imgUrl}
                        style={{ width: 60, height: 60 }}
                      />
                    </td>
                    <td className={"side_td_3"}>
                      {" "}
                      &nbsp;<strong>{store.storeName}</strong>
                      <br />
                      &nbsp;
                      <text className={"store_addr"}>{store.address}</text>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} />
                    <td className={"side_tr_2"}>
                      별점
                      <StarAvg />
                      &nbsp;
                      <img
                        alt={"star"}
                        src={
                          "https://media.istockphoto.com/vectors/five-stars-rating-vector-id1152705981"
                        }
                        width={50}
                        height={30}
                      />
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </td>
        </tr>
      </table>
    </>
  );
};
export default FindByMap;
