import React from 'react';
import {CardDeck, Card, Button} from 'react-bootstrap'

function FindByTag() {
    return (
        <>
            <h1>태그로 찾기</h1>
            <CardDeck>
                <Card>
                    <Card.Body>
                        <Card.Title>20대 남성의 키워드</Card.Title>
                        <Card.Text>가성비, 소확행
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title>30대 여성의 키워드</Card.Title>
                        <Card.Text>우리아이, 자기계발
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>40대 남성의 키워드</Card.Title>
                        <Card.Text>체력증진, 럭셔리
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>60대 여성의 키워드</Card.Title>
                        <Card.Text>웰빙, 은퇴생활

                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
            <br/><br/><br/>
            <h3>맞춤검색</h3>
            <div>
                <div>
                    연령
                    <Button variant="outline-dark">10대</Button>{' '}
                    <Button variant="outline-dark">20대</Button>{' '}
                    <Button variant="outline-dark">30대</Button>{' '}
                    <Button variant="outline-dark">40대</Button>{' '}
                    <Button variant="outline-dark">50대</Button>{' '}
                    <Button variant="outline-dark">60대</Button>{' '}
                </div><br/>
                <div>
                    성별
                    <Button variant="outline-dark">남성</Button>{' '}
                    <Button variant="outline-dark">여성</Button>{' '}
                    <Button variant="outline-dark">성별무관</Button>{' '}
                </div><br/>
                <div>
                    관심 업종
                    <Button variant="outline-dark">체육시설</Button>{' '}
                    <Button variant="outline-dark">병원및약국</Button>{' '}
                    <Button variant="outline-dark">카페</Button>{' '}
                    <Button variant="outline-dark">의류업</Button>{' '}
                    <Button variant="outline-dark">음식점</Button>{' '}
                </div><br/>

                <div>
                    추천 태그
                    <Button variant="outline-dark">#가성비</Button>{' '}
                    <Button variant="outline-dark">#소확행</Button>{' '}
                    <Button variant="outline-dark">#새로_생긴</Button>{' '}
                    <Button variant="outline-dark">#건강</Button>{' '}
                    <Button variant="outline-dark">#즐겨찾기_많은</Button>{' '}
                </div><br/>

                <Button variant="primary">맞춤 가맹점 검색</Button>{' '}

            </div>
        </>
    );
}

export default FindByTag;