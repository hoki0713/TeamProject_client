import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Card, Spinner, Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "./Recommendation.css";
import {StoreSearchContext} from "../../../../items/context/StoreSearchContext";
import {useHistory} from 'react-router-dom'


function Recommendation() {
    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'))
    const [latLng] = useState(JSON.parse(sessionStorage.getItem("userLocation") || '{}'))
    const [id, setId] = useState("");
    const [userBased, setUserBased] = useState([])
    const [itemBased, setItemBased] = useState([])
    const [bestStore, setBestStore] = useState([])
    const [topIndustryName, setTopIndustryName] = useState([])
    const [mostFav, setMostFav] = useState([])
    const [bestRated, setBestRated] = useState([])
    const [userFavBased, setUserFavBased] = useState([])
    const [userFavStore, setUserFavStore] = useState("")
    const [noFavMsg, setNoFavMsg] = useState("")
    const [userWarningMsg, setUserWarningMsg] = useState("")
    const [itemWarningMsg, setItemWarningMsg] = useState("")
    const [hospital, setHospital] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [drinks, setDrinks] = useState([])

    const {setStore} = useContext(StoreSearchContext);
    const [clickedStore, setClickedStore] = useState({})
    const history= useHistory();


    useEffect(() => {
        setId(accountDetail.id);
    }, [accountDetail], [latLng]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/recommends/individualUser/${id}`)
                .then((res) => {
                    console.log('소통 성공')
                    if (res.data.userBased) {
                        setUserBased(res.data.userBased)
                    } else if (res.data.noUserBased) {
                        setUserWarningMsg(res.data.noUserBased)
                    }
                    console.log(res.data.userBased)
                    console.log(res.data.noUserBased)
                }).catch(
                error => {
                    throw(error)
                }
            )

        }
    }, [id])

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/recommends/individualItem/${id}`)
                .then((res) => {
                    console.log('소통 성공')
                    if (res.data.itemBased) {
                        setItemBased(res.data.itemBased)
                    } else if (res.data.noItemBased) {
                        setItemWarningMsg(res.data.noItemBased)
                    }

                }).catch(
                error => {
                    throw(error)
                }
            )

        }
    }, [id])


    useEffect(() => {
        if (id) {
            axios.post(`http://localhost:8080/recommends/all/${id}`, latLng)
                .then((res) => {
                    console.log('소통 성공')
                    console.log(res.data)
                    setBestStore(res.data.bestStore)
                    setBestRated(res.data.bestRated)
                    setMostFav(res.data.mostFavorites)
                    setUserFavStore(res.data.userFavStore)
                    setUserFavBased(res.data.userFavBased)
                    setNoFavMsg(res.data.noFavorite)

                    setHospital(res.data.hospital)
                    setRestaurant(res.data.restaurant)
                    setDrinks(res.data.drinks)
                }).catch(
                error => {
                    throw(error)
                }
            )
        }
    }, [id])

    const showRatingStars = (numOfStars) => {
        let stars = "";
        for (let i = 0; i < numOfStars; i++) {
            stars += "★";
        }
        if (5 - numOfStars) {
            for (let i = 0; i < 5 - numOfStars; i++) {
                stars += "☆";
            }
        }
        return stars;
    };

    const clickStore = (store)=>{
        setStore(store);
        history.push("/storeDetail");
    }



    return (<>
        <h2>simin님을 위한 우리 동네 추천 가맹점</h2><br/>

        <h3>내 주변 인기 가맹점</h3>
        <div className="scrollContainer">
            {bestStore.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top" src={store.imgUrl}/>
                    <Card.Body>
                        <Card.Title id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                        <Card.Text>{store.address}</Card.Text>
                    </Card.Body>
                    <Card.Footer id="card-footer">
                        <small className="text-muted">
                            {store.mainCode}/{store.storeType}
                        </small>
                    </Card.Footer>
                </Card>
            ))}
        </div>
        <br/><br/>


        <h3>내 주변 별점 높은 가맹점</h3>
        <div className="scrollContainer">
            {bestRated.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top"
                              src={store.imgUrl}/>
                    <Card.Body>
                        <Card.Title id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                        <Card.Text>
                            {showRatingStars(parseInt(store.starRanking))}
                            <br/>
                            {store.address}

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer  id="card-footer">
                        <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                    </Card.Footer>
                </Card>))}
        </div>
        <br/><br/>


        <h3>즐겨찾은 사람이 많은 가맹점</h3>
        <div className="scrollContainer">
            {mostFav.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top"
                              src={store.imgUrl}/>
                    <Card.Body>
                        <Card.Title  id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                        <Card.Text>
                            {store.address}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer  id="card-footer">
                        <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                    </Card.Footer>
                </Card>))}
        </div>
        <br/><br/>


        <h3>인기 #병원 가맹점</h3>
        <div className="scrollContainer">
            {hospital.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top"
                              src={store.imgUrl}/>
                    <Card.Body>
                        <Card.Title  id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                        <Card.Text>
                            {store.address}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer  id="card-footer">
                        <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                    </Card.Footer>
                </Card>))}
        </div>
        <br/><br/>

        <h3>인기 #음식점 가맹점</h3>
        <div className="scrollContainer">
            {restaurant.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top"
                              src={store.imgUrl}/>
                    <Card.Body>
                        <Card.Title  id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                        <Card.Text>
                            {store.address}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer  id="card-footer">
                        <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                    </Card.Footer>
                </Card>))}
        </div>
        <br/><br/>


        <h3>인기 #디저트 가맹점</h3>
        <div className="scrollContainer">
            {drinks.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top"
                              src={store.imgUrl}/>
                    <Card.Body>
                        <Card.Title  id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                        <Card.Text>
                            {store.address}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer  id="card-footer">
                        <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                    </Card.Footer>
                </Card>))}
        </div>
        <br/><br/>


        {userFavBased &&
        <div>
            <h3>즐겨찾기한 {userFavStore}와 같은 업종 추천 가맹점</h3>
            <div className="scrollContainer">
                {userFavBased.map((store, i) => (
                        <Card className="cardItem" key={i}>
                            <Card.Img id="card-image" variant="top"
                                      src={store.imgUrl}/>
                            <Card.Body>
                                <Card.Title id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                                <Card.Text>
                                    {store.address}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer  id="card-footer">
                                <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                            </Card.Footer>
                        </Card>
                    )
                )}
            </div>
        </div>}

        <br/><br/>
        {noFavMsg && <div>
            <h4>즐겨찾기한 가맹점과 같은 업종 추천 가맹점</h4>
            <div  id="msg">
                <h6 style={{textAlign:"center"}}>{noFavMsg}<br/>
                <Button variant="outline-dark" size="sm" onClick={()=>{history.push("/find-by-map")}}>즐겨찾기 추가하기</Button></h6></div>
        </div>}<br/><br/>


        <h3>회원님과 유사한 회원들이 좋아하는 가맹점</h3>
        {(!itemWarningMsg && !itemBased) &&
        <div id="msg"> 찾 는 중
            <Spinner animation="border" variant="primary"/>
            <Spinner animation="border" variant="secondary"/>
            <Spinner animation="border" variant="success"/>
            <Spinner animation="border" variant="danger"/>
            <Spinner animation="border" variant="warning"/>
            <Spinner animation="border" variant="info"/></div>}

        {userBased &&
        <div className="scrollContainer">
            {userBased.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img id="card-image" variant="top"
                                  src={store.imgUrl}/>
                        <Card.Body>
                            <Card.Title id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                            <Card.Text>
                                {store.address}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer  id="card-footer">
                            <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                        </Card.Footer>
                    </Card>
                )
            )}
        </div>}
        {userWarningMsg && <div id="msg">
            <h4>{userWarningMsg}<br/>
            <Button variant="outline-dark" size="sm" onClick={()=>{history.push("/find-by-map")}}>별점 추가하기</Button></h4></div>}
        <br/><br/><br/><br/>



        <h3>즐겨찾기한 가맹점과 유사한 추천 가맹점</h3>
        {(itemWarningMsg || itemBased) && <div id="msg">
            찾는 중
            <Spinner animation="border" variant="primary"/>
            <Spinner animation="border" variant="secondary"/>
            <Spinner animation="border" variant="success"/>
            <Spinner animation="border" variant="danger"/>
            <Spinner animation="border" variant="warning"/>
            <Spinner animation="border" variant="info"/><br/><br/></div>}

        {itemBased &&
        <div>
            <div className="scrollContainer">
                {itemBased.map((store, i) => (
                        <Card className="cardItem" key={i}>
                            <Card.Img id="card-image" variant="top"
                                      src={store.imgUrl}/>
                            <Card.Body>
                                <Card.Title id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                                <Card.Text>
                                    {store.address}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer  id="card-footer">
                                <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                            </Card.Footer>
                        </Card>
                    )
                )}
            </div>
        </div>}
        {itemWarningMsg && <div id="msg">
            <h6>{itemWarningMsg}
            <br/><Button variant="outline-dark" size="sm" onClick={()=>{history.push("/find-by-map")}}>즐겨찾기 추가하기</Button></h6></div>}
        <br/><br/><br/><br/>

    </>)


}

export default Recommendation;
