import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {CardDeck, Card, Container, Row, Col} from 'react-bootstrap'
import './Recommendation.css'
import {useDispatch, useSelector} from "react-redux";


const RECOMMEND_LIST = "RECOMMEND_LIST";

export const recommendListAction = (data) => ({type: RECOMMEND_LIST, payload: data});

export const recommendListReducer = (state = [], action) => {
    switch (action.type) {
        case RECOMMEND_LIST :
            return action.payload;
        default:
            return state;
    }
};
// export const recommendListThunk = (id) => (dispatch) => {
//     console.log("api 도착");
//
// };

function Recommendation() {
    const recommendList = []
    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'))
    const [id, setId] = useState("");
    const [store, setStore] = useState({});
    const [storeList, setStoreList] = useState([])
    const [storeName, setStoreName] = useState("")
    const [storeType, setStoreType] = useState("")
    const [userBased, setUserBased] = useState([])
    const [itemBased, setItemBased] = useState([])
    const [bestStore, setBestStore] = useState([])
    const resultList = useSelector((state) => state.recommendListReducer);
    const dispatch = useDispatch()
    const setStores = (payload) => {
        setStore({
            name: payload.name,
            type: payload.type,
            ranking: payload.type
        })
    }

    useEffect(() => {
        setId(accountDetail.id);
    }, [accountDetail]);

    useEffect(() => {
        if (id) {

            axios.get(`http://localhost:8080/recommends/individual/${id}`)
                .then((res) => {
                    console.log('소통 성공')
                    console.log(res.data.bestStore)
                    console.log(res.data.userBased)
                    setBestStore(res.data.bestStore)
                    setUserBased(res.data.userBased)
                    setItemBased(res.data.itemBased)



                }).catch(
                error => {
                    throw(error)
                }
            )

        }},[id])


        return (<>
            <h2>simin님을 위한 우리 동네 추천 가맹점</h2><br/>
            <h4>회원님과 유사한 회원들이 좋아하는 가맹점</h4>
            <div className="scrollContainer">
                {userBased.map((store, i) => (
                        <Card className="cardItem" key={i}>
                            <Card.Img id="card-image" variant="top"
                                      src={store.imgUrl}/>

                            <Card.Body>
                                <Card.Title id="card-title">{store.storeName}</Card.Title>
                                <Card.Text>
                                    {store.address}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                            </Card.Footer>
                        </Card>
                    )
                )}

            </div>
            <br/><br/><br/><br/>
            <h4>즐겨찾기한 #순남시래기와 유사한 추천 가맹점</h4>
            <div className="scrollContainer">
                {itemBased.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img style={{height:"50%"}} variant="top"
                                  src={store.imgUrl}/>

                        <Card.Body>
                            <Card.Title>{store.storeName}</Card.Title>
                            <Card.Text>
                                {store.address}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                        </Card.Footer>
                    </Card>))}
            </div>
            <br/><br/><br/><br/>
            <h4>우리 동네 #노고산동에서 인기 있는 가맹점</h4>
            <div className="scrollContainer">
                {bestStore.map((store, i) => (
                        <Card className="cardItem" key={i}>
                            <Card.Img style={{height:"50%"}} variant="top"
                                      src={store.imgUrl}/>

                            <Card.Body>
                                <Card.Title>{store.storeName}</Card.Title>
                                <Card.Text>
                                    {store.address}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                            </Card.Footer>
                        </Card>))}
            </div>
            <br/><br/>
            </>)
    }
export default Recommendation;