import React,{useState} from 'react';

function MerchantList() {
    const [state,setState]=useState('')
    const [dong,setDong]=useState('')
    const [cate,setCate]=useState('')
    const stateCheck=e=>{setState(e.target.value); }
    const dongCheck=e=>{setDong(e.target.value); }
    const cateCheck=e=>{setCate(e.target.value); }

  return (
    <>
        <table className="list_table">
            <tr className="list_tr1"><td>리스트로 찾아보기</td><td><select value={state} onChange={stateCheck}>
                <option selected>시/군</option>
                <option value="1">고양시</option>
                <option value="2">김포시</option>
                <option value="3">무슨시</option>
                <option value="4">무슨시</option>

            </select></td>
                <td><select value={dong} onChange={dongCheck}>
                    <option selected>동/읍/면</option>
                    <option value={'1'}>삼남면</option>
                    <option value={'2'}>교동읍</option>
                    <option value={'3'}>원당동</option>
                    <option value={'4'}>무슨면</option>

                </select></td>
                <td><select value={cate} onChange={cateCheck}>
                    <option selected>업종</option>
                    <option value={'1'}>분식</option>
                    <option value={'2'}>양식</option>
                    <option value={'3'}>철물점</option>
                    <option value={'4'}>수퍼</option>

                </select></td><td></td></tr>
            <tr className="list_tr2"><td>상호명</td><td>주소</td><td>업종</td><td>전화번호</td><td>지도확인</td></tr>
            <tr className="list_tr3"><td colSpan={5}></td></tr>
        </table>
    </>
  );
}

export default MerchantList;