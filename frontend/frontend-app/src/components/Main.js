import React from 'react'
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
import 'bootstrap/dist/css/bootstrap.css';
function Main() {
  return (
    <div>
      <div className='container pickupline'>
        <div className='row' style={{ alignItems: "center" }}>
          <div className='col-md-7'>
            <p style={{ color: "white", fontSize: "20px" }}>As a skilled developer, I have extensive knowledge and experience in both React and Django Python, enabling me to design and implement robust web applications that are both visually stunning and highly functional. With a proven track record of delivering quality solutions, I am confident in my ability to tackle any project with professionalism and expertise.</p>
          </div>
          <div className='col-md-5'>
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
      <br/>
      <div className='bottom-component'>
        <Footer/>
        </div>
    </div>
  );
}

export default Main;