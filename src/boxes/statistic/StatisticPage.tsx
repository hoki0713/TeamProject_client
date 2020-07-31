import React from 'react';
import { AdminHeader, AdminMenuBar } from '../../boxes/admin';
import StatisticContainer from './StatisticContainer';

const StatisticPage = () => {
  return (
    <div>
      <AdminHeader />
      <AdminMenuBar />
      <StatisticContainer />
    </div>
  );
};

export default StatisticPage;