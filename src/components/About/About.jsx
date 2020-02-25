import React,{useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
//css
import { FaHeart } from "react-icons/fa";
import "./css/about.css";
import { Spinner } from "react-bootstrap";
import Axios from "axios";

export default function About() {
  const [loading, setLoading] = useState(false);
  function refreshRadio(){
    setLoading(true)
    Axios
      .get(`https://secure-peak-92770.herokuapp.com/refreshRadio`)
      .then(response => {
       console.log(response);
      setLoading(false)
      })
      .catch(error => console.log(error));
  }
  function refreshCorona(){
    setLoading(true) 
    Axios.get(`https://secure-peak-92770.herokuapp.com/refreshCorona`)
      .then(response => {
       console.log(response);
       
      })
      .catch(error => console.log(error));
  }function load() {
    console.log("test");
    
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
            <button onClick={refreshRadio}>refreshRadio</button>
            <button onClick={refreshCorona}>refreshCorona</button>
            {loading?<Spinner></Spinner>:null}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
