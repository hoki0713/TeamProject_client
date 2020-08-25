import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";

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
  starIcon,
  recoInfo,
} from "./mapIcons/imgIndex";
import { MapModal } from "./Modals.js";
import axios from "axios";
import { libraries, containerStyle, appKey } from "./mapUtils/mapatt";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import { StoreSearchContext } from "../../../../context/StoreSearchContext";

Geocode.setApiKey(appKey);

export const Stars = () => {
  const [starArr, setStarArr] = useState([]);
  const { store } = useContext(StoreSearchContext);
  useEffect(() => {
    let tmpList = [];
    for (let i = 0; i < parseInt(store.starRanking); i++) {
      tmpList[i] = i + 1;
    }
    setStarArr(tmpList);
  }, [store]);

  return (
    <>
      {starArr.map(() => (
        <img alt={"starIcon"} src={starIcon} width={20} height={20} />
      ))}
    </>
  );
};
const FindByMap = ({ isLogined }) => {
  const { setStore } = useContext(StoreSearchContext);
  const [storeInfo, setStoreInfo] = useState({});
  const [map, setMap] = useState(null);
  const [recoList, setRecoList] = useState([]);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const [center, setCenter] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [homePosit, setHomePosit] = useState({});
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
  };

  useEffect(() => {
    if (isLogined) {
      setMyLoca(
        JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr
      );
    } else {
      setMyLoca("경기도 의정부시");
    }
  }, [isLogined]);

  useEffect(() => {
    getLatLng(myLoca);
  }, [myLoca]);

  useEffect(() => {
    if (homePosit.lat) {
      axios
        .get(
          `http://localhost:8080/stores/fromAddr/${homePosit.lat}/${homePosit.lng}`
        )
        .then(({ data }) => {
          let temList = [];
          let bestList = [];
          if (data.list.length > 0) {
            data.list.forEach((elem) => {
              switch (elem.storeType) {
                case "의원":
                  elem.icon = hospIcon;
                  temList.push(elem);
                  break;
                case "중국식":
                  elem.icon = chinaIcon;
                  temList.push(elem);
                  break;
                case "편의점":
                  elem.icon = conviStore;
                  temList.push(elem);
                  break;
                case "약국":
                  elem.icon = drug;
                  temList.push(elem);
                  break;
                case "주점":
                  elem.icon = soju;
                  temList.push(elem);
                  break;
                case "일반한식":
                  if (!elem.storeName.includes("카페")) {
                    elem.icon = bab;
                  } else {
                    elem.icon = cafe;
                  }
                  temList.push(elem);
                  break;
                default:
                  switch (elem.mainCode) {
                    case "의원":
                      elem.icon = hospIcon;
                      temList.push(elem);
                      break;
                    case "중국식":
                      elem.icon = chinaIcon;
                      temList.push(elem);
                      break;
                    case "약국":
                      elem.icon = drug;
                      temList.push(elem);
                      break;
                    case "숙박업":
                      elem.icon = hotelIcon;
                      temList.push(elem);
                      break;
                    case "주점":
                      elem.icon = soju;
                      temList.push(elem);
                      break;
                    case "일반한식":
                      if (!elem.storeName.includes("카페")) {
                        elem.icon = bab;
                      } else {
                        elem.icon = cafe;
                      }
                      temList.push(elem);
                      break;
                    default:
                      elem.icon = normal;
                      temList.push(elem);
                      break;
                  }
              }
            });
            let searchResultCount = "searchResultCount";
            let starRanking = "starRanking";
            temList.sort(function(a, b) {
              return b[searchResultCount] - a[searchResultCount];
            });
            for (let i = 0; i < 20; i++) {
              temList[i].icon = recom;
            }
            temList.sort(function(a, b) {
              return b[starRanking] - a[starRanking];
            });

            for (let i = 0; i < 5; i++) {
              bestList[i] = temList[i];
            }
            setRecoList(bestList);
            setStoreList(temList);
          } else {
            alert("주변에 가맹점이 없습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  }, [homePosit]);

  return (
    <div id="content-wrapper">
      <h2 className="mt-4">지도로 찾기</h2>
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
            {isLogined && (
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
            <h6 style={{"text-align" : "left"}}>{myLoca}</h6>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2} className="td-left">
            <LoadScript googleMapsApiKey={appKey} libraries={libraries}>
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
                      setStore(store);
                      setCenter({ lat: store.latitude, lng: store.longitude });
                      setModalShow(true);
                    }}
                    title={store.storeName}
                    store={storeInfo}
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
                      setStoreInfo(store);
                      setModalShow(true);
                    }}
                  >
                    <td className={"side_td_1"}>
                      <h7> &nbsp;추천!!</h7>
                      <img
                        alt={"storeIcon"}
                        src={recoInfo}
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
                      &nbsp;
                      <Link to={"/storeDetail"} onClick={()=>setStore(store)}>
                        <strong>{store.storeName}</strong>
                      </Link>
                      <br />
                      &nbsp;
                      <text className={"store_addr"}>{store.address}</text>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} />
                    <td className={"side_tr_2"}>
                      별점 &nbsp;
                      <Stars />
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
};
export default FindByMap;
