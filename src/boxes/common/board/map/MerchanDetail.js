import React, {useState, useEffect, useContext} from 'react';
import { StoreSearchContext } from '../../../../items/context/StoreSearchContext';
import {appKey, containerStyle, libraries} from "./mapUtils/mapatt";
import {GoogleMap, InfoWindow, LoadScript,Marker} from "@react-google-maps/api";
import {addr, favStar, normal, phoneB, red, review} from "./mapIcons/imgIndex";
import {Link} from "react-router-dom";
import {Stars} from "./FindByMap";
import ReviewModal from "../../../../items/ReviewModal";
import {Star, StoreReport} from "./Modals";


const MerchanDetail = ({storeInfo,isLogined}) => {
    const { store } = useContext(StoreSearchContext);
    const [newStore, setNewStore] = useState({});//가져온 storeInfo 담는 state
    const [center] = useState({lat:storeInfo.latitude, lng:storeInfo.longitude});//가게좌표
    const [reportShow,setReportShow]=useState(false);//신고모달 show
    const [starShow,setStarShow]=useState(false);
    const [reviewShow,setReviewShow]=useState(false);

    const reportClose=()=>{
        setReportShow(false);
    }
    const starClose=()=>{
        setStarShow(false);
    }
    function findRoute(){
        if(!isLogined){
            window.open(`
            http://map.naver.com/index.nhn?
            &elng=${storeInfo.longitude}&elat=${storeInfo.latitude}&etext=${storeInfo.storeName}&menu=route&pathType=1`,'')

        }
        else {
            let userLoca=JSON.parse(sessionStorage.getItem("userLocation"))
            window.open(`
            http://map.naver.com/index.nhn?slng=${userLoca.lng}&slat=${userLoca.lat}&stext=${JSON.parse(sessionStorage.getItem("accountDetail")).defaultAddr}
            &elng=${storeInfo.longitude}&elat=${storeInfo.latitude}&etext=${storeInfo.storeName}&menu=route&pathType=1`,'')
        }
    }
    useEffect(() => {
        setNewStore(store);
    },[store])

    if(storeInfo.starRanking>0){
    return (
        <div>
            <LoadScript
                googleMapsApiKey={appKey}
                libraries={libraries}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    // onUnmount={onUnmount}
                    zoom={16}
                    // onLoad={onMapLoad}
                >
                    <Marker
                        position={center}
                        icon={{url: normal,
                            scaledSize: {width:40, height:40},
                        }}
                        title={'집'}
                        animation={1}
                    >
                        <InfoWindow>
                                <div>
                                    <h6>{storeInfo.storeName}</h6>
                                    <table>
                                        <tr><td>
                                            <img src={storeInfo.imgUrl}
                                                 alt={storeInfo.storeName} width={80} height={80}/>
                                        </td>
                                            <td>
                                                <img src={addr}
                                                     alt={"addrImg"} width={25} height={25}/>
                                                &nbsp;{storeInfo.address}<br/>
                                                <img src={phoneB}
                                                     alt={"phoneImg"} width={25} height={25}/>
                                                &nbsp;{(storeInfo.storePhone!=0)?<>{storeInfo.storePhone}</>:
                                                <>000-000-0000</>}
                                            </td></tr>
                                        <tr><td></td>
                                            <td>
                                                {storeInfo.storeType}
                                                &nbsp;&nbsp;별점 &nbsp;
                                                <Stars storeInfo={storeInfo}/> {storeInfo.starRanking}/5

                                            </td></tr>
                                        <tr><td></td><td>
                                            {isLogined
                                                ?
                                                <table>
                                                    <tr><td> <img alt={"report"}
                                                                  src={red} width={25} height={25}
                                                                  onClick={()=>{setReportShow(true)}}
                                                    />&nbsp;신고하기</td></tr>
                                                    <tr><td><img alt={"favIcon"}
                                                                 src={favStar} width={25} height={25}
                                                                 onClick={()=>{setStarShow(true);}}
                                                    />&nbsp;즐겨찾기</td></tr>
                                                    <tr><td><img alt={"reviewIcon"}
                                                                 src={review} width={25} height={25}
                                                                 onClick={()=>{setReviewShow(true)}}
                                                    />&nbsp;리뷰</td></tr>
                                                </table>:
                                                <Link to={'/account/login'}>
                                                    <table>
                                                        <tr><td> <img alt={"report"} src={red} width={25} height={25}
                                                        />&nbsp;신고하기</td></tr>
                                                        <tr><td><img alt={"favIcon"} src={favStar} width={25} height={25}
                                                        />&nbsp;즐겨찾기</td></tr>
                                                        <tr><td><img alt={"reviewIcon"} src={review} width={25} height={25}
                                                        />&nbsp;리뷰</td></tr>
                                                    </table>
                                                </Link>}
                                        </td></tr>
                                        <tr><td colSpan={2}>{'     '}</td></tr>
                                        <tr><td colSpan={2}>대분류: {storeInfo.mainCode}</td></tr>
                                        <tr><td colSpan={2}>소분류: {storeInfo.storeType}</td></tr>

                                        <tr><td></td>
                                            <td>
                                            &nbsp;&nbsp;&nbsp;
                                            <button
                                            className={"find_routeB"}
                                            onClick={e=>{e.preventDefault(); findRoute()}}
                                            >네이버에서 길찾기</button></td></tr>
                                    </table>
                                </div>
                        </InfoWindow>
                    </Marker>
                </GoogleMap>
            </LoadScript>
            {starShow &&
            <Star
                storeInfo={storeInfo}
                starClose={starClose}
                modalClose={()=>{}}
            />

            }
            {reportShow &&
            <StoreReport
                modalClose={()=>{}}
                storeInfo={storeInfo}
                reportClose={reportClose}/>
            }
            { reviewShow &&
            <ReviewModal handleClose={()=>setReviewShow(false)}
                         storeName={storeInfo.storeName}
                         accountDetail={JSON.parse(sessionStorage.getItem("accountDetail"))}
                         storeId={storeInfo.id}
                         reviewId={null}// findbymap에서는 필요없다
                         onSubmit={()=>{}}// findbymap에서는 필요없다
            />
            }
        </div>
    );}
    else {
        return (<><Link to={'/'}>돌아가기</Link></>)
    }
};

export default MerchanDetail;