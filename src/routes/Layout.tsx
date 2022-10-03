import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Layout.scss';

function Layout() {
  return (
    <div className="Layout">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
