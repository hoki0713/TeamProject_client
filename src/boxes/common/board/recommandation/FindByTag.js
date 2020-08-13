import React, {useEffect, useState} from 'react';
import {CardDeck, Card, Button, Form, Row, Col, ListGroup} from 'react-bootstrap'
import axios from 'axios'

function FindByTag() {

    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || `{}`));
    const [id, setId] = useState("");
    const [userGender, setUserGender] = useState("")
    const [userBirthYear, setUserBirthYear] = useState(0);
    const [ageGroup, setAgeGroup] = useState(0);
    const [gender, setGender] = useState("null")
    const [userIndustry, setUserIndustry] = useState([])
    const [genderIndustry, setGenderIndustry] = useState([])
    const [ageIndustry, setAgeIndustry] = useState([])
    const [totalIndustry, setTotalIndustry] = useState([])
    const [searchIndustry, setSearchIndustry] = useState([])
    const [checked, setChecked] = useState(false)


    const calAgeGroup = () => {
        const thisYear = new Date().getFullYear()
        const userBirthYear = accountDetail.birthDate.split("-")[0]
        const ageGroup = Math.floor((thisYear - userBirthYear + 1) / 10) * 10
        return ageGroup;
    }


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
                    console.log("유즈이펙트 성공")
                })
                .catch(error => {
                    throw(error)
                })
        }
    }, [id])

    const handleIndustry=()=>{
        if(gender !=="null" || ageGroup !==0){
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

    const handleGender=(e)=>{
        setGender(e.target.value);
        setChecked(e.currentTarget.checked)
        console.log("gender시작"+gender)
        handleIndustry()
    }
    const handleAge=(e)=>{
        setAgeGroup(e.target.value);
        setChecked(e.currentTarget.checked)
        console.log("age시작"+ageGroup)
        handleIndustry()
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
                        <Card.Header>나의 관심업종 TOP 5</Card.Header>
                        {userIndustry.map((industry, i) => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                                </ListGroup>)
                        )}
                    </Card>



                    <Card>
                        <Card.Header>{userBirthYear}의 관심업종 TOP 5</Card.Header>
                        {genderIndustry.map((industry, i) => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                                </ListGroup>)
                        )}
                    </Card>
                    <Card>
                        <Card.Header>{userGender}의 관심업종 TOP 5</Card.Header>
                        {ageIndustry.map((industry, i) => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={i}>{i + 1}. {industry.industryName}</ListGroup.Item>
                                </ListGroup>)
                        )}
                    </Card>
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
                        <Button variant="outline-dark" type="button" onClick={handleGender} value="M" >남성</Button>{' '}
                        <Button variant="outline-dark" type="button" onClick={handleGender} value={"F"}>여성</Button>{' '}
                        <Button variant="outline-dark" type="button" onClick={handleGender} value={"None"}>성별무관</Button>
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
                        <Button variant="outline-dark" type="button" value={100} onClick={handleAge}>연령무관</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        관심 업종
                    </Form.Label>
                    <Col sm={10}>
                        {searchIndustry.map((industry, i)=>
                        (<Button variant="outline-dark" type="button" key={i}>{industry.industryName}{' '}</Button>)
                        )
                        }
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
                    <Button variant="primary" type="submit">맞춤 가맹점 검색</Button>{' '}</div>
            </Form>

        </>
    );
}

export default FindByTag;