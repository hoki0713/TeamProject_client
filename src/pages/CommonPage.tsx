import React, { useState } from 'react';
import {CommonHeader, CommonMenuBar, CommonContainer} from '../boxes';
import { LoginedAccountChecker } from '../items';

function CommonPage() {
    const [isLogined, setIsLogined] = useState(false);
    const setLogin = e => {
        e.preventDefault();
        setIsLogined(!isLogined);
    }


    return (
        <div className="container">
            <LoginedAccountChecker loginedAccount={isLogined} onClick={setLogin}/>
            <CommonHeader />
            <CommonMenuBar isLogined={isLogined} setIsLogined={setIsLogined}/>
            <CommonContainer/>
        </div>
    );
}

export default CommonPage;