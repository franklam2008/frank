import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//FireBase
import { useStore } from "../Firebase/FirebaseStore.jsx";
import fire from "../../config/Fire";

//css
import { FaHeart } from "react-icons/fa";
import "./css/about.css";
import { Spinner } from "react-bootstrap";
import Axios from "axios";
var db = fire.firestore();

export default function About() {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useStore();
  const textInput = useRef();

  function refreshRadio() {
    setLoading(true);
    Axios.get(`https://secure-peak-92770.herokuapp.com/refreshRadio`)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }
  function refreshCorona() {
    setLoading(true);
    Axios.get(`https://secure-peak-92770.herokuapp.com/refreshCorona`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
  function load() {
    console.log("test");
  }
  function submit() {
    const text = textInput.current.value;
    console.log(text);
    console.log(state);
    dispatch({ type: "UPDATE_TEXT", payload: text });
    db.collection("public")
      .doc("textPlaceHolder")
      .set({
        text: text,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
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
            <button onClick={refreshRadio}>refreshRadio</button>
            <button onClick={refreshCorona}>refreshCorona</button>
            {loading ? <Spinner></Spinner> : null}
            <Form>
              <Form.Group controlId="textPlaceHolder">
                <Form.Label>Place Holder Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  ref={textInput}
                />
                <Form.Text className="text-muted">
                  We'll never share your info with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" onClick={submit}>
                Submit
              </Button>
            </Form>
            <p>{state.textPlaceHolder}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
