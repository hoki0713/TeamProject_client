import React, { useState, useEffect, useContext } from "react";

import { UserDetailContext } from "../../../context/UserDetailContext"; 
import axios from 'axios';

const UserDetail = () => {
  const { user } = useContext(UserDetailContext);
  const [newUser, setNewUser] = useState({});

  const [voucherCodeArr, setVoucherCodeArr] = useState([]);
  const [voucherInfoArr, setVoucherInfoArr] = useState([]);

  useEffect(() => {
    if(user) {
      setNewUser(user);
      axios
        .get(`http://localhost:8080/sales/purchase-history/${user.id}`)
        .then((response) => {
          const keyArr = [];
          const valueArr = [];
          Object.entries(response.data).forEach(([key, value]) => {
            keyArr.push(key);
            valueArr.push(value);
          });
          setVoucherCodeArr(keyArr);
          setVoucherInfoArr(valueArr);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [user])

  return (
    <div>
      <form>
        <div className="form-group">
          <p>아이디</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              readOnly
              value={newUser.userId}
            />
          </div>
          <p>이름</p>
          <input type="text" className="form-control" readOnly value={newUser.name} />
          <p>생년월일</p>
          <input
            type="date"
            className="form-control"
            readOnly
            value={newUser.birthDate}
          />
          <p>성별</p>
          <input type="text" className="form-control" readOnly value={newUser.gender} />
          <p>거주지 주소</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              readOnly
              value={newUser.defaultAddr}
            />
          </div>

          {newUser.optionalAddress && (
            <>
              <p>추가 주소</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={newUser.optionalAddress}
                />
              </div>
            </>
          )}

          <p>이메일</p>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              readOnly
              value={newUser.email}
            />
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">일련번호</th>
            <th scope="col">지역화폐명</th>
            <th scope="col">금액</th>
            <th scope="col">상태</th>
          </tr>
        </thead>
        <tbody>
          {voucherInfoArr.map((info, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{voucherCodeArr[i]}</td>
              <td>{info.localCurrencyVoucherName}</td>
              <td>{info.unitPrice}</td>
              <td>{info.currencyState}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail;
