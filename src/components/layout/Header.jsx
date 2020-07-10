import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import BallersLogo from 'assets/img/logo/ballers-logo.png';
import { Link } from '@reach/router';

const MENUS = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about-us' },
  { name: 'A-Z of Ball', to: '/a-z-of-ball' },
  { name: 'FAQs', to: '/faqs' },
  { name: 'Contact Us', to: '/contact-us' },
];

const Header = () => (
  <>
    <Navbar fixed="top" bg="white" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand href="#home">
          <img
            className="ballers-logo mr-5"
            src={BallersLogo}
            alt="Ballers logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="ballers-nav" />
        <Navbar.Collapse id="ballers-nav">
          <Nav className="mr-auto">
            {MENUS.map(({ name, to }) => (
              <Nav.Link getProps={isActive} as={Link} to={to}>
                {name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Nav.Link href="#home">Sign In</Nav.Link>
            <Nav.Link href="#home" className="btn btn-secondary">
              Register for Free
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  </>
);

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active font-weight-bold nav-link' } : null;
};

export default Header;
