import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6} className="connectpage">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                 <h4><span class="underlined">CONTACT</span>
                 <span class="underlined"> U</span>S</h4>
                 <h6>6th june 2023</h6>
                 <h4>Visit us</h4>
                 <span>here is the address of the orignization</span>
                 <h4>Leave us an email</h4>
                 <span>mailto:seffuture@gmail.com</span>
                 <h4>Follow us  on social media</h4>
                 <div className="social-icons">
                    <a href="https://www.facebook.com/your-facebook-page-url">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://twitter.com/your-twitter-page-url">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.instagram.com/your-instagram-page-url">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.linkedin.com/in/your-linkedin-page-url">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
               </div>
          </div>
                
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6} className="connectform px-4 custom-padding">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h3>GET IN TOUCH</h3>
                 <p>We'd love to hear from you</p>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                    <label for="firstName">First Name</label>
                      <input type="text" value={formDetails.firstName}  onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                    <label for="lastName">Last tName</label>
                      <input type="text" value={formDetails.lasttName}  onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                    <label for="Email">Email</label>
                      <input type="email" value={formDetails.email}  onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                    <label for="Phone">Phone Number</label>
                      <input type="tel" value={formDetails.phone}  onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <label for="message">Message</label>
                      <textarea rows="6" value={formDetails.message}  onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
