import React from 'react';
import { Route } from 'react-router-dom';
import { AdminTest } from './admin_board';

const AdminContainer = () => {
  return (
    <div className="container">
      <Route path="/admin/test">
        <AdminTest />
      </Route>
    </div>
  );
};

export default AdminContainer;