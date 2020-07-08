import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import BallersLogo from 'assets/img/logo/ballers-logo.png';

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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="active font-weight-bold" href="#home">
              Home
            </Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
            <Nav.Link href="#link">A-Z of BALL</Nav.Link>
            <Nav.Link href="#link">FAQs</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
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

export default Header;
