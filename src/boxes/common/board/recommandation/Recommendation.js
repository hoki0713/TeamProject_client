import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Recommendation.css";

function Recommendation() {
    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'))
    const [latLng] = useState(JSON.parse(sessionStorage.getItem("LatLng") || '{}'))
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
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


    useEffect(() => {
        setId(accountDetail.id);
        setLat(latLng.latitude)
        setLng(latLng.longitude)
    }, [accountDetail], [latLng]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/recommends/individualUser/${id}`)
                .then((res) => {
                    console.log('소통 성공')
                    console.log(res.data.userBased)
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
            console.log("가나다라마" + lat + lng)
            axios.post(`http://localhost:8080/recommends/all/${id}`, latLng)
                .then((res) => {
                    console.log('소통 성공')
                    setBestStore(res.data.bestStore)
                    setBestRated(res.data.bestRated)
                    setMostFav(res.data.mostFavorites)
                    setUserFavStore(res.data.userFavStore)
                    setUserFavBased(res.data.userFavBased)
                    setNoFavMsg(res.data.noFavorite)
                }).catch(
                error => {
                    throw(error)
                }
            )
        }
    }, [id])


    const clickStore = (e)=>{

    }

    return (<>
        <h2>simin님을 위한 우리 동네 추천 가맹점</h2><br/>
      {!userWarningMsg &&
        <div className="scrollContainer">
          {userBased.map((store, i) => (
            <Card className="cardItem" key={i}>
              <Card.Img id="card-image" variant="top" src={store.imgUrl} />
              <Card.Body>
                <Card.Title id="card-title">{store.storeName}</Card.Title>
                <Card.Text>{store.address}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  {store.mainCode}/{store.storeType}
                </small>
              </Card.Footer>
            </Card>
          ))}
        </div>}
        <br/><br/>

        <h4>내 주변 별점 높은 가맹점</h4>
        <div className="scrollContainer">
            {bestRated.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top"
                              src={store.imgUrl}/>
                    <Card.Body>
                        <Card.Title ><Link to="/storeDetail" onClick={()=>{}}>{store.storeName}</Link></Card.Title>
                        <Card.Text>
                            {store.starRanking}
                            <br/>
                            {store.address}

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                    </Card.Footer>
                </Card>))}
        </div>
        <br/><br/>


        <h4>즐겨찾은 사람이 많은 가맹점</h4>
        <div className="scrollContainer">
            {mostFav.map((store, i) => (
                <Card className="cardItem" key={i}>
                    <Card.Img id="card-image" variant="top"
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


        {!noFavMsg &&
          <div>
              <h4>즐겨찾기한 {userFavStore}와 같은 업종 추천 가맹점</h4>
          <div className="scrollContainer">
              {userFavBased.map((store, i) => (
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
          </div>}

        <br/><br/>
        {noFavMsg &&  <div className="scrollContainer">
            <h4>{noFavMsg}</h4></div>}



        <h4>회원님과 유사한 회원들이 좋아하는 가맹점</h4>
        {(!userWarningMsg || !userBased) &&
        <div> 굴러간다 굴렁쇠
        <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="info" /></div>}

        {!userWarningMsg &&
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
        </div>}
        {userWarningMsg &&  <div className="scrollContainer">
            <h4>{userWarningMsg}</h4></div>}
        <br/><br/><br/><br/>



        {(!itemWarningMsg || !itemBased) &&<div>
        <h4>즐겨찾기한 #순남시래기와 유사한 추천 가맹점</h4>
         빅 데 이 터 가 동 중 삐 용 삐 용
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="info" /></div>}

        {!itemWarningMsg &&
            <div> <h4>즐겨찾기한 #순남시래기와 유사한 추천 가맹점</h4>
        <div className="scrollContainer">
            {itemBased.map((store, i) => (
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
            </div>}
        {itemWarningMsg &&  <div className="scrollContainer">
            <h4>{itemWarningMsg}</h4></div>}
        <br/><br/><br/><br/>

    </>)


}

export default Recommendation;
