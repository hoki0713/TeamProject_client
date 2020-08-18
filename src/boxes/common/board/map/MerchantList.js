import React, {useContext, useEffect, useState} from 'react';
import {Table, Pagination} from 'react-bootstrap';
import axios from 'axios'
import {Stars} from "./FindByMap";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {StoreSearchContext} from "../../../../items/context/StoreSearchContext";
import {Link} from "react-router-dom";


const MerchantList=()=> {

    const [state,setState]=useState('시/군');
    const [cate,setCate]=useState('업종');
    const [storeList, setStoreList]=useState([]);
    const [drop1Show, setDrop1Show] = useState(false);
    const [drop2Show, setDrop2Show] = useState(false);
    const {setStore} = useContext(StoreSearchContext);
    const [pageNow,setPageNow]=useState(1);
    const [stateList]=useState(
        ['연천군', '포천시', '파주시', '동두천시', '양주시', '의정부시', '가평군', '고양시',
            '김포시', '남양주시', '구리시', '하남시', '양평군', '광주시', '여주시', '이천시', '용인시', '안성시',
            '평택시', '화성시', '수원시', '오산시', '안산시', '군포시', '의왕시', '안양시', '과천시', '부천시',
            '광명시', '성남시', '시흥시' ]);
    const [cateList]=useState(
        ['숙박업', '여행', '레져용품','가구','건강식품','건축자재','광학제품', '기타','기타의료기관', '농업',
            '레저업소', '문화.취미','병원', '보건위생', '사무통신','서적문구','수리서비스','숙박업','신변잡화','약국','용역 서비스',
            '유통업 영리','음료식품' ]);
    const toggle1 = () => setDrop1Show(prevState => !prevState);
    const toggle2 = () => setDrop2Show(prevState => !prevState);

    const stateCheck=(stateName)=>{
        setState(stateName);
        getSpecificS();
    };

    const cateCheck=(category)=>{
        setCate(category);
        getSpecificS();
    };

    function getSpecificS(){
        axios.get(`http://localhost:8080/stores/getSome/${state}/${cate}/${pageNow}`)
            .then(({data})=>{
                setStoreList(data.list)
            })
            .catch(err=>{console.log(err);throw err;})
    }

    return (
        <div className="container">
            <Table striped bordered hover className="list_table">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th/>
                    <th>
                        <Dropdown isOpen={drop1Show} toggle={toggle1}>
                            <DropdownToggle>
                                {state} <select/>
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
                                {stateList.map((state)=>(
                                    <DropdownItem onClick={()=>{stateCheck(state)}}>{state}</DropdownItem>))}

                            </DropdownMenu>
                        </Dropdown>
                    </th>
                    <th>
                            <Dropdown isOpen={drop2Show} toggle={toggle2}>
                                <DropdownToggle>
                                    {cate} <select/>
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
                                    {cateList.map((category)=>(<DropdownItem onClick={()=>cateCheck(category)}>{category}</DropdownItem>))}
                                </DropdownMenu>
                            </Dropdown>
                        </th>
                    <th/>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>#</td>
                    <td>등록번호</td>
                    <td>가게명</td>
                    <td>가게주소</td>
                    <td>업종</td>
                    <td>별점</td>
                </tr>


                {storeList.map((store,i)=>(
                    <tr>
                    <td></td>
                {/* 페이지네이션 번호 가져와야 함 */}
                    <td>{store.id}</td>
                    <td><Link to={'/storeDetail'} onClick={setStore(store)}>{store.storeName}</Link> </td>
                    <td>{store.address}</td>
                    <td>{store.storeType}</td>
                    <td><Stars storeInfo={store}/></td>
                    </tr>
                )
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