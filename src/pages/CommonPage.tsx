import React, { useState, useEffect } from 'react';
import { CommonHeader, CommonMenuBar, CommonContainer } from '../boxes';

const CommonPage = () => {
    const [isLogined, setIsLogined] = useState(false);
    const [accountDetail] = useState(sessionStorage.getItem("accountDetail"));

    useEffect(() => {
        if (accountDetail) {
            setIsLogined(true);
        } else {
            setIsLogined(false);
        }
    }, [accountDetail]);

    return (
        <div className="container">
            <CommonHeader loginedAccount={isLogined} />
            <CommonMenuBar isLogined={isLogined} />
            <CommonContainer />
        </div>
    );
}

export default CommonPage;