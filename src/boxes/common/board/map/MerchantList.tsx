import React,{useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link} from "react-router-dom";


const GET_STORE_REQUEST = 'GET_STORE_REQUEST';


export const storeRequestAction=data=>({type: GET_STORE_REQUEST, payload:data});
export const storeReducer = (state={}, action)=>{
    switch (action.type) {
        case GET_STORE_REQUEST :return action.payload;
        default: return state;

    }
}

const MerchantList=()=> {
    const [state,setState]=useState('');
    const [dong,setDong]=useState('');
    const [cate,setCate]=useState('');
    const [detail, setDetail] =useState('')
    const stateCheck=e=>{setState(e.target.value); };
    const dongCheck=e=>{setDong(e.target.value); };
    const cateCheck=e=>{setCate(e.target.value); };

    const Img = ()=>{
        return(<Link
            to="/storeDetail">
            <img src="https://icon-icons.com/icons2/1744/PNG/32/3643762-find-glass-magnifying-search-zoom_113420.png"/>
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
                <th>지도에서 보기</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td><Img/></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Thornton</td>
                <td><Img/></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td><Img/></td>
            </tr>

            </tbody>
        </Table>

    </div>
  );
}

export default MerchantList;