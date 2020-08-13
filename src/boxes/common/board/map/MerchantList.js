import React, {useEffect, useState} from 'react';
import {Table, Pagination} from 'react-bootstrap';
import {Link} from "react-router-dom"
import axios from 'axios'
import { useDispatch} from "react-redux";
import './search.jpg'


const MerchantList=()=> {

    const [modalShow, setModalShow] = useState(false);
    const [state,setState]=useState('');
    const [dong,setDong]=useState('');
    const [cate,setCate]=useState('');
    const [storeList, setStoreList]=useState([])
    const stateCheck=e=>{setState(e.target.value);};
    const dongCheck=e=>{setDong(e.target.value); };
    const cateCheck=e=>{setCate(e.target.value); };
    const dispatch = useDispatch()


    useEffect(()=>{
        console.log("in useEffect")
        if(!storeList[0]) {
            axios.get(`http://localhost:8080/stores/mapClick/의정부`)
                .then(({data})=>{
                    setStoreList(data.list);
                })
                .catch(err=>{throw(err)});
        }})



    const Img = ()=>{
        return(<Link
            to="/storeDetail">
            <img src="https://en.pimg.jp/046/639/461/1/46639461.jpg" width={30} height={30}/>
        </Link>)}
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
                <th></th>
                <th></th>
                <th></th>

            </tr>
            </thead>

            <tbody>
            <tr>
                <td></td>
                <td>가게명</td>
                <td>가게주소</td>
                <td>업종</td>
                <td>전화번호</td>
                <td>지도에서 보기</td>
                <td>신고하기</td>
            </tr>
            {storeList.map((store,i)=>(
                <tr>
                    <td>{i+1}</td>
                    <td>{store.storeName}</td>
                    <td>{store.address}</td>
                    <td>{store.storeType}</td>
                    <td>{store.storePhone}</td>
                    <td>지도</td>
                    <td><img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={30} height={30}
                             onClick={()=>{setModalShow(true)}}/></td>
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