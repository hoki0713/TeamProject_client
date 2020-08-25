import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios'
import {useHistory} from "react-router";
import {LoginedCheckContext} from "../../../../../items/context/LoginedCheckContext";
const PolicyInfo = (props) => {
    const [children,setChildren]=useState('');
    const [userAge,setUserAge]=useState(0);
    const [policyList,setPolicyList]=useState([]);
    const {loginedCheck} = useContext(LoginedCheckContext);
    const history=useHistory()
    useEffect(()=>{
        if(loginedCheck) {
            let date = new Date;
            setChildren(props.steps.policyOp.value);
            setUserAge(date.getFullYear() - parseInt(JSON.parse(sessionStorage.getItem("accountDetail")).birthDate.substring(0, 4)));
        } },[loginedCheck]);
    useEffect(()=>{
        if(userAge!=0 && children!==''&&loginedCheck){
            axios.get(`http://localhost:8080/policy/chatbotPolicy/${userAge}/${children}`)
                .then(({data})=>{
                        setPolicyList(data);
                })
                .catch(err=>{throw err});
        }

    },[userAge,loginedCheck]);
    return (
        <>{(loginedCheck)?<div>
            {(policyList[0])?
                policyList.map((policy,i)=>(
                    <div key={i}>
                    {policy.policyName}
                    <p>{policy.policyDesc}</p><br/>
                        <button onClick={e=>{e.preventDefault();window.open(policy.policyUrl,'')}}>자세히 보기</button>
                    <br/><br/><br/>
                        </div>)):
                <>현재 회원님과 맞는 정책이 없습니다.</>
            }
        </div>:<><p>로그인해주세요</p>
           <p><button onClick={()=>history.push('/account/login')}>로그인하기</button></p></>}</>
    );
};

export default PolicyInfo;