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
    const [itemBasedStore, setItemBasedStore] = useState("")
    const [bestStore, setBestStore] = useState([])
    const [mostFav, setMostFav] = useState([])
    const [bestRated, setBestRated] = useState([])
    const [userFavBased, setUserFavBased] = useState(null)
    const [userFavStore, setUserFavStore] = useState("")
    const [noFavMsg, setNoFavMsg] = useState("")
    const [userWarningMsg, setUserWarningMsg] = useState("")
    const [itemWarningMsg, setItemWarningMsg] = useState("")
    const [hospital, setHospital] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [drinks, setDrinks] = useState([])


    const {setStore} = useContext(StoreSearchContext);
    const history = useHistory();


    useEffect(() => {
        setId(accountDetail.id);
    }, [accountDetail], [latLng]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/recommends/userBased/${id}`)
                .then((res) => {
                    if (res.data.userBased) {
                        setUserBased(res.data.userBased)
                    } else if (res.data.noUserBased) {
                        setUserWarningMsg(res.data.noUserBased)
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
            axios.get(`http://localhost:8080/recommends/itemBased/${id}`)
                .then((res) => {
                    if (res.data.itemBased) {
                        setItemBased(res.data.itemBased)
                        setItemBasedStore(res.data.itemBasedStore)
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

    const clickStore = (store) => {
        setStore(store);
        history.push("/storeDetail");
    }


    return (
        <>
            <h2 className="mt-4" style={{"text-align": "center"}}>
                <span style={{"color": "#7C05F2"}}>{accountDetail.name} 님</span>을 위한 우리 동네 추천 가맹점
            </h2>
            <br/>
            <h3>&#128077; 내 주변 인기 가맹점</h3>
            <div className="scrollContainer">
                {bestStore.length===0 && (<div style={{textAlign : 'center'}}>
                    <h4>인근에 해당하는 가맹점이 없습니다. </h4>
                </div>)}
                {bestStore.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img id="card-image" variant="top" src={store.imgUrl}/>
                        <Card.Body>
                            <Card.Title id="card-title" onClick={() => {
                                clickStore(store)
                            }}>{store.storeName}</Card.Title>
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


            <h3>&#127775; 내 주변 별점 높은 가맹점</h3>
            <div className="scrollContainer">
                {bestRated.length===0 && (<div style={{textAlign : 'center'}}>
                    <h4 >인근에 해당하는 가맹점이 없습니다.</h4>
                </div>)}
                {bestRated.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img id="card-image" variant="top"
                                  src={store.imgUrl}/>
                        <Card.Body>
                            <Card.Title id="card-title" onClick={() => {
                                clickStore(store)
                            }}>{store.storeName}</Card.Title>
                            <Card.Text>
                                {(store.starRanking) ?
                                    <span>{showRatingStars(parseInt(store.starRanking))}{store.starRanking}</span> :
                                    <span></span>}<br/>
                                {store.address}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer id="card-footer">
                            <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                        </Card.Footer>
                    </Card>))}
            </div>
            <br/><br/>


            <h3>&#128152; 즐겨찾은 사람이 많은 가맹점</h3>
            <div className="scrollContainer">
                {mostFav.length===0 && (<div style={{textAlign : 'center'}}>
                    <h4>인근에 해당하는 가맹점이 없습니다. </h4>
                </div>)}
                {mostFav.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img id="card-image" variant="top"
                                  src={store.imgUrl}/>
                        <Card.Body>
                            <Card.Title id="card-title" onClick={() => {
                                clickStore(store)
                            }}>{store.storeName}</Card.Title>
                            <Card.Text>
                                {store.address}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer id="card-footer">
                            <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                        </Card.Footer>
                    </Card>))}
            </div>
            <br/><br/>


            <h3>&#127973; 인기 #병원 가맹점</h3>
            <div className="scrollContainer">
                {hospital.length===0 && (<div style={{textAlign : 'center'}}>
                    <h4>인근에 해당하는 가맹점이 없습니다. </h4>
                </div>)}
                {hospital.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img id="card-image" variant="top"
                                  src={store.imgUrl}/>
                        <Card.Body>
                            <Card.Title id="card-title" onClick={() => {
                                clickStore(store)
                            }}>{store.storeName}</Card.Title>
                            <Card.Text>
                                {store.address}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer id="card-footer">
                            <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                        </Card.Footer>
                    </Card>))}
            </div>
            <br/><br/>

            <h3>&#129368; 인기 #음식점 가맹점</h3>
            <div className="scrollContainer">
                {restaurant.length===0 && (<div style={{textAlign : 'center'}}>
                    <h4>인근에 해당하는 가맹점이 없습니다. </h4>
                </div>)}
                {restaurant.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img id="card-image" variant="top"
                                  src={store.imgUrl}/>
                        <Card.Body>
                            <Card.Title id="card-title" onClick={() => {
                                clickStore(store)
                            }}>{store.storeName}</Card.Title>
                            <Card.Text>
                                {store.address}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer id="card-footer">
                            <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                        </Card.Footer>
                    </Card>))}
            </div>
            <br/><br/>


            <h3>&#127846; 인기 #음료식품 가맹점</h3>
            <div className="scrollContainer">
                {drinks.length===0 && (<div style={{textAlign : 'center'}}>
                    <h4>인근에 해당하는 가맹점이 없습니다. </h4>
                </div>)}
                {drinks.map((store, i) => (
                    <Card className="cardItem" key={i}>
                        <Card.Img id="card-image" variant="top"
                                  src={store.imgUrl}/>
                        <Card.Body>
                            <Card.Title id="card-title" onClick={() => {
                                clickStore(store)
                            }}>{store.storeName}</Card.Title>
                            <Card.Text>
                                {store.address}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer id="card-footer">
                            <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                        </Card.Footer>
                    </Card>))}
            </div>
            <br/><br/>


            {userFavBased &&
            <div>
                <h3>&#127879; 즐겨찾기한 <span style={{"color": "#7C05F2"}}>{userFavStore}</span>와/과 같은 업종 추천 가맹점</h3>
                <div className="scrollContainer">
                    {userFavBased.map((store, i) => (
                            <Card className="cardItem" key={i}>
                                <Card.Img id="card-image" variant="top"
                                          src={store.imgUrl}/>
                                <Card.Body>
                                    <Card.Title id="card-title" onClick={() => {
                                        clickStore(store)
                                    }}>{store.storeName}</Card.Title>
                                    <Card.Text>
                                        {store.address}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer id="card-footer">
                                    <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                                </Card.Footer>
                            </Card>
                        ))}
                </div>
            </div>}

            {noFavMsg && <div>
                <h3>&#127879; 즐겨찾기한 가맹점과 같은 업종 추천 가맹점</h3>
                <div id="msg">
                    <br/><h4 style={{textAlign: "center"}}>{noFavMsg}<br/>
                        <Button variant="outline-dark" size="sm" onClick={() => {
                            history.push("/find-by-map")
                        }}>즐겨찾기 추가하기</Button></h4></div>
            </div>}<br/><br/>


            <h3>&#128109; 회원님과 유사한 회원들이 좋아하는 가맹점</h3>
            {(userBased.length === 0 && !userWarningMsg) &&
            <div id="msg"><h4>찾 는 중 &#8987;</h4>
                <Spinner animation="grow" variant="primary"/>
                <Spinner animation="grow" variant="secondary"/>
                <Spinner animation="grow" variant="success"/>
                <Spinner animation="grow" variant="danger"/>
                <Spinner animation="grow" variant="warning"/>
                <Spinner animation="grow" variant="info"/>
                <Spinner animation="grow" variant="light"/>
                <Spinner animation="grow" variant="dark"/></div>}

            {userBased &&
            <div className="scrollContainer">
                {userBased.map((store, i) => (
                        <Card className="cardItem" key={i}>
                            <Card.Img id="card-image" variant="top"
                                      src={store.imgUrl}/>
                            <Card.Body>
                                <Card.Title id="card-title" onClick={() => {
                                    clickStore(store)
                                }}>{store.storeName}</Card.Title>
                                <Card.Text>
                                    {store.address}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer id="card-footer">
                                <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                            </Card.Footer>
                        </Card>
                    )
                )}
            </div>}
            {userWarningMsg && <div id="msg">
                <h4>{userWarningMsg}<br/>
                    <Button variant="outline-dark" size="sm" onClick={() => {
                        history.push("/find-by-map")
                    }}>별점 추가하기</Button></h4></div>}
            <br/><br/>


            <h3>&#128525; 리뷰한 <span style={{"color": "#7C05F2"}}>{itemBasedStore}</span> 가맹점과 유사한 추천 가맹점</h3>
            {(itemBased.length === 0 && !itemWarningMsg) && <div id="msg">
                <h4>찾 는 중 &#8987;</h4>
                <Spinner animation="grow" variant="primary"/>
                <Spinner animation="grow" variant="secondary"/>
                <Spinner animation="grow" variant="success"/>
                <Spinner animation="grow" variant="danger"/>
                <Spinner animation="grow" variant="warning"/>
                <Spinner animation="grow" variant="info"/>
                <Spinner animation="grow" variant="light"/>
                <Spinner animation="grow" variant="dark"/><br/><br/></div>}

            {itemBased &&
            <div>
                <div className="scrollContainer">
                    {itemBased.map((store, i) => (
                            <Card className="cardItem" key={i}>
                                <Card.Img id="card-image" variant="top"
                                          src={store.imgUrl}/>
                                <Card.Body>
                                    <Card.Title id="card-title" onClick={() => {
                                        clickStore(store)
                                    }}>{store.storeName}</Card.Title>
                                    <Card.Text>
                                        {store.address}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer id="card-footer">
                                    <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                                </Card.Footer>
                            </Card>
                        )
                    )}
                </div>
            </div>}
            {itemWarningMsg && (
                <div id="msg">
                    <h4>
                        {itemWarningMsg}
                        <br/>
                        <Button variant="outline-dark" size="sm" onClick={() => {
                            history.push("/find-by-map")
                        }}>
                            별점 추가하기
                        </Button>
                    </h4>
                </div>
            )}
            <br/><br/><br/><br/>

        </>)


}

export default Recommendation;
