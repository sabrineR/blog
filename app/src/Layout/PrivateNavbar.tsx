// PrivateNavbar.tsx
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import { FiLogOut } from "react-icons/fi";

const PrivateNavbar: React.FC = () => {
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Navbar.Brand as={Link} to="/">
        Primaa Blog
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
          <Button variant="outline-primary" onClick={handleLogout}>
            <FiLogOut style={{ color: "blue" }} /> Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PrivateNavbar;
