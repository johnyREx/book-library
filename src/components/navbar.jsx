import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MyNavbar = () =>{

return (
<>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/book/list"> Add Books List</Nav.Link>
        <Nav.Link href="/book/order"> Orders</Nav.Link>
       
       
       
        {/* <NavLink to={'/book'} >  Not Working</NavLink> */}
      </Nav>
    </Container>
  </Navbar>

  </>
);

}


export default MyNavbar;