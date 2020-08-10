import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {CardDeck, Card, Container, Row, Col} from 'react-bootstrap'
import './Recommendation.css'
import {useDispatch, useSelector} from "react-redux";

const RECOMMEND_LIST = "RECOMMEND_LIST";

export const recommendListAction = (data)=>({type:RECOMMEND_LIST, payload:data});
export const recommendListReducer = (state=[], action)=>{
    switch (action.type){
        case RECOMMEND_LIST : return action.payload;
        default: return state;
    }
};
// export const recommendListThunk = (id) => (dispatch) => {
//     console.log("api 도착");
//
// };

function Recommendation() {
    const recommendList : any[]= []
    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'))
    const [id, setId] = useState("");
    const [store, setStore] = useState({});
    const [storeList, setStoreList] = useState([])
    const [storeName, setStoreName] = useState("")
    const [storeType, setStoreType] = useState("")
    const [starRanking, setStarRanking] = useState("")
    const resultList = useSelector((state:any)=>state.recommendListReducer);
    const dispatch = useDispatch()
    const setStores = (payload)=>{
        setStore({name:payload.name,
        type:payload.type,
        ranking:payload.type})
    }

    useEffect(() => {
        setId(accountDetail.id);
    },[accountDetail]);

    useEffect(() => {

        if(id) {
            axios.get(`http://localhost:8080/recommends/individual/${id}`)
                .then(({data})=>{
                    data.list.forEach(elem => {
                        recommendList.push(elem)
                    });
                    console.log(recommendList.toString())
                })
                .catch(
                    error => {
                        throw(error)
                    }

                )
        } else{ console.log('아이디 없음')}

    }, [id])

    return (
        <>
            <div className="scrollContainer">

                    {recommendList.map((store, i)=>(
                        <Card className="cardItem" key={i}>
                            <Card.Body>
                                <Card.Title>{store.name}</Card.Title>
                                <Card.Text>
                                    {store.ranking}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{store.type}</small>
                            </Card.Footer>
                        </Card>
                        )

                    )}

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