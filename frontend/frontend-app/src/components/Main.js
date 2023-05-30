import React, { useState,useRef } from 'react';
import "./Main.css"
import css from "./images/css.png";
import django from "./images/django.jpeg";
import docker from "./images/docker.png";
import html from "./images/html.png";
import python from "./images/python.png";
import react from "./images/react.png";
import git from "./images/git.png";
import postgress from "./images/postgress.png";
import raajteja1 from "./images/raajteja1.jpg";
import Footer from './footer';
import "../css/bootstrap.min.css";
import Carousel from "react-elastic-carousel";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import plus from "./images/plus.png";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Main() {
  const [feedbacks, setFeedbacks] = React.useState([])
  const [addShow, setAddShow] = React.useState(false);
  const carouselRef = useRef(null);

  const handleChangeIndex = (index) => {
    carouselRef.current.goTo(index);
  };
  React.useEffect(() => {
    fetchFeedbacks();
  }, [setFeedbacks]); 

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('feedback');
        setFeedbacks(response.data);
        console.log(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        console.log(error);
      }
    };

  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];
  
  function AddProjectModal(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = React.useState({
      name: "",
      text: "",
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
      data.append("text", formData.text);
      if (selectedFile) {
        data.append("image", selectedFile);
      }
      setAddShow(false)
      axios.post('feedback/addfeedback/', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(
        response => {
          console.log(response)
          fetchFeedbacks();
        }
      ).catch(error => {
        localStorage.removeItem('token');
        console.log(error)
      })
      handleChangeIndex(feedbacks.length)
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
            Add Feedback:
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
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="text"
                  autoComplete="text"
                  onChange={handleInputChange}
                  placeholder="text"
                  value={formData.text}
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
            <Button type="button" onClick={() => setAddShow(false)} style={{ float: "right" }}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div>
      <div className='container pickupline'>
        <div className='row' style={{ alignItems: "center" }}>
          <div className='col-md-7'>
            <p style={{ color: "white", fontSize: "20px" }}>Experienced Full Stack Engineer proficient in React and Django, with expertise in Docker and Kubernetes. Skilled in frontend and backend development, RESTful API design, and version control. Strong problem-solving abilities and a focus on delivering high-quality software solutions.</p>
          </div>
          <div className='col-md-5 raajphoto'>
            <img className='raajteja1' src={raajteja1} alt="raajteja1" />
          </div>
        </div>
      </div>
      <br/>
      <div className='container' style={{alignItems:"center"}}>
       <div  className="row justify-content-center align-items-center">
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={react} alt="react"/>
          <h5 >React</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={django} alt="django"/>
          <h5 >Django</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={python} alt="python"/>
          <h5 >Python</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={docker} alt="docker"/>
          <h5 >Docker</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={html} alt="html"/>
          <h5 >HTML</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
          <img className='skillsimages' src={css} alt="css"/>
          <h5 >CSS</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
          <img className='skillsimages' src={git} alt="git"/>
          <h5 >Git</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
          <img className='skillsimages' src={postgress} alt="postgress"/>
          <h5>PostgreSQL</h5>
        </div>
       </div>
      </div>
      <br/>
      <div className='container-fluid' style={{backgroundColor:"#1d262d",marginTop:"10px",marginBottom:"10px"}}>
        <h4 style={{color:"white"}}>Feedbacks</h4>
        <img className='plusimage hover-effect' src={plus} alt="plus" style={{ cursor: "pointer", width: "4%", height: "4%", float: "right", marginTop: "-30px",backgroundColor:"white",borderRadius:"10px" }} onClick={() => setAddShow(true)} />
        <AddProjectModal
            show={addShow}
            onHide={() => setAddShow(false)}
          />
      <Carousel ref={carouselRef} breakPoints={breakPoints}>
      {
        feedbacks.map((feedback, id) => {
          return (
            <>
            <div className='feedbackcarousel'>
            <img
              key={id}
              className='feedbackcarousel feedbackimages'
              src={feedback.image}
              style={{position:"relative",marginRight:"-5px",marginLeft:"-5px",borderRadius:"10px"}}
              alt="feed"
            />
            <h5 className='feedbacktext' style={{position:"absolute",color:"white",bottom:"0px",fontWeight:"500"}}>{feedback.name}</h5>
            </div>
            </>
          );
        })
      }
        </Carousel>
      </div>
      <div className='bottom-component'>
        <Footer/>
        </div>
    </div>
  );
}

export default Main;