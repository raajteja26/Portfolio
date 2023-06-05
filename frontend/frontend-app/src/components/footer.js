import React from 'react'
import "./footer.css";
import instagram from "./images/instagram.png";
import twitter from "./images/twitter.png";
import facebook from "./images/facebook.png";
import linkedin from "./images/linkedin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLocationDot, faPhone, faEnvelope} from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
      <div className='container-fluid' style={{ backgroundColor: "#1d262d", color: "white" }}>
        <br />
        <div className='row'>

          <div className='col-md-6 col-sm-12'>
            <div className='row'>
              <div className='col-12'><h6 style={{ float: "left",marginBottom:"15px" }}>CONTACT ME -</h6></div>
              <div className='col-12'><FontAwesomeIcon style={{ float: "left", marginTop: "3px" }} icon={faLocationDot} /><p style={{ float: "left" }}><span style={{marginLeft:"5px"}}> Venkateshwarlapally,Warangal,506391</span></p></div>
              <div className='col-12'><FontAwesomeIcon style={{ float: "left", marginTop: "3px" }} icon={faPhone} /><p style={{ float: "left" }}><span style={{marginLeft:"5px"}}>9515371838</span></p></div>
              <div className='col-12'><FontAwesomeIcon style={{ float: "left", marginTop: "3px" }} icon={faEnvelope} /><p style={{ float: "left" }}><span style={{marginLeft:"5px"}}>rajupaka0811@gmail.com</span></p></div>
            </div>
          </div>
          <div className='col-md-6 col-sm-12 networks'>
            <div className='row'>
              <h6 className="social" style={{marginBottom:"15px"}}>SOCIAL NETWORKS -</h6>
              <div className='col'>
              <img className='socialimages hover-effect' src={linkedin} alt="linkedin" style={{ cursor: "pointer" }} onClick={() => {
                window.open(`https://www.linkedin.com/in/raaj-teja-513770208`);
              }} />
              </div>
              <div className='col'>
              <img className='socialimages hover-effect' src={instagram} alt="instagram" style={{ cursor: "pointer" }} onClick={() => {
                window.open(`https://instagram.com/raajteja_26?igshid=OTk0YzhjMDVlZA==`);
              }} />
              </div>
              <div className='col'>
              <img className='socialimages hover-effect' src={facebook} alt="facebook" style={{ cursor: "pointer" }} onClick={() => {
                window.open(`https://www.facebook.com/profile.php?id=100007375189321&mibextid=ZbWKwL`);
              }} />
              </div>
              <div className='col'>
              <img className='socialimages hover-effect' src={twitter} alt="twitter" style={{ cursor: "pointer" }} onClick={() => {
                window.open(`https://twitter.com/RaajtejaR?t=FzpDvNZmZggHU5qCU7EZUA&s=09`);
              }} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Footer;