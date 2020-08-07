import React from 'react';
import {CardDeck, Card, Container, Row, Col} from 'react-bootstrap'
import './Recommendation.css'

function Recommendation() {
    return (
        <>
            <h2>simin님을 위한 우리 동네 추천 가맹점</h2><br/>
            <h4>즐겨찾기한 #순남시래기와 유사한 추천 가맹점</h4>
            <div className="scrollContainer">
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1550388342-b3fd986e4e67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>노고산 갈비</Card.Title>
                        <Card.Text>
                            갈비갈비해
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1583224994076-ae951d019af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>마포만두</Card.Title>
                        <Card.Text>
                            갈비만두{' '}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>

            </div>
            <br/><br/><br/><br/>
            <h4>내가 즐겨찾기한 #무지개빙수와 유사한 타업종 추천 가맹점</h4>
            <div className="scrollContainer">
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1550388342-b3fd986e4e67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>노고산 갈비</Card.Title>
                        <Card.Text>
                            갈비갈비해
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1583224994076-ae951d019af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>마포만두</Card.Title>
                        <Card.Text>
                            갈비만두{' '}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>

            </div>
            <br/><br/><br/><br/>

            <h4>우리 동네 #노고산동에서 인기 있는 가맹점</h4>
            <div className="scrollContainer">
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1550388342-b3fd986e4e67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>노고산 갈비</Card.Title>
                        <Card.Text>
                            갈비갈비해
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1583224994076-ae951d019af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>마포만두</Card.Title>
                        <Card.Text>
                            갈비만두{' '}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>
                <Card className="cardItem">
                    <Card.Img variant="top"
                              src="https://images.unsplash.com/photo-1595275320712-24b6f2b0a984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
                    <Card.Body>
                        <Card.Title>설빙 서강대점</Card.Title>
                        <Card.Text>
                            망빙 좋아해?
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">#30대_여성이 선호하는 #요식업 종</small>
                    </Card.Footer>
                </Card>

            </div>
            <br/><br/><br/><br/>

        </>
    );
}

export default Recommendation;