import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from '@reach/router';
import { NotificationIcon, ThreeDotsIcon } from 'components/utils/Icons';
import UserAvatar from 'assets/img/avatar/user.jpg';

const Empty = React.forwardRef(({ children, onClick }, ref) => (
  <div className="top-nav-dropdown" onClick={onClick}>
    {children}
  </div>
));

const Header = () => (
  <>
    <Navbar
      fixed="top"
      className="dashboard-top-nav d-flex align-items-center"
      bg="transparent"
      expand="lg"
    >
      <div className="container-fluid">
        <Nav className="ml-auto d-flex align-items-center">
          <Nav.Link to="/login" as={Link}>
            <NotificationIcon />
          </Nav.Link>
          <Dropdown>
            <Dropdown.Toggle as={Empty} id="dropdown-basic">
              <img
                src={UserAvatar}
                alt="user avatar"
                className="img-fluid dashboard-top-nav__avatar"
              />
              <ThreeDotsIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-children">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* <Nav.Link as={Link} to="/register"></Nav.Link> */}
        </Nav>
      </div>
    </Navbar>
  </>
);

export const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active font-weight-bold nav-link' } : null;
};

export default Header;
