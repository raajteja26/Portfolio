import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

function navbar() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand style={{fontWeight:"600px"}} href="/">Raajteja.</Navbar.Brand>
          <Navbar.Brand style={{fontWeight:"600px"}} href="/projects">Projects</Navbar.Brand>
        </Container>
      </Navbar>
    </>
    // <div>
    // <nav className="navbar sticky-top navbar-light bg-light">
    //     <a style={{fontWeight:"bold"}} href="#"><Link to="/">Raajteja.</Link></a>
    //     <a><Link to="/projects">Projects</Link></a>
    //  </nav>
    // </div>
  )
}

export default navbar;