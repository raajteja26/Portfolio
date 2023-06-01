import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginPage from './login';

function navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  };
  return (
    <>
      <Navbar bg="light">
        <Container fluid>
        <Row>
        <Col><Navbar.Brand style={{fontWeight:"600px"}} href="/">Raajteja.</Navbar.Brand></Col>
        <Col ><Navbar.Brand style={{fontWeight:"600px"}} href="/projects">Projects</Navbar.Brand></Col>
        {localStorage.getItem("token") ? <Col ><Navbar.Brand style={{fontWeight:"600px"}} href="/admin">Admin</Navbar.Brand></Col> : ""}
        </Row>
        <Navbar.Brand style={{fontWeight:"600px"}}>{localStorage.getItem('token') ? <h6 style={{cursor:"pointer"}} onClick={handleLogout}>Logout</h6> : <LoginPage placement='end' name='Login'/>}</Navbar.Brand>
        
        </Container>
      </Navbar>
    </>
  )
}

export default navbar;