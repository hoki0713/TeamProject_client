import React, {useEffect, useState, useContext} from 'react';
import {CardDeck, Card, Button, Form, Row, Col, ListGroup, ButtonGroup, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
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
    const [totalIndustry, setTotalIndustry] = useState([])
    const [searchIndustry, setSearchIndustry] = useState([])
    const [industryName, setIndustryName] = useState([])
    const [resultStores, setResultStores] = useState([])
    const [genderKor, setGenderKor] = useState("성별")
    const [ageKor, setAgeKor] = useState("연령")
    const [option, setOption] = useState(0)
    const {setStore} = useContext(StoreSearchContext);
    const history= useHistory();

    const radiosGender = [
        { name: '남성', value: 'M' },
        { name: '여성', value: 'F' },
        { name: '성별무관', value: 'none' },
    ];

    const radiosAgeGroup = [
        { name: '10대', value: 10 },
        { name: '20대', value: 20 },
        { name: '30대', value: 30 },
        { name: '40대', value: 40 },
        { name: '50대', value: 50 },
        { name: '60대 이상', value: 60 },
        { name: '연령무관', value: 100 },
    ];

    const radiosOption = [
        { name: '#인기많은', value: 1 },
        { name: '#즐겨찾기 많은', value: 2 },
        { name: '#별점 높은', value: 3 },
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
            axios.get(`http://localhost:8080/recommends/user/${userGender}/${userBirthYear}`)
                .then((res) => {
                    setTotalIndustry(res.data.byTotal)
                    setUserIndustry(res.data.byGenderAge)
                    setUserGenderKor(res.data.userGenderKor)
                    setUserAgeGroup(res.data.userAgeGroup)
                    console.log("유즈이펙트 성공")
                })
                .catch(error => {
                    throw(error)
                })
        }
    }, [id])



    const handleIndustry = () => {
        if (gender !== "null" && ageGroup !== 0) {
            axios.get(`http://localhost:8080/recommends/rank/${gender}/${ageGroup}`)
                .then((res) => {
                    console.log('랭킹 성공')
                    setSearchIndustry(res.data.searchResult)
                })
                .catch(error => {
                    throw(error)
                })
        }

    }

    const changeGender=(gender)=>{
        setGender(gender)
    }

    const fixGenderKor=(gender)=>{
        if (gender === "F") {
            setGenderKor("여성")
        } else if (gender === "M") {
            setGenderKor("남성")
        } else if (gender === "none") {
            setGenderKor("성별무관")
        }
    }
    const handleGender = (e) => {
        changeGender(e.target.value);
        fixGenderKor(gender)
        console.log("gender시작" + gender + "age시작" + ageGroup)
        handleIndustry()
    }

    const handleAge = e => {
        setAgeGroup(e.target.value);
        if(ageGroup>61){
            setAgeKor("연령무관");
        } else if(1<ageGroup <51)
           {setAgeKor(ageGroup+"대")}
        else if(ageGroup===0){ageGroup("연령")}
        else {setAgeKor("60대 이상")}
        console.log("age시작" + ageGroup + "gender" + gender)
        handleIndustry()
    }

    const handleOption=(e)=>{
        console.log('몇번이 클릭됐는지'+e.target.value)
        setOption(e.target.value)
    }

    const submitSearch = (e) => {
        if (
            ageGroup === 0 ||
            gender === "null" ||
            option === 0
        ) {
            alert("모든 사항을 선택 선택해주세요");
        } else {
            console.log(ageGroup+gender+option)
            axios.post(`http://localhost:8080/recommends/result/${gender}/${ageGroup}/${option}`, latLng)
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


    const clickStore = (store)=>{
        setStore(store);
        history.push("/storeDetail");
    }


    return (
        <>
            <h2>태그로 검색하기</h2><br/>
            <div style={{textAlign: 'center'}}>
               <h2>소비자별 최다 소비 업종</h2>

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

                    {/*{if (totalIndustry.industry.industryName === totalIndustry.industry.industryName) {*/}
                    {/*    if (totalIndustry.indexof(industry)> )*/}
                    {/*}*/}
                    {/*    (totalIndustry.indexOf(industry) > userIndustry.indexOf(industry)) ? "낮음" : "높음"}*/}
                    {/*    */}
                    {<Card>
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
            <h3 style={{textAlign: "center"}}>태그 검색</h3><br/>
           <Form>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        성별
                    </Form.Label>
                    <Col sm={10}>
                        <div  onClick={handleGender}>
                        <Button id="button" variant="outline-dark" type="button"
                                value="M">남성</Button>{' '}
                        <Button id="button" variant="outline-dark" type="button"
                                value={"F"}>여성</Button>{' '}
                        <Button id="button" variant="outline-dark" type="button"
                                value={"none"}>성별무관</Button>
                        </div>

                        <ButtonGroup toggle>
                            {radiosGender.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    variant="outline-dark"
                                    name="genderGroup"
                                    value={radio.value}
                                    onChange={handleGender}
                                    checked={gender === radio.value}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
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
                        <Button variant="outline-dark" type="button" value={60} onClick={handleAge}>60대 이상</Button>{' '}
                        <Button variant="outline-dark" type="button" value={100} onClick={handleAge}>연령무관</Button>


                        <ButtonGroup toggle>
                            {radiosAgeGroup.map((radios, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    variant="outline-dark"
                                    name="ageGroups"
                                    value={radios.value}
                                    onChanged={handleAge}
                                    checked={ageGroup !== radios.value}
                                >
                                    {radios.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        정렬 조건
                    </Form.Label>
                    <Col sm={10}>
                        {/*<ButtonGroup toggle>*/}
                        {/*    {radiosOption.map((opt, idx) => (*/}
                        {/*        <ToggleButton*/}
                        {/*            key={idx}*/}
                        {/*            type="radio"*/}
                        {/*            variant="outline-dark"*/}
                        {/*            name="optionGroup"*/}
                        {/*            value={opt.value}*/}
                        {/*            checked={option === opt.value}*/}
                        {/*            onChange={handleOption}*/}
                        {/*        >*/}
                        {/*            {opt.name}*/}
                        {/*        </ToggleButton>*/}
                        {/*    ))}*/}
                        {/*</ButtonGroup>*/}

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

                    </div><br/><br/><br/>
                </div>
                ))}

</>
    )
}

export default FindByTag;