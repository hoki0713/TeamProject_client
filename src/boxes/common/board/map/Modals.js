import React, {useEffect, useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {addr, favStar, phoneB, red, review, starIcon} from "./mapIcons/imgIndex";
import {Link} from "react-router-dom";
import ReviewModal from "../../../../items/ReviewModal";
import axios from "axios";
import {Stars} from "./FindByMap";

export const MapModal=({storeInfo,modalClose,isLogined,setStoreInfo})=> {
    const [reportShow, setReportShow]=useState(false);
    const [reviewShow, setReviewShow]=useState(false);
    const [starShow, setStarShow]=useState(false);
    const iconsize=25;


    const reportClose=()=>{
        setReportShow(false);
    }
    const starClose=()=>{
        setStarShow(false);
    }

    return (
        <>
            <Modal show={true}
                   aria-labelledby="contained-modal-title-vcenter"
                   onHide={modalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <img src ={storeInfo.icon}
                             alt={"commonStoreImg"} width={40} height={40}/>
                        &nbsp;<Link to={'storeDetail'}><span>{storeInfo.storeName}</span></Link> <br/>
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
                            <Col xs={5} md={3}>
                                {storeInfo.storeType}
                            </Col>
                            <Col xs={7} md={5}>
                                별점 &nbsp;
                                <Stars storeInfo={storeInfo}/>

                            </Col>
                            <Col xs={6} md={4}>
                                {isLogined
                                    ?
                                    <table>
                                        <tr><td> <img alt={"report"}
                                                      src={red} width={iconsize} height={iconsize}
                                                      onClick={()=>{setReportShow(true)}}
                                        />&nbsp;신고하기</td></tr>
                                        <tr><td><img alt={"favIcon"}
                                                     src={favStar} width={iconsize} height={iconsize}
                                                     onClick={()=>{setStarShow(true);}}
                                        />&nbsp;즐겨찾기</td></tr>
                                        <tr><td><img alt={"reviewIcon"}
                                                     src={review} width={iconsize} height={iconsize}
                                                     onClick={()=>{setReviewShow(true)}}
                                        />&nbsp;리뷰</td></tr>
                                    </table>:
                                    <Link to={'/account/login'}>
                                        <table>
                                            <tr><td> <img alt={"report"} src={red} width={iconsize} height={iconsize}
                                            />&nbsp;신고하기</td></tr>
                                            <tr><td><img alt={"favIcon"} src={favStar} width={iconsize} height={iconsize}
                                            />&nbsp;즐겨찾기</td></tr>
                                            <tr><td><img alt={"reviewIcon"} src={review} width={iconsize} height={iconsize}
                                            />&nbsp;리뷰</td></tr>
                                        </table>
                                    </Link>
                                }
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={modalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            {starShow &&
            <Star
                storeInfo={storeInfo}
                starClose={starClose}
                modalClose={modalClose}
            />

            }
            {reportShow &&
            <StoreReport
                modalClose={modalClose}
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
        </>
    );
}

export const StoreReport=({storeInfo, reportClose,modalClose})=> {

    const handleReport = () => {
        axios
            .post(`http://localhost:8080/reports/${storeInfo.id}`)
            .then(() => {
                alert(`${storeInfo.storeName}에 대한 신고가 완료되었습니다.`);
                modalClose();
            })
            .catch((error) => {
                throw error;
            });
    };

    return (
        <div>

            <Modal show={true} onHide={reportClose}>
                <Modal.Header closeButton>
                    <Modal.Title>가맹점 신고하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img alt={"storeIcon"} src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={40} height={40}
                    />
                    &nbsp; <span><strong>{storeInfo.storeName}</strong></span>&nbsp;에서 지역화폐를 받지 않습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleReport} >신고하기</Button>
                    <Button variant="secondary" onClick={reportClose}>취소</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};
export const Star =({storeInfo, starClose, modalClose})=> {

    const addStore=()=>{
        const data = {
            userId: JSON.parse(sessionStorage.getItem("accountDetail")).id,
            storeId: storeInfo.id,
        };
        axios
            .post(`http://localhost:8080/favorites`, data)
            .then(() => {
                alert("즐겨찾기에 추가되었습니다.");
                modalClose();
            })
            .catch((error) => {
                throw error;
            });
    }
    const handleClose=()=>{
        starClose();
    }


    return (
        <div className={"star_modal"}>
            <Modal
                autoFocus={true}
                show={true} onHide={starClose}>
                <Modal.Header closeButton>
                    <Modal.Title><img alt={"favIcon"}
                                      src={favStar} width={25} height={25}/>
                        &nbsp;즐겨찾기 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tr><td>
                            <img alt={"storeImg"} src={storeInfo.imgUrl} width={90} height={90}/>
                        </td>
                            <td>
                                &nbsp; &nbsp;<strong className={"store_name"}>{storeInfo.storeName}</strong> <br/>
                                &nbsp; &nbsp;{storeInfo.address}<br/><br/>
                                &nbsp; &nbsp;<text className={"add"}>가게를 즐겨찾기에 추가하시겠습니까?</text>
                            </td></tr>

                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button className={"addstarB"} onClick={addStore}>추가하기</button>
                    <button className={"cancelB"} onClick={handleClose}>취소</button>
                </Modal.Footer>
            </Modal>

        </div>

    );}