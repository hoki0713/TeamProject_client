import React, {useEffect, useState, useContext} from 'react';
import {
    CardDeck,
    Card,
    Button,
    Form,
    Row,
    Col,
    ListGroup,
    ButtonGroup,
    ToggleButton,
    OverlayTrigger, Tooltip
} from 'react-bootstrap'
import axios from 'axios'
import './Recommendation.css'
import { StoreSearchContext } from "../../../../context/StoreSearchContext";
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
    const history = useHistory();

    const radiosGender = [
        {name: '남성', value: 'M'},
        {name: '여성', value: 'F'},
        {name: '성별무관', value: 'none'},
    ];

    const radiosAgeGroup = [
        {name: '10대', value: '10'},
        {name: '20대', value: '20'},
        {name: '30대', value: '30'},
        {name: '40대', value: '40'},
        {name: '50대', value: '50'},
        {name: '60대', value: '60'},
        {name: '연령무관', value: '100'},
    ];

    const radiosOption = [
        {name: '#인기많은', value: '1'},
        {name: '#즐겨찾기 많은', value: '2'},
        {name: '#별점 높은', value: '3'},
    ];


    useEffect(() => {
        setId(accountDetail.id)
        setUserGender(accountDetail.gender);
        setUserBirthYear(accountDetail.birthDate.split("-")[0])
    }, [accountDetail], [latLng]);

    useEffect(() => {
        fixGenderKor(gender)
        handleIndustry()
    }, [gender]);

    useEffect(() => {
        fixAgeGroup(ageGroup)
        handleIndustry()
    }, [ageGroup]);




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

    const changeGender = (gender) => {
        setGender(gender)
    }

    const changeAge = (ageGroup) => {
        setAgeGroup(ageGroup)
    }

    const changeOption = (option) => {
        setOption(option)
    }

    const fixGenderKor = (gender) => {
        if (gender === "F") {
            setGenderKor("여성")
        } else if (gender === "M") {
            setGenderKor("남성")
        } else if (gender === "none") {
            setGenderKor("성별무관")
        }
    }

    const fixAgeGroup = (ageGroup) => {
        if (ageGroup > 61) {
            setAgeKor("연령무관");
        } else if (ageGroup === 0) {
            setAgeKor("연령");
        } else if (1 < ageGroup && ageGroup < 61) {
            setAgeKor(ageGroup + "대");
        } 
    }

    const handleGender = (e) => {
        console.log('몇번이 클릭됐는지' + e.target.value)
        changeGender(e.target.value);
    }

    const handleAge = e => {
        console.log('몇번이 클릭됐는지' + e.target.value)
        changeAge(e.target.value);
    }

    const handleOption = (e) => {
        console.log('몇번이 클릭됐는지' + e.target.value)
        changeOption(e.target.value)
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
            console.log(ageGroup + gender + option)
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
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            해당 인근 가맹점이 없으면 인기순으로 보여집니다.
        </Tooltip>
    );

    const clickStore = (store) => {
        setStore(store);
        history.push("/storeDetail");
    }
    const showRatingStars = (numOfStars) => {
        let stars = "";
        for (let i = 0; i < numOfStars; i++) {
            stars += "★";
        }
        if (5 - numOfStars) {
            for (let i = 0; i < 5 - numOfStars; i++) {
                stars += "☆";}}
        return stars;
    };

    return (
        <>
            <h2 className="mt-4" style={{"text-align" : "center"}}>
               태그로 검색하기<br/>
            </h2>
            <br/>
            <div style={{textAlign: 'center'}}>
                <h3>&#128184; 소비자별 인기 업종 &#128184;</h3>

                <CardDeck>
                    <Card style={{width: '18rem'}}>
                        <Card.Header as="h5">전체 업종 TOP 5</Card.Header>
                        {totalIndustry.map((industry, i) => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                                </ListGroup>
                            )
                        )}
                    </Card>
                    <Card>
                        <Card.Header as="h5" >
                            나(<span style={{"color" : "#7C05F2"}}>{userAgeGroup}대</span>X
                            <span style={{"color" : "#7C05F2"}}>{userGenderKor}</span>)의 업종 TOP
                            5</Card.Header>
                        {userIndustry.map((industry, i) => (
                            <ListGroup variant="flush">
                                <ListGroup.Item key={i}>{totalIndustry[i].industryName !== userIndustry[i].industryName ?
                                    <span style={{"color" : "#3B6FD9"}}>{i + 1}. {industry.industryName}</span>
                                    : <span>{i + 1}. {industry.industryName}</span>}


                                </ListGroup.Item>
                            </ListGroup>)
                        )}
                    </Card>
                    {<Card>
                        <Card.Header as="h5">
                           <span style={{"color" : "#7C05F2"}}>{ageKor}</span>X
                            <span style={{"color" : "#7C05F2"}}>{genderKor}</span>의 업종 TOP 5</Card.Header>
                        {searchIndustry.map((industry, i) => (
                            <ListGroup variant="flush">
                                <ListGroup.Item
                                    key={i}>
                                    {totalIndustry[i].industryName !== searchIndustry[i].industryName ?
                                        <span style={{"color" : "#3B6FD9"}}>{i + 1}. {industry.industryName}</span>
                                        : <span>{i + 1}. {industry.industryName}</span>}
                                    </ListGroup.Item>
                            </ListGroup>)
                        )}
                    </Card>}

                </CardDeck>
                <h5 style={{textAlign: 'right'}}>출처 : 경기지역화폐 일반발행카드의 주간 결제금액 정보(2019.09.23~2019.09.29)<br/>
                <a href={"https://www.bigdata-region.kr/#/dataset/9b6a1038-b8a9-404e-9008-4cc1aa5a16b2"}>-경기지역경제포털</a></h5>

            </div>
            <br/><br/><br/>
            <h3 style={{textAlign: "center"}}>&#128270; 태그 검색 &#128270;</h3><br/>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2} >
                        <h4 style={{textAlign:'center'}}>성별</h4>
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
                    <Form.Label column sm={2} >
                        <h4 style={{textAlign:'center'}}>연령대</h4>
                    </Form.Label>
                    <Col sm={10}>
                        <ButtonGroup toggle>
                            {radiosAgeGroup.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    variant="outline-dark"
                                    name="AgesGroup"
                                    value={radio.value}
                                    onChange={handleAge}
                                    checked={ageGroup === radio.value}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2} >
                        <h4 style={{textAlign:'center'}}>정렬 조건</h4>
                    </Form.Label>
                    <Col sm={10}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={renderTooltip}
                        >
                        <ButtonGroup toggle>
                            {radiosOption.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    variant="outline-dark"
                                    name="optionGroup"
                                    value={radio.value}
                                    onChange={handleOption}
                                    checked={option === radio.value}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        </OverlayTrigger>,

                    </Col>
                    <br/> <br/>
                </Form.Group>
                <div style={{textAlign: "center"}}>
                    <Button variant="primary" type="submit" onClick={submitSearch}>맞춤 가맹점 검색</Button>{' '}</div>
            </Form>


            <br/><br/><br/><br/>
            {resultStores.map((list, i) => (
                <div>
                    <h2 key={i}>{`#${industryName[i]}업`}</h2>
                    <div className="scrollContainer">
                        {list.map((store, j) => (
                            <Card className="cardItem" key={j}>
                                <Card.Img id="card-image" variant="top"
                                          src={store.imgUrl}/>
                                <Card.Body>
                                    <Card.Title id="card-title" onClick={() => {
                                        clickStore(store)
                                    }}>{store.storeName}</Card.Title>
                                    <Card.Text>
                                        {(store.starRanking) ?
                                            <span>{showRatingStars(parseInt(store.starRanking))} {parseFloat(store.starRanking).toFixed(1)}</span> :
                                            <span></span>}<br/>
                                        {store.address}

                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer id="card-footer">
                                    <small className="text-muted">{store.mainCode}/{store.storeType}</small>
                                </Card.Footer>
                            </Card>
                        ))}

                    </div>
                    <br/><br/><br/>
                </div>
            ))}

        </>
    )
}

export default FindByTag;