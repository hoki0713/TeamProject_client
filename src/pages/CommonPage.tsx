import React, { useState, useEffect } from 'react';
import { CommonHeader, CommonMenuBar, CommonContainer } from '../boxes';
import CommonFooter from "../boxes/common/CommonFooter";
import MyChatBot from "../boxes/common/board/chatbot/chatbot";

const CommonPage = () => {
    const [isLogined, setIsLogined] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'));

    const refreshUser = (id) => {
        if (id) {
            setIsLogined(true);
            if(accountDetail.adminKey) setIsAdmin(true);
        } else {
            setIsLogined(false);
        }
    }

    useEffect(() => {
        refreshUser(accountDetail.id)
    }, [accountDetail]);

    return (
        <div className="container">
            <CommonHeader 
                clickLogout={refreshUser}
                loginedAccount={isLogined} 
                isAdmin={isAdmin}
            />
            <CommonMenuBar isLogined={isLogined} />
            <CommonContainer isLogined={isLogined}/>
            <CommonFooter/>
            <MyChatBot isLogined={isLogined}/>
        </div>
    );
}

export default CommonPage;