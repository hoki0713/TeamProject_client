import React from 'react';
import {CardDeck, Card, Button, Form, Row, Col} from 'react-bootstrap'

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
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        연령
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="outline-dark" type="button">10대</Button>{' '}
                        <Button variant="outline-dark" type="button">20대</Button>{' '}
                        <Button variant="outline-dark" type="button">30대</Button>{' '}
                        <Button variant="outline-dark" type="button">40대</Button>{' '}
                        <Button variant="outline-dark" type="button">50대</Button>{' '}
                        <Button variant="outline-dark" type="button">60대</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        성별
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="outline-dark" type="button">남성</Button>{' '}
                        <Button variant="outline-dark" type="button">여성</Button>{' '}
                        <Button variant="outline-dark" type="button">성별무관</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        관심 업종
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="outline-dark" type="button">체육시설</Button>{' '}
                        <Button variant="outline-dark" type="button">병원및약국</Button>{' '}
                        <Button variant="outline-dark" type="button">카페</Button>{' '}
                        <Button variant="outline-dark" type="button">의류업</Button>{' '}
                        <Button variant="outline-dark" type="button">음식점</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        추천 태그
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="outline-dark" type="button">#가성비</Button>{' '}
                        <Button variant="outline-dark" type="button">#소확행</Button>{' '}
                        <Button variant="outline-dark" type="button">#새로_생긴</Button>{' '}
                        <Button variant="outline-dark" type="button">#건강</Button>{' '}
                        <Button variant="outline-dark" >#즐겨찾기_많은</Button>
                    </Col>
                    <br/> <br/>
                </Form.Group>
                <Button variant="primary" type="submit">맞춤 가맹점 검색</Button>{' '}
            </Form>

        </>
    );
}

export default FindByTag;