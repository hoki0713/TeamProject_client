import React, { useEffect, useState, useCallback} from 'react';
import 'react-google-maps'
import {
    GoogleMap,
    Marker,
    InfoWindow, LoadScript,
} from "@react-google-maps/api";
import side from './side.jpg'
import Geocode from 'react-geocode'

import './map.css'
import { Review, Star, StoreReport} from "./Modals";
import {useDispatch} from "react-redux";
import normal from './mapIcons/normal.png'
import home from './mapIcons/fav.png'
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fav, reportIcon, review, star} from "./mapIcons/icons";
import {storeList,storeThunk} from "./mapThunks";


Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");



const libraries = ['drawing']

const FindByMap=()=> {
        const containerStyle = {
            width: '600px',
            height: '600px'
        };

        const [map, setMap] = useState(null)
        const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    const [center,setCenter]=useState({lat: 37.746897, lng: 127.040861})
    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])
        const [modalShow, setModalShow] = useState(false);
        const [loca, setLoca]=useState(false);
        let [homePosit,setHomePosit]=useState({})
        const [storeInfo,setStoreInfo]=useState({})
        const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
        const [selectedAddr, setSelectedAddr] = useState('')
        const [infoShow, setInfoShow] =useState(false)
        const dispatch=useDispatch()
        const showHome=e=>{
            e.preventDefault()
            setLoca(true);}
        const [selected, setSelected] = useState({lat: '', lng: ''});



        Geocode.fromLatLng(selected.lat, selected.lng).then(
            response => {
                const address = response.results[0].formatted_address;
                setSelectedAddr(address);
                console.log(address);
            },
            error => {
                console.error(error);
            },
        );
        useEffect(()=>{
            console.log("in useEffect")
            if(!storeList) {
                dispatch(storeThunk(sessionStorage.getItem("location")));
            console.log("useEffect")}
            if(sessionStorage.getItem("location").defaultAddr ==="경기도 파주시"){
                setHomePosit({lat: 37.746897, lng: 127.040861});
            }

        },[center],);

    const MapModal=(props)=> {
        const [reportShow, setReportShow]=useState(false);
        const [reviewShow, setReviewShow]=useState(false);
        const [starShow, setStarShow]=useState(false);
        const iconsize=25;
        return (
            <>
                <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {storeInfo.storeName} <br/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Row>
                                <Col xs={12} md={8}>
                                    {storeInfo.address}<br/>
                                    {storeInfo.storePhone}
                                </Col>
                                <Col xs={6} md={4}>
                                    <img src='http://bdap.postech.ac.kr/UPLOAD//GWPFile_per_BoardNo/80/20161114132407014640.bmp'
                                         alt={'국밥집'} width={50} height={50}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} md={4}>
                                    탕,국,찌개
                                </Col>
                                <Col xs={6} md={4}>
                                    별점 <img src={'https://media.istockphoto.com/vectors/five-stars-rating-vector-id1152705981'}
                                            width={50} height={30}/>

                                </Col>
                                <Col xs={6} md={4}>
                                    {sessionStorage.getItem("accountDetail")
                                        ?
                                        <table>
                                            <tr><td> <img src={reportIcon} width={iconsize} height={iconsize}
                                                          onClick={()=>{setReportShow(true)}}
                                            />&nbsp;신고하기</td></tr>
                                            <tr><td><img src={fav} width={iconsize} height={iconsize}
                                                         onClick={()=>{setStarShow(true)}}
                                            />&nbsp;즐겨찾기</td></tr>
                                            <tr><td><img src={review} width={iconsize} height={iconsize}
                                                         onClick={()=>{setReviewShow(true)}}
                                            />&nbsp;리뷰</td></tr>
                                        </table>:
                                        <Link to={'/account/login'}>
                                            <table>
                                                <tr><td> <img src={reportIcon} width={iconsize} height={iconsize}
                                                />&nbsp;신고하기</td></tr>
                                                <tr><td><img src={fav} width={iconsize} height={iconsize}
                                                />&nbsp;즐겨찾기</td></tr>
                                                <tr><td><img src={review} width={iconsize} height={iconsize}
                                                />&nbsp;리뷰</td></tr>
                                            </table>
                                        </Link>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <StoreReport storeInfo show={reportShow} onHide={()=>setReportShow(false)}/>
                <Review storeInfo show={reviewShow} onHide={()=>setReviewShow(false)}/>
                <Star storeInfo show={starShow} onHide={()=>setStarShow(false)}/>
            </>
        );
    }





         return (
            <>
                <h3>지도로 찾기</h3>


               <MapModal show={modalShow} onHide={() => setModalShow(false)}/>
                <table className="findmap">
                    <tr><td>
                        {sessionStorage.getItem("accountDetail")&&<>
                            <img src={home} alt={"집"} onClick={(e)=>showHome(e)}
                                 style={{width:50, height:50, cursor:'pointer'}}/>
                            <h6>내 위치</h6></>}
                    </td>
                        <td>{loca&&<h6>{myLoca}</h6>}</td>
                        <td></td>
                    </tr>
                    <tr><td colSpan={2} className="td-left">
                        <LoadScript
                            googleMapsApiKey="AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY"
                            libraries={libraries}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            onUnmount={onUnmount}
                            zoom={16}
                            onLoad={onLoad}

                        >

                            {storeList.map((store, i) => (
                                <Marker
                                    key={i}
                                    position={{lat:store.latitude, lng: store.longitude}}
                                    animation={4}
                                    icon={{url:normal,
                                        scaledSize: {width:30, height:30}
                                    }}

                                    onClick={()=>{
                                        setModalShow(true);
                                        setStoreInfo(store);
                                        setCenter({lat:store.latitude, lng: store.longitude})
                                    }}
                                    title={store.storeName}
                                >

                                </Marker>
                            ))}
                            {infoShow&&<InfoWindow
                                position={{lat:storeInfo.latitude, lng: storeInfo.longitude}}
                                clickable={true}
                                onCloseClick={() => setInfoShow(false)}
                            ><h2>인포창</h2></InfoWindow>}
                            <Marker
                                position={{lat: 37.746897, lng: 127.040861}}
                                icon={{url: home,
                                    scaledSize: {width:40, height:40},
                                }}
                                title={'집'}
                                animation={2}
                            >
                                <InfoWindow>
                                    <h1>일단인포</h1>
                                </InfoWindow>
                            </Marker>




                        </GoogleMap>
                        </LoadScript>

                    </td>
                        <td className="td-right">
                            <table className="mapSide">
                                <tr><td><img src={side} alt="사이드이미지"/></td></tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </>
        );
    }
;
export default FindByMap;