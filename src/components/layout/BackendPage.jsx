import React from 'react';
import Sidebar from 'components/layout/Sidebar';
import TopBar from 'components/layout/TopBar';
import { Link } from '@reach/router';
import {
  MyPropertyIcon,
  HomeIcon,
  LoveIcon,
  ReferIcon,
  MenuIcon,
} from 'components/utils/Icons';

const BackendPage = ({ children }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const closeSidebar = () => {
    document.body.classList.remove('modal-open');
    setShowSidebar(false);
  };

  return (
    <div>
      <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />

      {/* Content Page */}
      <div className="content-page">
        <TopBar />
        {children}
        <FixedFooter />
      </div>
    </div>
  );
};

const FixedFooter = () => (
  <footer className="footer-fixed">
    <ul className="list-group list-group-horizontal">
      <li className="list-group-item flex-fill">
        <Link to="/user/dashboard">
          <span className="footer-fixed__icon">
            <HomeIcon />
          </span>
          <p className="footer-fixed__menu-title">Home</p>
        </Link>
      </li>
      <li className="list-group-item flex-fill">
        <Link to="/user/portfolio">
          <span className="footer-fixed__icon">
            <MyPropertyIcon />
          </span>
          <p className="footer-fixed__menu-title">Portfolio</p>
        </Link>
      </li>
      <li className="list-group-item flex-fill">
        <Link to="/user/transactions">
          <span className="footer-fixed__icon">
            <LoveIcon />
          </span>
          <p className="footer-fixed__menu-title">Just For You</p>
        </Link>
      </li>
      <li className="list-group-item flex-fill">
        <Link to="/user/dashboard">
          <span className="footer-fixed__icon">
            <ReferIcon />
          </span>

          <p className="footer-fixed__menu-title">Refer to Earn</p>
        </Link>
      </li>
      <li className="list-group-item flex-fill">
        <Link to="/user/menu">
          <span className="footer-fixed__icon">
            <MenuIcon />
          </span>

          <p className="footer-fixed__menu-title">Menu</p>
        </Link>
      </li>
    </ul>
  </footer>
);

export default BackendPage;
