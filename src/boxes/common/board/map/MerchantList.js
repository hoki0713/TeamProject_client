import React, {useEffect, useState} from 'react';
import {Table, Pagination} from 'react-bootstrap';
import axios from 'axios'
import {Stars} from "./FindByMap";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";


const MerchantList=()=> {

    const [state,setState]=useState('');
    const [dong,setDong]=useState('');
    const [cate,setCate]=useState('');
    const [storeList, setStoreList]=useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [stateList]=useState(
        ['연천', '포천', '파주', '동두천', '양주', '의정부', '가평', '고양',
            '김포', '남양주', '구리', '하남', '양평', '광주', '여주', '이천', '용인', '안성',
            '평택', '화성', '수원', '오산', '안산', '군포', '의왕', '안양', '과천', '부천',
            '광명', '성남', '시흥'])

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const stateCheck=e=>{
        setState(e.target.value);
        getSpecificS();};

    const dongCheck=e=>{
        setDong(e.target.value);
        getSpecificS()};

    const cateCheck=e=>{
        setCate(e.target.value);
        getSpecificS()};

    function getSpecificS(){
        axios.get(`http://localhost:8080/stores/getSome/${state}/${dong}/${cate}`)
            .then(({data})=>{
                setStoreList(data.list)
            })
            .catch(err=>{console.log(err);throw err;})
    }

    useEffect(()=>{
        console.log("in useEffect")
        if(!storeList[0]) {
            axios.get(`http://localhost:8080/stores/mapClick/의정부`)
                .then(({data})=>{
                    setStoreList(data.list);
                })
                .catch(err=>{throw(err)});
        }})

    return (
        <div className="container">
            <Table striped bordered hover className="list_table">
                <thead>
                <tr>
                    <th>#</th>
                    <th><select value={state} onChange={stateCheck}>
                        <option selected>시/군</option>
                        <option value="1">고양시</option>
                        <option value="2">김포시</option>
                        <option value="3">무슨시</option>
                        <option value="4">무슨시</option>

                    </select></th>
                    <th>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle>
                                ㅁㄴㅇㄹㅁㄴㅇㄹ <select/>
                            </DropdownToggle>
                            <DropdownMenu
                                modifiers={{
                                    setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                            return {
                                                ...data,
                                                styles: {
                                                    ...data.styles,
                                                    overflow: 'auto',
                                                    maxHeight: '100px',
                                                },
                                            };
                                        },
                                    },
                                }}
                            >
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </th>
                    <th><select value={dong} onChange={dongCheck}>
                        <option selected>동/읍/면</option>
                        <option value={'1'}>삼남면</option>
                        <option value={'2'}>교동읍</option>
                        <option value={'3'}>원당동</option>
                        <option value={'4'}>무슨면</option>

                    </select></th>
                    <th><select value={cate} onChange={cateCheck}>
                        <option selected>업종</option>
                        <option value={'1'}>분식</option>
                        <option value={'2'}>양식</option>
                        <option value={'3'}>철물점</option>
                        <option value={'4'}>수퍼</option>

                    </select></th>
                    <th/>
                    <th/>
                    <th/>

                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>#</td>
                    <td>가게명</td>
                    <td>가게주소</td>
                    <td>업종</td>
                    <td>별점</td>
                </tr>
                {storeList.map((store,i)=>(
                    <tr>
                        <td>{i+1}</td>
                        <td>{store.storeName}</td>
                        <td>{store.address}</td>
                        <td>{store.storeType}</td>
                        <td><Stars storeInfo={store}/></td>
                    </tr>)
                )}

                </tbody>
            </Table>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>

        </div>
    );
}

export default MerchantList;