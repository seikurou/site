import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,

} from 'reactstrap';

const SiteNavbar = () => {
  return (
    <div>
      <Navbar color="light" light expand="xs">
        <Link className="navbar-brand" to={'/'}>
          efang.me
        </Link>
        {/* <NavbarToggler onClick={toggle} /> */}
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to='/aboutself' className="nav-link">
              About
            </Link>
          </NavItem>
          <NavItem>
            <Link to='/projects' className="nav-link">
              Projects
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default SiteNavbar;