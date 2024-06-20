// PublicNavbar.tsx
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const PublicNavbar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Navbar.Brand as={Link} to="/">
        Primaa Blog
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/signup">
            Signup
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
