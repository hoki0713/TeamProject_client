import React, {useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export const MapModal=(props,{storeInfo})=> {
    const [storePhone]=useState('055-233-4325')
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
                                서울시 중랑구 도곡동 523-1<br/>
                                000-000-0000
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

export const StoreReport=(props)=> {
    return (
        <div>

            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>가맹점 신고하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={40} height={40}
                    />
                    &nbsp; 해당 가맹점에서 지역화폐를 받지 않습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>취소</Button>
                    <Button variant="danger" onClick={props.onHide}>신고하기</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};


export const Review = (props) => {
    return (
        <div>
            <Modal {...props}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Title>리뷰남기기</Modal.Title>
                <Modal.Body>
                    <img src={'https://media.istockphoto.com/vectors/five-stars-rating-vector-id1152705981'}
                         width={50} height={30}/>
                    <textarea name="" id="" cols={30} rows={10}></textarea></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>취소</Button>
                    <Button variant="outline-primary" onClick={props.onHide}>리뷰남기기</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const Star =(props)=> {
    const [store,setStore]=useState('밀양순대국밥')
    return (
        <div>

            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>가맹점 즐겨찾기 추가하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {store}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>취소</Button>
                    <Button variant="danger" onClick={props.onHide}>추가하기</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};