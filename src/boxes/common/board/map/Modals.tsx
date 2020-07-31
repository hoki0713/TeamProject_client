import React, {useState} from "react";
import {Button, Col, Container, Dropdown, Modal, Row} from "react-bootstrap";

export const MapModal=(props)=> {
    const [storeLoca]=useState('경상남도 창원시 마산회원구 양덕동 157-17')
    const [storePhone]=useState('055-233-4325')
    const [reportShow, setReportShow]=useState(false)
    const iconsize=25
    return (
        <>
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    밀양순대국밥
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            {storeLoca}<br/>
                            {storePhone}
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
                            <table>
                                <tr><td> <img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={iconsize} height={iconsize}
                                onClick={()=>{setReportShow(true)}}
                                />신고하기</td></tr>
                                <tr><td><img src={'https://w7.pngwing.com/pngs/380/478/png-transparent-star-shape-computer-icons-stars-angle-triangle-orange-thumbnail.png'} width={iconsize} height={iconsize}
                                />&nbsp;즐겨찾기</td></tr>
                                <tr><td><img src={'https://image.flaticon.com/icons/svg/259/259500.svg'} width={iconsize} height={iconsize}
                                />&nbsp;리뷰</td></tr>

                            </table>




                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
            <StoreReport show={reportShow} onHide={()=>setReportShow(false)}/>
            </>
    );
}

export const StoreReport=(props)=> {
    const [reason,setReason]=useState('신고사유')
    const [input,setInput]=useState(false)
    return (
        <div>

            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>가맹점 신고하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={40} height={40}
                    />
                    &nbsp;해당 가맹점에서 지역화폐를 받지 않는다고 신고하시겠습니까?
                </Modal.Body>
                {/*<Modal.Body>*/}
                {/*    <Dropdown>*/}
                {/*        <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                {/*            {reason}*/}
                {/*        </Dropdown.Toggle>*/}

                {/*        <Dropdown.Menu>*/}
                {/*            <Dropdown.Item onClick={()=>setReason('지역화폐 미가맹')}>지역화폐 미가맹</Dropdown.Item>*/}
                {/*            <Dropdown.Item onClick={()=>setReason('결제시 웃돈 요구')}>결제시 웃돈 요구</Dropdown.Item>*/}
                {/*            <Dropdown.Item onClick={()=>setReason('폐업 및 이전')}>폐업 및 이전</Dropdown.Item>*/}
                {/*            <Dropdown.Item onClick={()=>{setReason('기타');setInput(true)}}>기타(직접 입력해주세요)</Dropdown.Item>*/}
                {/*        </Dropdown.Menu>*/}
                {/*    </Dropdown>*/}
                {/*    {input&&<><h5>신고이유를 적어주세요</h5><textarea name="" id="" cols={30} rows={10}></textarea></>}*/}
                {/*</Modal.Body>*/}

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>취소</Button>
                    <Button variant="danger" onClick={props.onHide}>신고하기</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};


export const Review = () => {
    return (
        <div>
            <Modal>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Title>리뷰남기기</Modal.Title>
                <Modal.Body><textarea></textarea></Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    );
};

