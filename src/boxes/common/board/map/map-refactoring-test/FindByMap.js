import React, { useEffect, useState, useCallback, useRef } from "react";
import "react-google-maps";

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
} from "../mapIcons/imgIndex";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";

import side from "./side.jpg";
import StoreDetailModal from "./StoreDetailModal";
import Geocode from "react-geocode";
import "./map.css";
import axios from "axios";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");
const libraries = ["drawing"];

const FindByMap = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 37.746897, lng: 127.040861 });
  const [homePosit, setHomePosit] = useState({
    lat: 37.746897,
    lng: 127.040861,
  });
  const [storeId, setStoreId] = useState("");
  const [storeIdArr, setStoreIdArr] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});

  const [storeDetailModalShow, setStoreDetailModalShow] = useState(false);
  const [infoShow, setInfoShow] = useState(false);

  const [accountDetail, setAccountDetail] = useState(
    JSON.parse(sessionStorage.getItem("accountDetail") || "{}")
  );
  const [userAddr, setUserAddr] = useState("");
  const [userLatLng, setUserLatLng] = useState({ lat: 0, lng: 0 });

  const mapRef = useRef();

  const onUnmount = useCallback((map) => setMap(null), []);
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const containerStyle = { width: "600px", height: "600px" };

  const handleCloseStoreDetailModal = () => {
    setStoreDetailModalShow(false);
  };

  const showHome = (e) => {
    e.preventDefault();
    setCenter(homePosit);
  };

  const getLatLng = () => {
    Geocode.fromAddress(userAddr).then(
      (response) => {
        const resLatLng = response.results[0].geometry.location;
        setUserLatLng({ lat: resLatLng.lat, lng: resLatLng.lng });
      },
      (error) => {
        console.error(error);
      }
    );
    setCenter(userLatLng);
  };

  useEffect(() => {
    setUserAddr(accountDetail.defaultAddr);
    getLatLng();
  }, [accountDetail]);

  useEffect(() => {
    const localName = accountDetail.defaultAddr.slice(4, 8);
    if (!storeList.length) {
      axios
        .get(`http://localhost:8080/stores/getStores/${localName}`)
        .then((response) => {
          const values = [];
          const keys = [];

          const temList = [];
          Object.entries(response.data).forEach(([key, value]) => {
            keys.push(key);
            values.push(value);
          });
          setStoreIdArr(keys);

          values.forEach((elem) => {
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
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [storeList]);

  return (
    <>
      <h3>지도로 찾기</h3>
      <table className="findmap">
        <tr>
          <td>
            {accountDetail && (
              <>
                <img
                  src={homeIcon}
                  alt={"집"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        panTo({
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
                        });
                      },
                      () => null
                    );
                  }}
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                />
                <h6>내 위치</h6>
              </>
            )}
          </td>
          <td>
            <h6>{userAddr}</h6>
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
                      setStoreDetailModalShow(true);
                      setStoreInfo(store);
                      setStoreId(storeIdArr[i]);
                      setCenter({ lat: store.latitude, lng: store.longitude });
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
                {infoShow && (
                  <InfoWindow
                    position={{
                      lat: storeInfo.latitude,
                      lng: storeInfo.longitude,
                    }}
                    clickable={true}
                    onCloseClick={() => setInfoShow(false)}
                  >
                    <h2>인포창</h2>
                  </InfoWindow>
                )}
                {accountDetail && (
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
              <tr>
                <td>
                  <img src={side} alt="사이드이미지" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      {storeDetailModalShow && (
        <StoreDetailModal
          handleClose={handleCloseStoreDetailModal}
          storeInfo={storeInfo}
          storeId={storeId}
          accountDetail={accountDetail}
        />
      )}
    </>
  );
};
export default FindByMap;
