import React, { useState, useEffect } from 'react';
import { MainNav, MainMap, MainSearchBar, MainLogo } from '../boxes';
import MyChatBot from "../boxes/common/board/chatbot/chatbot";

const HomePage = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'));

  const refreshUser = (id) => {
    if (id) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }

  useEffect(() => {
    refreshUser(accountDetail.id);
  },[accountDetail]);

  return (
    <div className="container">
      <div className="row">
        <MainNav 
          clickLogout={refreshUser}
          loginedAccount={isLogined} 
        />
      </div>
      <div className="row">
        <MainLogo />
      </div>
      <div className="row">
        <MainSearchBar />
      </div>
      <div className="row">
        <MainMap />
      </div>
        <div>
            <MyChatBot isLogined={isLogined}/>
        </div>
    </div>
  );
}

export default HomePage;