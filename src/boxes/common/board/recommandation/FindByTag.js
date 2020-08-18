import React, {useEffect, useState, useContext} from 'react';
import {CardDeck, Card, Button, Form, Row, Col, ListGroup, ButtonGroup, ToggleButton} from 'react-bootstrap'
import axios from 'axios'
import './Recommendation.css'
import {StoreSearchContext} from "../../../../items/context/StoreSearchContext";
import {useHistory} from 'react-router-dom'

function FindByTag() {


    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || `{}`));
    const [latLng] = useState(JSON.parse(sessionStorage.getItem("userLocation") || '{}'))
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
    const [genderKor, setGenderKor] = useState("성별")
    const [ageKor, setAgeKor] = useState("연령")
    const [show, setShow] = useState(false)
    const [option, setOption] = useState(0)
    const {setStore} = useContext(StoreSearchContext);
    const [clickedStore, setClickedStore] = useState({})
    const history= useHistory();

    const radiosGender = [
        { name: '남성', value: 'M' },
        { name: '여성', value: 'F' },
        { name: '성별무관', value: 'none' },
    ];



    useEffect(() => {
        setId(accountDetail.id)
        setUserGender(accountDetail.gender);
        setUserBirthYear(accountDetail.birthDate.split("-")[0])
    }, [accountDetail], [latLng]);


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
        if (gender === "F") {
            setGenderKor("여성")
        } else if (gender === "M") {
            setGenderKor("남성")
        } else if (gender === "none") {
            setGenderKor("성별무관")
        }
        console.log("gender시작" + gender + "age시작" + ageGroup)
        handleIndustry()
        setShow(true)
        handleColor()
    }
    const handleAge = (e) => {
        setAgeGroup(e.target.value);
        if(ageGroup===100){
            setAgeKor("연령무관")
        } else if(ageGroup === 10 || 20 || 30 || 40|| 50)
           {setAgeKor(ageGroup+"대")}
        else {setAgeKor("60대 이상")}
        console.log("age시작" + ageGroup + "gender" + gender)
        handleIndustry()
        handleColor()
        setShow(true)
    }

    const handleOption=e=>{
        e.preventDefault()
        setOption(e.target.value)

    }

    const submitSearch = (e) => {
        e.preventDefault()
        if (
            ageGroup === 0 ||
            gender === "null" ||
            option === 0
        ) {
            alert("모든 사항을 선택 선택해주세요");
        } else {
            console.log(ageGroup+gender+option)
            axios.post(`http://localhost:8080/recommends/storesByIndustry/${gender}/${ageGroup}/${option}`, latLng)
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
        }}


    // const submitUserSearch = (e) => {
    //     e.preventDefault()
    //     setGender(userGender);
    //     setAgeGroup(userAgeGroup);
    //     console.log(gender + ageGroup)
    //     axios.post(`http://localhost:8080/recommends/storesByIndustry/${gender}/${ageGroup}`, latLng)
    //         .then((res) => {
    //             console.log('가게 리스트 가져오기 성공')
    //             console.log(res.data);
    //             const values = [];
    //             const keys = [];
    //             Object.entries(res.data).forEach(([key, value]) => {
    //                 keys.push(key)
    //                 values.push(value)
    //             })
    //             setIndustryName(keys)
    //             setResultStores(values)
    //         })
    //         .catch(error => {
    //             throw(error)
    //         })
    // }

    const submitTotalSearch = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8080/recommends/storesByIndustry/${gender}/${ageGroup}`, latLng)
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

    const clickStore = (store)=>{
        setStore(store);
        history.push("/storeDetail");
    }


    return (
        <>
            <div style={{textAlign: 'center'}}><br/>
                <h1>태그로 찾기</h1><br/>
                <CardDeck>
                    <Card style={{width: '18rem'}}>
                        <Card.Header>전체 업종 TOP 5</Card.Header>
                        {totalIndustry.map((industry, i) => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                                </ListGroup>
                            )
                        )}
                    </Card>
                    <Card>
                        <Card.Header>나({userAgeGroup}대 X {userGenderKor})의 관심업종 TOP
                            5</Card.Header>
                        {userIndustry.map((industry, i) => (
                            <ListGroup variant="flush">
                                <ListGroup.Item key={i}>{i + 1}. {industry.industryName}
                                {totalIndustry[i].industryName===userIndustry[i].industryName ? "" : " √"}
                                </ListGroup.Item>
                            </ListGroup>)
                        )}
                    </Card>
                    {/*{(totalIndustry[i].industryName===userIndustry[i].industryName*/}
                    {/*    && totalIndustry.indexOf(totalIndustry[i]) === userIndustry.indexOf(totalIndustry[i])) ? "같음" : "다름"}*/}

                    {(show) && <Card>
                        <Card.Header>

                            {ageKor} X {genderKor}의 관심업종 TOP 5</Card.Header>
                        {searchIndustry.map((industry, i) => (
                            <ListGroup variant="flush">
                                <ListGroup.Item key={i}>{i + 1}. {industry.industryName}{totalIndustry[i].industryName===searchIndustry[i].industryName ? "" : " √"}</ListGroup.Item>
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
                                value={"none"}>성별무관</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        연령
                    </Form.Label>
                    <Col sm={10}>

                        <ButtonGroup toggle>
                            {radiosGender.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    variant="outline-dark"
                                    name="genderGroup"
                                    value={radio.value}
                                    checked={gender === radio.value}
                                    onChange={(e) => setGender(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>




                        <Button variant="outline-dark" type="button" value={10} onClick={handleAge}>10대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={20} onClick={handleAge}>20대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={30} onClick={handleAge}>30대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={40} onClick={handleAge}>40대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={50} onClick={handleAge}>50대</Button>{' '}
                        <Button variant="outline-dark" type="button" value={60} onClick={handleAge}>60대 이상</Button>{' '}
                        <Button variant="outline-dark" type="button" value={100} onClick={handleAge}>연령무관</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        추천 태그
                    </Form.Label>
                    <Col sm={10}>
                        <Button variant="outline-dark" type="button" value={1} onClick={handleOption}>#인기 많은</Button>{' '}
                        <Button variant="outline-dark" type="button" value={2} onClick={handleOption}>#즐겨찾기 많은</Button>{' '}
                        <Button variant="outline-dark" type="button" value={3} onClick={handleOption}>#별점 높은</Button>{' '}
                    </Col>
                    <br/> <br/>
                </Form.Group>
                <div style={{textAlign: "center"}}>
                    <Button variant="primary" type="submit" onClick={submitSearch}>맞춤 가맹점 검색</Button>{' '}</div>
            </Form>


            <br/><br/><br/><br/>
            {resultStores.map((list, i) => (
                <div>
                    <h2 key={i}>{`${i + 1}. ${industryName[i]}업`}</h2>
                    <div className="scrollContainer" >
                        {list.map((store, j) => (
                            <Card className="cardItem" key={j}>
                                <Card.Img id="card-image" variant="top"
                                          src={store.imgUrl}/>
                                <Card.Body>
                                    <Card.Title id="card-title" onClick={()=>{clickStore(store)}}>{store.storeName}</Card.Title>
                                    <Card.Text>
                                        {store.address}<br/>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer id="card-footer">
                                    <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                                </Card.Footer>
                            </Card>
                        ))}

                    </div><br/><br/><br/><br/>
                </div>
                ))}

</>
    )
}

export default FindByTag;