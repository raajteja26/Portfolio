import React, { useState } from 'react';
import "./Main.css"
import css from "./images/css.png";
import django from "./images/django.jpeg";
import docker from "./images/docker.png";
import html from "./images/html.png";
import python from "./images/python.png";
import react from "./images/react.png";
import git from "./images/git.png";
import girl from "./images/girl.jpg";
import man from "./images/man.png";
import postgress from "./images/postgress.png";
import raajteja1 from "./images/raajteja1.jpg";
import Footer from './footer';
import "../css/bootstrap.min.css";
import Carousel from "react-elastic-carousel";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import plus from "./images/plus.png";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Popover from 'react-bootstrap/Popover';
import Swal from 'sweetalert2';

function Main() {
  const [feedbacks, setFeedbacks] = React.useState([])
  const [experience, setExperience] = React.useState(0)
  const [addShow, setAddShow] = React.useState(false);


  React.useEffect(() => {
    fetchExperience();
  }, [setExperience]); 
  const fetchExperience = async () => {
    try {
      const response = await axios.get('experience');
      setExperience(response.data[0].years);
    } catch (error) {
      localStorage.removeItem('token');
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchFeedbacks();
  }, [setFeedbacks]); 

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('feedback');
        const reversedData = response.data.reverse();
        setFeedbacks(reversedData);
      } catch (error) {
        localStorage.removeItem('token');
        console.log(error);
      }
    };

    const breakPoints = [
      { width: 1, itemsToShow: 1 }, // Mobile devices
      { width: 550, itemsToShow: 2 }, // Tablets
      { width: 768, itemsToShow: 5 }, // Small laptops
      { width: 1200, itemsToShow: 5 }, // Desktops
    ];
  
  function AddProjectModal(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = React.useState({
      name: "",
      text: "",
    })
    const [checked,setChecked] = React.useState(false)
    const [gender, setGender] = useState("");

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
        data.append("gender", "");
      } else {
        data.append("image", "");
        data.append("gender", gender.kindOfStand);
      }
      setAddShow(false)
      axios.post('feedback/addfeedback/', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(
        response => {
          if(response.status === 200){    
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:`Thank you ${formData.name}`,
            text: 'Your Feedback has been saved',
            showConfirmButton: false,
            timer: 2000
          })
          }
          console.log(response)
          fetchFeedbacks();
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
    const { kindOfStand } = gender;

  const handleChangeRadio = e => {
    e.persist();

    setGender(prevState => ({
      ...prevState,
      kindOfStand: e.target.value
    }));
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
                <Form.Label>Your Good Name...</Form.Label>
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
              <Form.Group as={Col} md="12" controlId="validationCustom02" style={{marginBottom:"20px"}}>
                <Form.Label>Feedback...</Form.Label>
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
              <Form.Group style={{marginTop:"10px",marginBottom:"10px",position:"relative"}}  as={Col} md="12" controlId="validationCustom03">
              <div style={{borderStyle:checked ? "none" : "groove",borderRadius:"10px"}}>
              <div className="form-switch">
              <input style={{width:"60px",height:"30px",position:"absolute",right:"20px",top:"-20px"}} 
              type="checkbox" 
              id="custom-switch" 
              class="form-check-input"
              onClick={()=>setChecked(!checked)}
              checked={checked}
              />
              </div>
              <p style={{position:"absolute",right:"85px",top:checked ? "-15px":"-23px"}}>{checked ? "Switch off this to upload photo" : "Switch on this to avoid photo"}</p>
              <div style={{display:checked ? "none" : "contents"}}>
                <Form.Label>Please Upload Your Photo...</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  autoComplete="image"
                  onChange={handleFileChange}
                  placeholder="image"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </div>
                </div>
              </Form.Group>
              {
                checked ? 
              <Form.Group style={{borderStyle:"groove",borderRadius:"5px",marginTop:"10px",marginBottom:"10px",position:"relative"}}  as={Col} md="12" controlId="validationCustom05">
              <Form.Label>Please select Your gender...</Form.Label>
              <Form.Check
              value="Male"
              type="radio"
              aria-label="radio 1"
              label="Male"
              onChange={handleChangeRadio}
              checked={kindOfStand === "Male"}
            />
            <Form.Check
              value="Female"
              type="radio"
              aria-label="radio 2"
              label="Female"
              onChange={handleChangeRadio}
              checked={kindOfStand === "Female"}
            />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
             
              </Form.Group>
               : ""
              }
            </Row>
            
            <Button disabled={formData.name && formData.text && (selectedFile || gender) ? false : true} type="submit" style={{ float: "right",marginLeft:"5px"}}>
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
        <div className='row ' style={{ alignItems: "center" }}>
          <div className='col-md-7'>
            <p className='summary'>Experienced Full Stack Engineer proficient in React and Django, with expertise in Docker and Kubernetes. Skilled in frontend and backend development, RESTful API design, and version control. Strong problem-solving abilities and a focus on delivering high-quality software solutions.</p>
          </div>
          <div className='col-md-5 raajphoto position-relative'>
            <img className='raajteja1' src={raajteja1} alt="raajteja1" />
            <div class="position-absolute top-0 end-0"><h3 className="exptext" style={{color:"white",borderRadius:"5px",marginTop:"5px",marginRight:"12px",fontWeight:"900"}}>{experience}+ years</h3></div>
          </div>
        </div>
      </div>
      <br/>
      <div className='container-fluid' style={{alignItems:"center"}}>
       <div  className="row justify-content-center align-items-center">
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={react} alt="react"/>
          <h5 className='skillstext'>React</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={django} alt="django"/>
          <h5 className='skillstext' >Django</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={python} alt="python"/>
          <h5 className='skillstext' >Python</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={docker} alt="docker"/>
          <h5 className='skillstext'>Docker</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
        <img className='skillsimages' src={html} alt="html"/>
          <h5 className='skillstext'>HTML</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
          <img className='skillsimages' src={css} alt="css"/>
          <h5 className='skillstext'>CSS</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
          <img className='skillsimages' src={git} alt="git"/>
          <h5 className='skillstext'>Git</h5>
        </div>
        <div className='col d-flex justify-content-center flex-column align-items-center'>
          <img className='skillsimages' src={postgress} alt="postgress"/>
          <h5 className='skillstext'>PostgreSQL</h5>
        </div>
       </div>
      </div>
      <br/>
      <div className='container-fluid' style={{backgroundColor:"#1d262d",marginTop:"10px",marginBottom:"10px"}}>
        <h6 className='mobilefeedback' style={{color:"white"}}>click on image to see</h6>
        <h4 style={{color:"white"}}>Feedback</h4>
        <img
          className="plusimage plussize hover-effect"
          src={plus}
          alt="plus"
          onClick={() => setAddShow(true)}
        />

        <h6 style={{color:"white",position:"absolute",right:"45px",marginTop:"-25px"}}>Add Feedback <FontAwesomeIcon icon={faArrowRight} /></h6>
        <AddProjectModal
            show={addShow}
            onHide={() => setAddShow(false)}
          />
          <Carousel breakPoints={breakPoints}>
          {feedbacks.map((feedback, id) => (
            <>
            <OverlayTrigger
            placement="bottom"
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h4">{feedback.name} - Feedback</Popover.Header>
                <Popover.Body>
                  {feedback.text}
                </Popover.Body>
              </Popover>
            }
            >
                <div className="feedbackcarousel textfeedback">
                  <img
                    key={id}
                    className="feedbackcarousel"
                    src={feedback.image === null ? (feedback.gender === "Male" ? man : girl) : feedback.image}
                    style={{objectFit: "cover"}}
                    alt="feed"
                  />
                  <h5 className="feedbacktext" style={{ position: "absolute", color: "white", bottom: "0px", fontWeight: "700" }}>
                    {feedback.name}
                  </h5>
                </div>
              </OverlayTrigger>
            </>
          ))}
        </Carousel>
      </div>
      <div className='bottom-component'>
        <Footer/>
        </div>
    </div>
  );
}

export default Main;