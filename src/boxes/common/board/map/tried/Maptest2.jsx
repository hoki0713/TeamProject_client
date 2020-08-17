import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from "react-google-maps";
import Geocode from "react-geocode";
import { Descriptions } from "antd";
import AutoComplete from "react-google-autocomplete";
Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");

const Maptest2 = () => {
  const pathCoordinates = [
    { lat: 37.551191, lng: 126.94097 },
    { lat: 37.550191, lng: 126.94097 },
  ];
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [zoom, setZoom] = useState(15);
  const [height, setHeight] = useState(400);
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

  // Life Cycle
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          mapPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          markerPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  }, []);

  // 주소 자세하게 받아오기 위해
  const getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  const getArea = (addressArray) => {
    let area = "";
    for (let index = 0; index < addressArray.length; index++) {
      if (addressArray[index].types[0]) {
        for (let j = 0; j < addressArray.length; j++) {
          if (
            "sublocality_level_1" === addressArray[index].types[j] ||
            "locality" === addressArray[index].types[j]
          ) {
            area = addressArray[index].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  const onMarkerDragEnd = (event) => {
    //
    let newLat = event.latLng.lat(); //위도
    let newLng = event.latLng.lng(); // 경도

    Geocode.fromLatLng(newLat, newLng) // Geocode가 위도,경도로부터 주소를 가져온다.
      .then((response) => {
        console.log("response", response); // response에 확인하면 주소들이 자세히 찍힌다.
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray);
        setArea(getArea(addressArray));
        setState(getState(addressArray));

        this.setState({
          // 받아온 값(city,area,State)들을 위에 state에 넣어주기 위해
          address: address ? address : "",
          city: city ? city : "",
          area: area ? area : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      });
    console.log("newLat", newLat);
  };
  const onPlaceSelected = (place) => {
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const city = this.getCity(addressArray);
    const area = this.getArea(addressArray);
    const state = this.getState(addressArray);
    const newLat = place.geometry.location.lat();
    const newLng = place.geometry.location.lng();
    this.setState({
      // 받아온 값(city,area,State)들을 위에 state에 넣어주기 위해
      address: address ? address : "",
      city: city ? city : "",
      area: area ? area : "",
      state: state ? state : "",
      markerPosition: {
        lat: newLat,
        lng: newLng,
      },
      mapPosition: {
        lat: newLat,
        lng: newLng,
      },
    });
  };
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 37.551191, lng: 126.94097 }}
      >
        <Marker
          draggable={true} //드래그 기능
          onDragEnd={onMarkerDragEnd} // 끝나는지점 위치확인하는것
          position={{ lat: 37.551191, lng: 126.94097 }}
        >
          <InfoWindow>
            <div>인포창</div>
          </InfoWindow>
        </Marker>
        {/* 검색기능 */}
        <AutoComplete
          style={{
            width: "100%",
            height: "40px",
            paddingLeft: 16,
            marginTop: 2,
            marginBottom: "2rem",
          }}
          types={["(regions)"]} // type of places in google place API
          onPlaceSelected={onPlaceSelected} // drag했을때도 가져오기위해
          /*onPlaceSelected = {(place)=>{
                        console.log(place) // address_components, formatted_address 같은 정보 찍힘
                    }}*/
        />
        <Polyline
          defaultPosition={{ lat: 37.551191, lng: 126.94097 }}
          path={pathCoordinates}
          options={{
            strokeColor: "#d502b9",
            strokeOpacity: 0.75,
            strokeWeight: 2,
            icons: [
              {
                icon: "",
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />
      </GoogleMap>
    ))
  );
  return (
    <div style={{ padding: "1rem", margin: "0 auto", maxWidth: 1000 }}>
      <Descriptions bordered>
        <Descriptions.Item label="City">{city}</Descriptions.Item>
      </Descriptions>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default Maptest2;
