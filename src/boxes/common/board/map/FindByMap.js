import React, {useEffect, useState} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import side from './side.jpg'
import Geocode from 'react-geocode'
import './map.css'
import { Review, Star, StoreReport} from "./Modals";
import axios from 'axios'
import {useDispatch} from "react-redux";
import home from './mapIcons/homeIcon.png'
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");
// Geocode.fromLatLng(lat, lng).then(
//     response => {
//         const address = response.results[0].formatted_address;
//         console.log(address);
//     },
//     error => {
//         console.log(error);
//     }
// );




export const storeList=[]
export const storeThunk = () =>dispatch=>{

    console.log("storeThunk")
    axios.get('http://localhost:8080/stores/ui')
        .then(({data})=>{
            console.log(`1번${data.list[0].latitude},${data.list[0].longitude}`)
            data.list.forEach(elem=>{
                storeList.push(elem)
            });
            console.log(JSON.stringify(storeList[0]))
        })
        .catch(err=>{throw(err)});

}




const FindByMap=()=> {

    const [modalShow, setModalShow] = useState(false);
    const [loca, setLoca]=useState(false);
    const [key,setKey]=useState(0)
    const [homePosit,setHomePosit]=useState({})
    const [storeInfo,setStoreInfo]=useState({})
    const myLoca='서울시 중랑구 ㅇㅇㅇ 거구장';
    const [center, setCenter]=useState({lat: 37.746997, lng: 127.044861})
    const showHome=e=>{
        e.preventDefault()
        if(!loca){setCenter({lat: 37.746897, lng: 127.040861});
            setLoca(true);
        }else {setLoca(false);}};
    const dispatch = useDispatch()
    const FindMap = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={16}
            defaultCenter={center}
            defaultTilt={2}
        >
            <FindMapMarker  setModalShow={setModalShow} homePosit={homePosit}/>
        </GoogleMap>));

    const FindMapMarker=()=>{
        return(
            <div>
                {storeList.map((store, i) => (
                    <Marker
                        key={i}
                        position={{lat:store.latitude, lng: store.longitude}}
                        animation={4}
                        onClick={()=>{
                            setModalShow(true);
                            setStoreInfo(store)
                        }}
                        title={store.storeName}
                    />))}
                <Marker
                    position={homePosit}
                    icon={{url: home,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    title={'집'}
                    animation={2}
                />
            </div>
        )
    }
    const MapModal=(props)=> {
        const [reportShow, setReportShow]=useState(false)
        const [reviewShow, setReviewShow]=useState(false)
        const [starShow, setStarShow]=useState(false)
        const iconsize=25
        return (
            <>
                <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            밀양 잔치국수 <br/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Row>
                                <Col xs={12} md={8}>
                                    {storeInfo.address}<br/>
                                    000-000-0000
                                    인덱스: {key}
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
                                    {true
                                        // sessionStorage.getItem('user')
                                        ?
                                        <table>
                                            <tr><td> <img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={iconsize} height={iconsize}
                                                          onClick={()=>{setReportShow(true)}}
                                            />&nbsp;신고하기</td></tr>
                                            <tr><td><img src={'https://w7.pngwing.com/pngs/380/478/png-transparent-star-shape-computer-icons-stars-angle-triangle-orange-thumbnail.png'} width={iconsize} height={iconsize}
                                                         onClick={()=>{setStarShow(true)}}
                                            />&nbsp;즐겨찾기</td></tr>
                                            <tr><td><img src={'https://image.flaticon.com/icons/svg/259/259500.svg'} width={iconsize} height={iconsize}
                                                         onClick={()=>{setReviewShow(true)}}
                                            />&nbsp;리뷰</td></tr>
                                        </table>:
                                        <Link to={'/account/login'}>
                                            <table>
                                                <tr><td>
                                                    <img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={iconsize} height={iconsize}
                                                    />&nbsp;신고하기</td></tr>
                                                <tr><td><img src={'https://w7.pngwing.com/pngs/380/478/png-transparent-star-shape-computer-icons-stars-angle-triangle-orange-thumbnail.png'} width={iconsize} height={iconsize}
                                                />&nbsp;즐겨찾기</td></tr>
                                                <tr><td><img src={'https://image.flaticon.com/icons/svg/259/259500.svg'} width={iconsize} height={iconsize}
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
                <StoreReport show={reportShow} onHide={()=>setReportShow(false)}/>
                <Review show={reviewShow} onHide={()=>setReviewShow(false)}/>
                <Star show={starShow} onHide={()=>setStarShow(false)}/>
            </>
        );
    }

    useEffect(()=>{
        setHomePosit({lat: 37.746897, lng: 127.040861})
        dispatch(storeThunk())
    },[],)

    return (
        <>
            <h3>지도로 찾기</h3>


            <MapModal  show={modalShow} onHide={() => setModalShow(false)} key={key}/>

            <table className="findmap">
                <tr><td>
                    <h5>내 위치</h5>
                    <label className="switch">
                        <input type="checkbox"  onChange={showHome}/>
                        <span className="slider round"/>
                    </label>

                </td>
                    <td>{loca&&<h6>{myLoca}</h6>}</td>
                    <td></td>
                </tr>
                <tr><td colSpan={2} className="td-left">
                    <FindMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
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

export default FindByMap