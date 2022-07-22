import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
  
const NavBar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activestyle="true">
            Home
          </NavLink>
          <NavLink to="/threebody" activestyle="true">
            ThreeBody
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default NavBar;