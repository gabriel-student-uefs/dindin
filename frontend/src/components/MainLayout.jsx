import React from 'react';
import Header from './Header';
import Pagination from './Pagination';

const MainLayout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header className="header" />
      <div className="main-content px-4 py-5">
        {children}
      </div>
      <Pagination className="pagination-container" />
    </div>
  );
};

export default MainLayout;