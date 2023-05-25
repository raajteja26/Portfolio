import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

function LoginPage({ name, ...props }) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [redText, setRedText] = useState(false);
  const [colour, setColour] = useState("black");
  const [loginButton, setLoginButton] = useState('Login');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // try {
        // Make a POST request to the Django backend login API endpoint
        axios.post('token/', {
          username: username,
          password: password,
        }).then((response)=> {
          localStorage.setItem("token", response.data.access)
          window.location.reload()  
        }).catch((err) => {
           console.log(err)
        })
        console.log(localStorage.getItem("token"),"lllll")
    {localStorage.getItem("token") ? setLoginButton("Login") : setLoginButton("Try Again...")}
    {localStorage.getItem("token") ? setRedText(false) : setRedText(true)}
    {localStorage.getItem("token") ? setColour("black") : setColour("red")}
    setUsername('');
    setPassword('');
  };
  return (
    <>
      <h6 style={{cursor:"pointer"}} onClick={handleShow} className="me-2">
        {name}
      </h6>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Please Login...</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                <Form.Label style={{color:colour}}>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                </Form.Group>
                <Form.Group controlId="formPassword">
                <Form.Label style={{color:colour}}>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {redText ? <Form.Label style={{color:colour}}>Invalid please try again...</Form.Label> : ""}
                <br/>
                </Form.Group>
                <Button disabled={username && password ? false : true} variant="primary" type="submit">
                {loginButton}
                </Button>
            </Form>
        </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default LoginPage;
