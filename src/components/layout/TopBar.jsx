import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from '@reach/router';
import { NotificationIcon, ThreeDotsIcon } from 'components/utils/Icons';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { UserContext } from 'context/UserContext';
import Image from 'components/utils/Image';
import { useCurrentRole } from 'hooks/useUser';
import TimeAgo from 'timeago-react';
import { NOTIFICATION_TYPE } from 'utils/constants';

const Empty = React.forwardRef(({ children, onClick }, ref) => (
  <div className="top-nav-dropdown" onClick={onClick}>
    {children}
  </div>
));

const Header = () => {
  let { userState } = React.useContext(UserContext);
  const userName = `${userState.firstName} ${userState.lastName}`;
  const isCompanyLogo =
    !userState.profileImage && userState.vendor && userState.vendor.companyLogo;
  const currentRole = useCurrentRole().name;
  return (
    <>
      <Navbar
        fixed="top"
        className="dashboard-top-nav d-flex align-items-center"
        bg="transparent"
        expand="lg"
      >
        <div className="container-fluid">
          <Nav className="ml-auto d-flex flex-row align-items-center">
            {userState?.notifications?.length === 0 ? (
              <Nav.Link to={`/${currentRole}/notifications`} as={Link}>
                <NotificationIcon />
              </Nav.Link>
            ) : (
              <NotificationsDropdown
                notifications={userState?.notifications}
                currentRole={currentRole}
              />
            )}

            <Dropdown>
              <Dropdown.Toggle as={Empty} id="user-dropdown">
                <Image
                  name={userName}
                  className={
                    isCompanyLogo
                      ? 'dashboard-top-nav__company-logo'
                      : 'dashboard-top-nav__avatar'
                  }
                  defaultImage={ProfileAvatar}
                  rounded
                  src={
                    isCompanyLogo
                      ? userState.vendor.companyLogo
                      : userState.profileImage
                  }
                  options={{ h: 200 }}
                />{' '}
                <ThreeDotsIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-children">
                <Dropdown.Item as={Link} to="/user/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/logout">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* <Nav.Link as={Link} to="/register"></Nav.Link> */}
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active font-weight-bold nav-link' } : null;
};

export const NotificationsDropdown = ({ notifications, currentRole }) => (
  <Dropdown className="notifications">
    <Dropdown.Toggle as={Empty} id="notifications-dropdown">
      <div className="notifications__icon">
        <NotificationIcon />
      </div>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Header>
        <span>Notifications</span>
        <Link to={`/${currentRole}/notifications`}>View All</Link>
      </Dropdown.Header>
      {notifications?.map(({ createdAt, description, type, url }, index) => (
        <Dropdown.Item as={Link} to={url} key={index}>
          <div className="notification-item dropdown-inner">
            <div className="notification-icon">
              <span
                className={`icon-circle icon-circle__${NOTIFICATION_TYPE[type]}`}
              ></span>
            </div>
            <div className="notification-content">
              <div className="notification-text">{description}</div>
              <div className="notification-time">
                <TimeAgo datetime={createdAt} />
              </div>
            </div>
          </div>
        </Dropdown.Item>
      ))}
      <Dropdown.Item
        as={Link}
        to={`/${currentRole}/notifications`}
        eventKey="20"
      >
        <div className="notification-text py-2">View All Notifications</div>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default Header;
