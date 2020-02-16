import React from "react";
import { Container, Row, Col } from "react-bootstrap";
//css
import { FaHeart } from "react-icons/fa";
import "./css/about.css";
import firebase from "firebase/app";


// var storage = firebase.storage();
// var storageRef = storage.ref();
// var pngRef = storageRef.child('frank.png');
export default function About() {
  function load(){
    console.log('test');
    
  }
  return (
    <section className="aboutCon page">
      <Container>
        <Row>
          <Col>
            {" "}
            <div className="mainTitle">About</div>
            <p>
              This is a ReactJS Application with Authentication from Firebase.
            </p>
            <p>Feel free to visit my personal Website.</p>
            <a
              href="https://www.ifranklam.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <p>ifranklam.com </p>
            </a>
            <p className="madeWith">
              Made with <FaHeart className="" /> in Orlando, Florida
            </p>
            <button onClick={load}>load</button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
