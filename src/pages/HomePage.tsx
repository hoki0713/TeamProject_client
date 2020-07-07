import * as React from 'react';
import { MainNav, MainMap } from '../boxes';
import { Logo, SearchBar } from '../items';


function HomePage() {
  return (
    <div className="container">
      <div className="row">
        <MainNav />
      </div>
      <div className="row">
        <Logo />
      </div>
      <div className="row">
        <SearchBar />
      </div>
      <div className="row">
        <MainMap />
      </div>
    </div>
  );
}

export default HomePage;