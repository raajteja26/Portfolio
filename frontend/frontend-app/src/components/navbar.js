import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginPage from './login';
import favicon from "./images/favicon.ico";

function navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  };
  return (
        <Navbar bg="light" style={{paddingTop:"0px",paddingBottom:"0px"}}>
        <Container fluid style={{marginTop:"-3px"}}>
        <Row>
        <Col ><Navbar.Brand style={{fontWeight:"600px"}} href="/"><img src={favicon} style={{width:"25%",height:"60%"}} alt="R"/><span style={{fontWeight:"500"}}>aajteja.</span></Navbar.Brand></Col>
        <Col ><Navbar.Brand href="/projects">Projects</Navbar.Brand></Col>
        {localStorage.getItem("token") ? <Col style={{marginTop:"5px"}}><Navbar.Brand style={{fontWeight:"600px"}} href="/admin">Admin</Navbar.Brand></Col> : ""}
        </Row>
        <Navbar.Brand style={{fontWeight:"600px"}}>{localStorage.getItem('token') ? <h6 style={{cursor:"pointer"}} onClick={handleLogout}>Logout</h6> : <LoginPage placement='end' name='Login'/>}</Navbar.Brand>
        
        </Container>
      </Navbar>
  )
}

export default navbar;