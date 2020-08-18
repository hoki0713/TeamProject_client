import React,{useState} from 'react';
import { Route } from 'react-router-dom';
import {
  LocalCurrencyAmount,
  StoreTotalStatistic,
  UserTotalStatistic,
  Notice,
  UsersList,
  NotifyStore,
   Enquiry,
  NoticeWrite, NoticeDetail, EnquiryDetail, StoreDetail, NoticeModifyWrite
} from './admin_board';
import UserList from './admin_board/adminTest/UserList.js'
import UserDetail from './admin_board/adminTest/UserDetail';
import { UserDetailProvider } from './admin_board/adminTest/context/UserDetailContext';

const AdminContainer = ({match}) => {
  
  return (
    <div className="container">
      <Route path="/admin/currency-amount">
        <LocalCurrencyAmount />
      </Route>
      <Route path="/admin/store-statistic">
        <StoreTotalStatistic />
      </Route>
      <Route path="/admin/user-statistic">
        <UserTotalStatistic />
      </Route>
      <Route path={`/admin/notice-detail/:postId`}
      render={(props) => <NoticeDetail {...props}/>}
      >
      </Route>
      <Route path="/admin/notice-write">
        <NoticeWrite />
      </Route>
      <Route path={`/admin/notice`}>
      <Notice />
      </Route>
      <Route path={`/admin/notice-modify/:postId`}
       render={(props) => <NoticeModifyWrite {...props}/>}
     >
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
      <Route path={`/admin/store-detail/:id`}
      render={(props) => <StoreDetail {...props}/>}>
      </Route>
      <UserDetailProvider>
        <Route path="/admin/users-list">
          <UserList />
        </Route>
        <Route path="/admin/user-detail">
          <UserDetail />
        </Route>
      </UserDetailProvider>
    </div>
  );
};

export default AdminContainer;