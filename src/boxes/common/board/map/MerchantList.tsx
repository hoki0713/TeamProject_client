import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link} from "react-router-dom"
import axios from 'axios'
import {useSelector, useDispatch} from "react-redux";
import {StoreReport} from "./Modals";
import './search.jpg'

const GET_STORE_REQUEST = 'GET_STORE_REQUEST';


export const storeListAction=data=>({type: GET_STORE_REQUEST, payload:data});
export const storeListReducer = (state=[], action)=>{
    switch (action.type) {
        case GET_STORE_REQUEST :return action.payload;
        default: return state;

    }
}
export const storeListThunk = searchWord => dispatch => {
    console.log("storeListThunk")
    axios.get(`http://localhost:8080/stores/${searchWord}`)
        .then(res=>{dispatch(storeListAction(res.data))})
        .catch(err=>{throw(err)})
}


const MerchantList=()=> {

    const [modalShow, setModalShow] = useState(false);
    const [state,setState]=useState('');
    const [dong,setDong]=useState('');
    const [cate,setCate]=useState('');
    const [detail, setDetail] =useState('')
    const [searchWD, setSearchWD]=useState('')
    const stateCheck=e=>{setState(e.target.value);};
    const dongCheck=e=>{setDong(e.target.value); };
    const cateCheck=e=>{setCate(e.target.value); };
    const dispatch = useDispatch()

    const storeList =useSelector((x:any)=> x.storeListReducer)
    // useEffect(()=>{
    //     (!storeList.data) ? dispatch(storeListThunk(searchWD)): console.log(searchWD)
    // })



    const Img = ()=>{
        return(<Link
            to="/storeDetail">
            <img src="https://en.pimg.jp/046/639/461/1/46639461.jpg" width={30} height={30}/>
        </Link>)}
  return (
    <div className="container">
        <StoreReport show={modalShow} onHide={() => setModalShow(false)}/>
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
                <th>신고하</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td><Img/></td>
                <td><img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={30} height={30}
                         onClick={()=>{setModalShow(true)}}/></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Thornton</td>
                <td><Img/></td>
                <td>신고아이콘</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td><Img/></td>
                <td>신고아이콘</td>
            </tr>

            </tbody>
        </Table>

    </div>
  );
}

export default MerchantList;