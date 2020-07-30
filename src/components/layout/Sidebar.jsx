import React from 'react';
import PropTypes from 'prop-types';
import BallersLogo from 'assets/img/logo/ballers-logo.png';
import userSideMenu from 'content/menu/userMenu';
import classNames from 'classnames';
import { USER_TYPES } from 'utils/constants';
// import { UserContext } from 'context/UserContext';
// import { getUserTypeFromStore } from 'utils/localStorage';
import { Link } from '@reach/router';

const SIDE_MENU = {
  [USER_TYPES.user]: userSideMenu,
};

const Sidebar = ({ showSidebar, closeSidebar, ...props }) => {
  // const { userState } = React.useContext(UserContext);
  // const currentUserType = userState.type || getUserTypeFromStore();
  const currentUserType = 1;

  const sideMenu = SIDE_MENU[currentUserType];

  return (
    <>
      <div
        className={classNames('backdrop', {
          showSidebar,
        })}
        onClick={closeSidebar}
      />
      <aside
        className={classNames('sidebar', {
          showSidebar,
        })}
      >
        <div className="sidebar__logo">
          {/* For some reasons, using Link to homepage causes the page to freeze */}
          <a href="/">
            <img alt="Ballers Logo" src={BallersLogo} />
          </a>
          <div className="sidebar__close" onClick={closeSidebar}>
            <button
              aria-label="Close"
              className="close d-block d-sm-none"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <Sidebar.Navigation closeSidebar={closeSidebar} menus={sideMenu} />

        <div className="clearfix" />
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
};

Sidebar.Navigation = ({ menus, closeSidebar }) => {
  const sideMenu = menus && (
    <ul className="sidebar-menu">
      {menus.map(({ title, to, icon }) => (
        <li key={title}>
          <Link
            getProps={isActive}
            onClick={closeSidebar}
            to={to}
            className="sidebar-menu__item"
          >
            <span className="sidebar__icon">{icon}</span> &nbsp;
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
  return <div>{sideMenu}</div>;
};

Sidebar.Navigation.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
};

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: 'sidebar-menu__item active' }
    : 'sidebar-menu__item';
};

export default Sidebar;
