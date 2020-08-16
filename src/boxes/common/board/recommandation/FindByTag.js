import React, {useEffect, useState} from 'react';
import {CardDeck, Card, Button, Form, Row, Col, ListGroup} from 'react-bootstrap'
import axios from 'axios'
import {useSelector} from "react-redux";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");

function FindByTag() {

    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || `{}`));
    const [id, setId] = useState("");
    const [userGender, setUserGender] = useState("")
    const [userBirthYear, setUserBirthYear] = useState(0);
    const [userGenderKor, setUserGenderKor] = useState("")
    const [userAgeGroup, setUserAgeGroup] = useState(0)
    const [ageGroup, setAgeGroup] = useState(0);
    const [gender, setGender] = useState("null")
    const [userIndustry, setUserIndustry] = useState([])
    const [genderIndustry, setGenderIndustry] = useState([])
    const [ageIndustry, setAgeIndustry] = useState([])
    const [totalIndustry, setTotalIndustry] = useState([])
    const [searchIndustry, setSearchIndustry] = useState([])
    const [industryName, setIndustryName] = useState([])
    const [resultStores, setResultStores] = useState([])
    const [genderKor, setGenderKor] = useState("성별무관")
    const latLng = useSelector(state => state.userLatLng)
    const myLoca = JSON.parse(sessionStorage.getItem("accountDetail"))
        .defaultAddr;
    const [userLatLng, setUserLatLng] = useState({latitude: 0, longitude: 0});


    const getLatLng = () => {
        Geocode.fromAddress(myLoca).then(
            (response) => {
                const resLatLng = response.results[0].geometry.location;
                setUserLatLng({latitude: resLatLng.lat, longitude: resLatLng.lng});
                console.log(resLatLng);
                console.log(userLatLng);

            },
            (error) => {
                console.error(error);
            }
        );

    };

    useEffect(() => {
        setId(accountDetail.id)
        setUserGender(accountDetail.gender);
        setUserBirthYear(accountDetail.birthDate.split("-")[0])
    }, [accountDetail]);


    useEffect(() => {
        if (id) {
            console.log(userGender)
            console.log(userBirthYear)
            axios.get(`http://localhost:8080/recommends/tag/${userGender}/${userBirthYear}`)
                .then((res) => {
                    setTotalIndustry(res.data.byTotal)
                    setUserIndustry(res.data.byGenderAge)
                    setAgeIndustry(res.data.byAge)
                    setGenderIndustry(res.data.byGender)
                    setUserGenderKor(res.data.userGenderKor)
                    setUserAgeGroup(res.data.userAgeGroup)
                    console.log("유즈이펙트 성공")
                })
                .catch(error => {
                    throw(error)
                })
        }
    }, [id])

    useEffect(() => {
        getLatLng();
    }, []);

    const BASE_COLOR = "red";
    const OTHER_COLOR = "blue";

    const [isActive, setActive] = useState(false);

    const handleColor = (e) => {
        setActive(!isActive)
        if (!isActive) {

            document.getElementById("button").style.backgroundColor = 'gray'
        } else {
            document.getElementById("button").style.backgroundColor = 'white';
        }
    }

    const handleIndustry = () => {
        if (gender !== "null" || ageGroup !== 0) {
            axios.get(`http://localhost:8080/recommends/search/${gender}/${ageGroup}`)
                .then((res) => {
                    console.log('성공')
                    setSearchIndustry(res.data.searchResult)
                })
                .catch(error => {
                    throw(error)
                })
        }

    }

    const handleGender = (e) => {
        setGender(e.target.value);
        if(gender==="F"){setGenderKor("여성")}
        else if(gender==="M"){setGenderKor("남성")}
        else if(gender==="null"){setGenderKor("성별무관")}
        console.log("gender시작" + gender + "age시작" + ageGroup)
        handleIndustry()
        handleColor()
    }
    const handleAge = (e) => {
        setAgeGroup(e.target.value);
        console.log("age시작" + ageGroup + "gender" + gender)
        handleIndustry()
        handleColor()
    }

    const submitSearch = (e) => {
        e.preventDefault()
        console.log(userLatLng);
        sessionStorage.setItem("LatLng", JSON.stringify(userLatLng));
        axios.post(`http://localhost:8080/recommends/storesByIndustry/${gender}/${ageGroup}`, userLatLng)
            .then((res) => {
                console.log('가게 리스트 가져오기 성공')
                console.log(res.data);
                const values = [];
                const keys = [];
                Object.entries(res.data).forEach(([key, value]) => {
                    keys.push(key)
                    values.push(value)
                })
                setIndustryName(keys)
                setResultStores(values)
            })
            .catch(error => {
                throw(error)
            })
    }

    const submitUserSearch = (e) => {
        e.preventDefault()
        console.log(userLatLng);
        sessionStorage.setItem("LatLng", JSON.stringify(userLatLng));
        setGender(userGender);
        setAgeGroup(userAgeGroup);
        console.log(gender+ageGroup)
        axios.post(`http://localhost:8080/recommends/storesByIndustry/${gender}/${ageGroup}`, userLatLng)
            .then((res) => {
                console.log('가게 리스트 가져오기 성공')
                console.log(res.data);
                const values = [];
                const keys = [];
                Object.entries(res.data).forEach(([key, value]) => {
                    keys.push(key)
                    values.push(value)
                })
                setIndustryName(keys)
                setResultStores(values)
            })
            .catch(error => {
                throw(error)
            })
    }

    const submitTotalSearch = (e) => {
        e.preventDefault()
        console.log(userLatLng);
        sessionStorage.setItem("LatLng", JSON.stringify(userLatLng));

        axios.post(`http://localhost:8080/recommends/storesByIndustry/${gender}/${ageGroup}`, userLatLng)
            .then((res) => {
                console.log('가게 리스트 가져오기 성공')
                console.log(res.data);
                const values = [];
                const keys = [];
                Object.entries(res.data).forEach(([key, value]) => {
                    keys.push(key)
                    values.push(value)
                })
                setIndustryName(keys)
                setResultStores(values)
            })
            .catch(error => {
                throw(error)
            })
    }



    return (
        <>
            <div style={{textAlign: 'center'}}><br/>
                <h1>태그로 찾기</h1><br/>
                <CardDeck>
                    <Card style={{width: '18rem'}}>
                        <Card.Header onClick={submitSearch} >전체 업종 TOP 5</Card.Header>
                        {totalIndustry.map((industry, i) => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                                </ListGroup>
                            )
                        )}
                    </Card>
                    <Card>
                        <Card.Header onClick={submitUserSearch} >나({userAgeGroup}대 X {userGenderKor})의 관심업종 TOP 5</Card.Header>
                        {userIndustry.map((industry, i) => (
                            <ListGroup variant="flush">
                                <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                            </ListGroup>)
                        )}
                    </Card>
                    {(handleGender || handleAge) && <Card>
                        <Card.Header onClick={submitSearch}>

                            {ageGroup}대 X {genderKor}의 관심업종 TOP 5</Card.Header>
                        {searchIndustry.map((industry, i) => (
                            <ListGroup variant="flush">
                                <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                            </ListGroup>)
                        )}
                    </Card>}

                </CardDeck>

            </div>
            <br/><br/><br/>
            <h3 style={{textAlign: "center"}}>맞춤검색</h3><br/>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        성별
                    </Form.Label>
                    <Col sm={10}>
                        <Button id="button" variant="outline-dark" type="button" onClick={handleGender}
                                value="M">남성</Button>{' '}
                        <Button id="button" variant="outline-dark" type="button" onClick={handleGender}
                                value={"F"}>여성</Button>{' '}
                        <Button id="button" variant="outline-dark" type="button" onClick={handleGender}
                                value={"null"}>성별무관</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        연령
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="outline-dark" type="button" value={10} onClick={handleAge}>10대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={20} onClick={handleAge}>20대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={30} onClick={handleAge}>30대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={40} onClick={handleAge}>40대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={50} onClick={handleAge}>50대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={60} onClick={handleAge}>60대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={0} onClick={handleAge}>연령무관</Button>
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
                        <Button variant="outline-dark">#즐겨찾기_많은</Button>
                    </Col>
                    <br/> <br/>
                </Form.Group>
                <div style={{textAlign: "center"}}>
                    <Button variant="primary" type="submit" onClick={submitSearch}>맞춤 가맹점 검색</Button>{' '}</div>
                </Form>

                    {resultStores.forEach((ele) => (
                        ele.map((store, i) => (
                            <Card className="cardItem" key={i}>
                                <Card.Img style={{height: "50%"}} variant="top"
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
                            </Card>
                        )))
                    )}
                    <br/><br/><br/><br/>
                    {resultStores.map((list, i) => (
                        <div className="scrollContainer" key={i}>
                            <h2>{`${i+1}. ${industryName[i]}인 업종`}</h2><br/><br/>
                            {list.map((store, j) => (
                                <Card className="cardItem" key={j}>
                                    <Card.Img style={{height: "50%"}} variant="top"
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
                                </Card>
                            ))}
                        </div>
                    ))}
                </>

                )}

                export default FindByTag;