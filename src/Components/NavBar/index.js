import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
  
const NavBar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/threebody" activeStyle>
            ThreeBody
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default NavBar;