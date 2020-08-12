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
    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])
    const [userbased, setUserbased] = useState([])
    const [bestStores, setBestStores] = useState([])
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
                    console.log(res.data)
                    console.log(res.data.userBased)
                    setBestStores(res.data.bestStore)
                    setUserbased(res.data.userBased)

                    // data.list.forEach(elem => {
                    //     recommendList.push(elem)
                    // });
                    // console.log(recommendList.toString())

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
                {userbased.map((store, i) => (
                        <Card className="cardItem" key={i}>
                            <Card.Img variant="top"
                                      src={store.imgUrl}/>

                            <Card.Body>
                                <Card.Title>{store.storeName}</Card.Title>
                                <Card.Text>
                                    {store.mainCode}+{store.address}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                            </Card.Footer>
                        </Card>
                    )
                )}
            </div>
            <h4>즐겨찾기한 #순남시래기와 유사한 추천 가맹점</h4>
            <h4>내가 즐겨찾기한 #무지개빙수와 유사한 타업종 추천 가맹점</h4>
            <h4>우리 동네 #노고산동에서 인기 있는 가맹점</h4>
            <div className="scrollContainer">
                {bestStores.map((store, i) => (
                        <Card className="cardItem" key={i}>
                            <Card.Img variant="top"
                                      src={store.imgUrl}/>

                            <Card.Body>
                                <Card.Title>{store.storeName}</Card.Title>
                                <Card.Text>
                                    {store.mainCode}+{store.address}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                            </Card.Footer>
                        </Card>))}
            </div>
            </>)
    }
export default Recommendation;