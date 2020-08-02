import React from 'react';
import { MainNav, MainMap, MainSearchBar, MainLogo } from '../boxes';

const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
        <MainNav />
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