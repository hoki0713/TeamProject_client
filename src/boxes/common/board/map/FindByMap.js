import React, {useEffect, useState, useCallback, useRef} from 'react';
import ReviewModal from '../../../../items/ReviewModal'
import 'react-google-maps'
import {
    GoogleMap,
    Marker,
    InfoWindow, LoadScript,
} from "@react-google-maps/api";
import Geocode from 'react-geocode'

import './map.css'
import {Star} from "./Modals";
import {
    homeIcon,
    red,
    review,
    addr,
    phoneB,
    favStar,
    hospIcon,
    chinaIcon,
    conviStore,
    drug,
    cafe, hotelIcon, soju, bab, normal, home
} from './mapIcons/imgIndex'
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");



export const libraries = ['drawing']
export const containerStyle = {
    width: '100%',
    height: '600px'
};
const FindByMap=()=> {


    const [map, setMap] = useState(null);
    const [recoList, setRecoList]=useState([])
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    const [center,setCenter]=useState({lat: 37.73633262, lng: 127.0447991});
    const [modalShow, setModalShow] = useState(false);
    const [homePosit,setHomePosit]=useState({});
    const [storeInfo,setStoreInfo]=useState({});
    const [myLoca,setMyLoca] = useState("");
    const [storeList, setStoreList] =useState([]);
    const mapRef = useRef();
    const onMapLoad = useCallback(map => {
        setMap(mapRef.current)
    }, []);

    const showHome=()=>{
        setCenter(homePosit);
        if(center==homePosit)window.location.reload();
    }
    const getLatLng = (location) =>{
        Geocode.fromAddress(location).then(
            response => {
                const resLatLng = response.results[0].geometry.location;
                setHomePosit({lat:resLatLng.lat, lng:resLatLng.lng});
                setCenter({lat:resLatLng.lat, lng:resLatLng.lng})
                console.log(`getLatLng ${resLatLng.lat} ${resLatLng.lng}`);
            },
            error => {
                console.error(error);
            }
        );
    }
    useEffect(()=>{
        console.log("useEffect getStoreList")
        if(!storeList[0]) {
            axios.get(`http://localhost:8080/stores/mapClick/의정부`)
                .then(({data})=>{
                    let temList =[]
                    data.list.forEach(elem=>{
                        switch (elem.storeType) {
                            case "의원": elem.icon = hospIcon; temList.push(elem); return;
                            case "중국식": elem.icon =chinaIcon; temList.push(elem); return;
                            case "편의점": elem.icon = conviStore; temList.push(elem);return;
                            case "약국": elem.icon = drug; temList.push(elem); return;
                            case "기타음료식품": elem.icon=cafe; temList.push(elem); return;
                            case "숙박업": elem.icon = hotelIcon; temList.push(elem); return;
                            case "주점": elem.icon = soju; temList.push(elem); return;
                            case "일반한식": elem.icon = bab; temList.push(elem); return;
                            default:elem.icon = normal; temList.push(elem); return;
                        }
                    });
                    setStoreList(temList);
                })
                .catch(err=>{throw(err)});
        };
        if(!recoList[0]){

        }
    },[storeList,recoList],);


    useEffect(()=>{
        console.log("useEffect getUserLatLng")
    },[myLoca]);


    const StoreReport=(props)=> {
        const [checkShow,setCheckShow]=useState(false);

        const Check =(props)=>{
            return<>
                <Modal
                    scaleSize={"sm"}/>
            </>
        }
        return (
            <div>

                <Modal {...props}>
                    <Modal.Header closeButton>
                        <Modal.Title>가맹점 신고하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{"text-align":"center"}}>
                        <img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={40} height={40}
                        /><br/>
                        &nbsp; <h4>{storeInfo.storeName}</h4>&nbsp;에서 지역화폐를 받지 않습니까?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.onHide}>취소</Button>
                        <Button variant="danger" onClick={props.onHide} >신고하기</Button>
                    </Modal.Footer>
                </Modal>
                <Check show={checkShow}/>
            </div>

        );
    };

    const MapModal=(props)=> {
        const [reportShow, setReportShow]=useState(false);
        const [reviewShow, setReviewShow]=useState(false);
        const [starShow, setStarShow]=useState(false);
        const iconsize=25;
        return (
            <>
                <Modal {...props} aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <img src ={storeInfo.icon}
                                 alt={"commonStoreImg"} width={40} height={40}/>
                            &nbsp;{storeInfo.storeName} <br/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Row>
                                <Col xs={12} md={8}>
                                    <img src={addr}
                                         alt={"addrImg"} width={iconsize} height={iconsize}/>
                                    &nbsp;{storeInfo.address}<br/>
                                    <img src={phoneB}
                                         alt={"phoneImg"} width={iconsize} height={iconsize}/>
                                    &nbsp;{(storeInfo.storePhone!=0)?<>{storeInfo.storePhone}</>:
                                    <>000-000-0000</>}
                                </Col>
                                <Col xs={6} md={4}>
                                    <img src={storeInfo.imgUrl}
                                         alt={storeInfo.storeName} width={80} height={80}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} md={4}>
                                    {storeInfo.storeType}
                                </Col>
                                <Col xs={6} md={4}>
                                    별점 &nbsp;<img src={'https://media.istockphoto.com/vectors/five-stars-rating-vector-id1152705981'}
                                                  width={50} height={30}/>

                                </Col>
                                <Col xs={6} md={4}>
                                    {sessionStorage.getItem("accountDetail")
                                        ?
                                        <table>
                                            <tr><td> <img src={red} width={iconsize} height={iconsize}
                                                          onClick={()=>{setReportShow(true)}}
                                            />&nbsp;신고하기</td></tr>
                                            <tr><td><img src={favStar} width={iconsize} height={iconsize}
                                                         onClick={()=>{setStarShow(true)}}
                                            />&nbsp;즐겨찾기</td></tr>
                                            <tr><td><img src={review} width={iconsize} height={iconsize}
                                                         onClick={()=>{setReviewShow(true)}}
                                            />&nbsp;리뷰</td></tr>
                                        </table>:
                                        <Link to={'/account/login'}>
                                            <table>
                                                <tr><td> <img src={red} width={iconsize} height={iconsize}
                                                />&nbsp;신고하기</td></tr>
                                                <tr><td><img src={favStar} width={iconsize} height={iconsize}
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
                <StoreReport setReportShow storeInfo show={reportShow} onHide={()=>setReportShow(false)}/>
                { reviewShow &&
                <ReviewModal handleClose={()=>setReviewShow(false)}
                             storeName={storeInfo.storeName}
                             accountDetail={JSON.stringify(sessionStorage.getItem("accountDetail"))}
                             storeId={storeInfo.id}
                             reviewId={null}/>
                }

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
                        <img src={homeIcon} alt={"집"} onClick={e => {
                            e.preventDefault();
                            showHome()}}
                             style={{width:50, height:50, cursor:'pointer'}}/>
                        <h6>내 위치</h6></>}
                </td>
                    <td><h6>{myLoca}</h6></td>
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
                            onLoad={onMapLoad}

                        >
                            {storeList.map((store, i) => (
                                <Marker
                                    key={i}
                                    position={{lat:store.latitude, lng: store.longitude}}
                                    onClick={()=>{
                                        setModalShow(true);
                                        setStoreInfo(store);
                                        setCenter({lat:store.latitude, lng: store.longitude})
                                    }}
                                    title={store.storeName}
                                    store={store}
                                    animation={4}
                                    icon={{url: store.icon ,
                                        scaledSize: {width:30, height:30}
                                    }}
                                />
                            ))}
                            {sessionStorage.getItem("accountDetail")&&
                            <Marker
                                position={homePosit}
                                icon={{url: homeIcon,
                                    scaledSize: {width:40, height:40},
                                }}
                                title={'집'}
                                animation={2}
                            >
                                <InfoWindow>
                                    <h6>우리집</h6>
                                </InfoWindow>
                            </Marker>}
                        </GoogleMap>
                    </LoadScript>

                </td>
                    <td className="td-right">
                        <table className="mapSide">
                            <tr></tr>
                        </table>
                    </td>
                </tr>
            </table>
        </>
    );
};
export default FindByMap;
