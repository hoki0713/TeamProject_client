import React, { useState, useEffect } from 'react';
import { MainNav, MainMap, MainSearchBar, MainLogo } from '../boxes';

const HomePage = () => {
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
      <div className="row">
        <MainNav loginedAccount={isLogined} />
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
    </div>
  );
}

export default HomePage;