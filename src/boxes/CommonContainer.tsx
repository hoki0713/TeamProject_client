import React from 'react';
import { Route } from 'react-router-dom';

import {MerchantList} from './board';



function CommonContainer() {
  return (
    <>
    <Route path="/merchant-list">
      <MerchantList />
    </Route>
    </>
  );
}

export default CommonContainer;