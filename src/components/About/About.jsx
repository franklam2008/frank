import React,{useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
//css
import { FaHeart } from "react-icons/fa";
import "./css/about.css";
import firebase from "firebase/app";
var storage = firebase.storage();

var storageRef = storage.ref();
var pngRef = storageRef.child("frank.png");
var radioRef = storageRef.child("0211.mp3");
export default function About() {
  const [url, setUrl] = useState('false');
  function load() {
    console.log("test");
    radioRef
      .getDownloadURL()
      .then(function(url) {
        // Insert url into an <img> tag to "download"
        console.log(url);
        
        // setUrl(url)
      })
      .catch(function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            console.log("File doesn't exist");

            break;

          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;

          default:
            console.log("error");
        }
      });
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
            <img src={url} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
