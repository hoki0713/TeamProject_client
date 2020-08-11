import React from 'react';
import { Route } from 'react-router-dom';
import {
    LocalCurrencyAmount,
    StoreTotalStatistic,
    UserTotalStatistic,
    Notice,
    UsersList,
    NotifyStore,
    Enquiry,
    NoticeWrite, NoticeDetail, EnquiryDetail,StoreDetail,UserDetail,NoticeModifyWrite
} from './admin_board';

const AdminContainer = () => {
  return (
    <div className="container">
      <Route path="/admin/currency-amount">
        <LocalCurrencyAmount />
      </Route>
      <Route path="/admin/store-statistic">
      <StoreTotalStatistic />
      </Route>
      <Route path="/admin/user-statistic">
      <UserTotalStatistic/>
      </Route>
      <Route path="/admin/notice">
        <Notice />
      </Route>
      <Route path="/admin/notice-write">
        <NoticeWrite />
      </Route>
      <Route path="/admin/notice-detail">
         <NoticeDetail />
      </Route>
      <Route path="/admin/notice-modify">
        <NoticeModifyWrite />
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
      <Route path="/admin/enquiry-detail">
        <EnquiryDetail />
      </Route>
      <Route path="/admin/store-detail">
        <StoreDetail />
      </Route>
      <Route path="/admin/user-detail">
        <UserDetail />
      </Route>
    </div>
  );
};

export default AdminContainer;