import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const SiteNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="xs">
        <Link className="navbar-brand" to={'./'}>
          efang.me
        </Link>
        {/* <NavbarToggler onClick={toggle} /> */}
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to={'./aboutself'} className="nav-link">
              About
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'./projects'} className="nav-link">
              Projects
            </Link>
          </NavItem>
          {/* <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
              </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
                </DropdownItem>
              <DropdownItem>
                Option 2
                </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
                </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
      </Navbar>
    </div>
  );
}

export default SiteNavbar;