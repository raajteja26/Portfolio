import React from 'react'
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
import Swal from "sweetalert2";
import Row from 'react-bootstrap/Row';
import "../css/bootstrap.min.css";
function Projects() {
  const [modalShow, setModalShow] = React.useState(false);
  const [addShow, setAddShow] = React.useState(false);
  const [projects, setProjects] = React.useState([])
  const [projectName, setProjectName] = React.useState("")
  const [responsibilities, setResponsibilities] = React.useState([])

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
            Roles and Responsibilities in {projectName} Project:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responsibilities.map((line, index) => (
            <p key={index}><FontAwesomeIcon icon={faArrowRight} /> {line}</p>
          ))}
        </Modal.Body>
      </Modal>
    );
  }

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
            <Button type="submit" style={{ float: "right" }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <div>
      <div className='container' >
        <br/>
        <h2 style={{ fontWeight: "600" }}>Projects</h2>
        <div className="row">
          {projects.map((project, id) => (
            <div className="col-sm-4" key={id}>
              <div className="card" style={{ marginTop: "5%" }}>
                <div className="card-body" style={{ backgroundColor: "#1d262d", color: "white", borderRadius: "5px" }}>
                  <h6 className="card-title" style={{ fontWeight: "600", float: "right" }}>{project.name}</h6>
                  <p className="card-title" style={{ fontWeight: "600" }}>{project.role}</p>
                  <div className='container' style={{ borderRadius: "5px", backgroundColor: "white", color: "#1d262d" }}>
                    <p className="card-title" style={{ fontWeight: "500" }}>Technologies:</p>
                    <p className="card-text">{project.technologies}</p>
                  </div>
                  <p style={{ float: "right", cursor: "pointer" }} onClick={() => onClickMore(project.responsibilities, project.name)}>More...</p>
                  <ResponsibilitiesModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
            </div>
          ))}
          {localStorage.getItem('token') ? <img className='plusimage hover-effect' src={plus} alt="plus" style={{ cursor: "pointer", width: "10%", height: "10%", float: "right", marginTop: "5%" }} onClick={() => setAddShow(true)} /> : ""}
          <AddProjectModal
            show={addShow}
            onHide={() => setAddShow(false)}
          />
        </div>

      </div>
      <br />
      <div >
        <Footer />
      </div>
    </div>
  )
}

export default Projects;