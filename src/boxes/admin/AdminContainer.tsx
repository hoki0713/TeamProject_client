import React from 'react';
import { Route } from 'react-router-dom';
import { LocalCurrencyAmount,LocalofUsers,RecommendofStore,Notice,UsersList,NotifyStore,Enquiry } from './admin_board';

const AdminContainer = () => {
  return (
    <div className="container">
      <Route path="/admin/currency-amount">
        <LocalCurrencyAmount />
      </Route>
      <Route path="/admin/local-user">
      <LocalofUsers />
      </Route>
      <Route path="/admin/recommend-store">
      <RecommendofStore/>
      </Route>
      <Route path="/admin/notice">
        <Notice />
      </Route>
      <Route path="/admin/users-list">
        <UsersList />
      </Route>
      <Route path="/admin/notify-sotre">
        <NotifyStore />
      </Route>
      <Route path="/admin/enquiry">
        <Enquiry />
      </Route>
    </div>
  );
};

export default AdminContainer;