import React, { useState } from 'react';
import axios from "axios";
import Footer from './footer';
import "./projects.css";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import plus from "./images/plus.png";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Carousel from "react-elastic-carousel";

function Projects() {
  const [modalShow, setModalShow] = React.useState(false);
  const [addShow, setAddShow] = React.useState(false);
  const [addShow1, setAddShow1] = React.useState(false);
  const [projects, setProjects] = React.useState([])
  const [certificates, setCertificates] = React.useState([])
  const [projectName, setProjectName] = React.useState("")
  const [responsibilities, setResponsibilities] = React.useState([])


  const breakPoints = [
    { width: 1, itemsToShow: 1},
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  React.useEffect(() => {
    axios.get('projects').then(
      response => {
        setProjects(response.data)
      }

    ).catch(error => {
      localStorage.removeItem('token');
      console.log(error)
    })
  }, [setProjects])

  function onClickMore(responsibility, name) {
    setModalShow(true)
    setProjectName(name)
    const lines = responsibility.split('\n');
    setResponsibilities(lines)
  }

  function ResponsibilitiesModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#1d262d", color: "white" }} className="custom-close-button" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Roles and Responsibilities in - {projectName} Project:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responsibilities.map((line, index) => (
            <p key={index}><FontAwesomeIcon icon={faArrowRight} /> {line}</p>
          ))}
        </Modal.Body>
        <Button type="button" onClick={() => setModalShow(false)} style={{ float: "right" }}>
              Close
        </Button>
      </Modal>
    );
  }
  
  React.useEffect(() => {
    fetchCertificates();
  }, [setCertificates]); 
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('certificates');
        setCertificates(response.data);
        console.log(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        console.log(error);
      }
    };

  function AddProjectModal(props) {
    const [formData, setFormData] = React.useState({
      name: "",
      role: "",
      technologies: "",
      responsibilities: ""
    })
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setAddShow(false)
      axios.post('projects/addproject/', formData, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        response => {
          console.log(response)
        }
      ).catch(error => {
        localStorage.removeItem('token');
        console.log(error)
      })
      window.location.reload()
    }
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ backgroundColor: "#1d262d", color: "white" }}
          closeButton
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Roles and Responsibilities:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Project Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="role"
                  autoComplete="role"
                  onChange={handleInputChange}
                  placeholder="Role"
                  value={formData.role}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Technologies used</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="technologies"
                  autoComplete="technologies"
                  onChange={handleInputChange}
                  placeholder="add technologies here"
                  value={formData.technologies}
                  style={{ height: "100px" }}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Roles & Responsibilities</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="responsibilities"
                  autoComplete="responsibilities"
                  onChange={handleInputChange}
                  placeholder="add Roles & Responsibilities here"
                  value={formData.responsibilities}
                  style={{ height: "400px" }}
                  required
                />
              </Form.Group>
            </Row>
            <Button type="submit" style={{ float: "right",marginLeft:"5px"}}>
              Submit
            </Button>
            <Button type="button" onClick={() => setAddShow(false)} style={{ float: "right" }}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  function AddCertModal(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = React.useState({
      name: "",
    })

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFormData({ ...formData }); 
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      const data = new FormData();
      data.append("name", formData.name);
      if (selectedFile) {
        data.append("image", selectedFile);
      }
      setAddShow(false)
      axios.post('certificates/addcertificates/', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(
        response => {
          console.log(response)
          fetchCertificates();
        }
      ).catch(error => {
        localStorage.removeItem('token');
        console.log(error)
      })
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ backgroundColor: "#1d262d", color: "white" }}
          closeButton
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Certificate:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>


              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  name="image"
                  autoComplete="image"
                  onChange={handleFileChange}
                  placeholder="image"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            
            <Button type="submit" style={{ float: "right",marginLeft:"5px"}}>
              Submit
            </Button>
            <Button type="button" onClick={() => setAddShow1(false)} style={{ float: "right" }}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <div>
      <div className='container-fluid' style={{position:"relative"}}>
        <br/>
        <h2 style={{ fontWeight: "600" }}>Projects</h2>
        <div style={{position:"absolute",top:"0px",right:"20px"}}>
          {localStorage.getItem('token') ? <img className='plusimage hover-effect' src={plus} alt="plus" style={{cursor: "pointer", width: "10%", height: "10%", float: "right", marginTop: "5%" }} onClick={() => setAddShow(true)} /> : ""}
          </div>
        <div className="row">
          {projects.map((project, id) => (
            <div className="col-sm-12" key={id}>
              <div className="card" style={{ marginTop: "2%"}}>
                <div className="card-body" style={{ backgroundColor: "#1d262d", color: "white", borderRadius: "5px" }}>
                  <h6 className="card-title" style={{ fontWeight: "600", float: "right" }}>Project - <span className='roletext'>{project.name}</span></h6>
                  <p className="card-title" style={{ fontWeight: "600" }}>Role - <span className='roletext'>{project.role}</span></p>
                  <div className='container-fluid' style={{ borderRadius: "5px", backgroundColor: "white", color: "#1d262d" }}>
                    <p className="card-title" style={{ fontWeight: "700" }}>Technologies:</p>
                    <p className="card-text" style={{fontWeight:"600"}}>{project.technologies}</p>
                  </div>
                  <p style={{ float: "right", cursor: "pointer"}} onClick={() => onClickMore(project.responsibilities, project.name)}><button class="btn btn-outline-primary" style={{fontWeight:"400", borderRadius:"5px",marginTop:"4px"}}><FontAwesomeIcon icon={faArrowRight} /> click to see Responsibilities...</button></p>
                  <ResponsibilitiesModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
            </div>
          ))}
          <AddProjectModal
            show={addShow}
            onHide={() => setAddShow(false)}
          />
        </div>

      </div>
      <br />
      <div className='container-fluid' style={{backgroundColor:"#1d262d",marginTop:"10px",marginBottom:"10px"}}>
        <h4 style={{color:"white"}}>Certificates</h4>
        {localStorage.getItem('token') ? <img className='plusimage hover-effect' src={plus} alt="plus" style={{ cursor: "pointer", width: "4%", height: "4%", float: "right", marginTop: "-30px",backgroundColor:"white",borderRadius:"10px" }} onClick={() => setAddShow1(true)} /> : ""}
        <AddCertModal
            show={addShow1}
            onHide={() => setAddShow1(false)}
          />
      <Carousel breakPoints={breakPoints}>
      {
        certificates.map((certificate, id) => {
          return (
            <>
            <div className='feedbackcarousel'>
            <img
              key={id}
              className='feedbackcarousel feedbackimages'
              src={certificate.image}
              style={{position:"relative",marginRight:"-5px",marginLeft:"-5px",borderRadius:"10px"}}
              alt="certificate"
            />
            </div>
            </>
          );
        })
      }
        </Carousel>
      </div>
    <br/>
      <div >
        <Footer />
      </div>
    </div>
  )
}

export default Projects;