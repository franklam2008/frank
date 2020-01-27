import { Modal, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Form,} from "react-bootstrap";
import axios from "axios";

// import Img from "react-image";

export default function LightBox({ show, onHide }) {
  const [formMsg, setFormMsg] = useState("");

  const emailInput = useRef();
  const nameInput = useRef();
  const phoneInput = useRef();
  const messageInput = useRef();

  return (
    <Modal
      className=""
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>Contact Form</Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicPassword">
            <input
              className="inputSaved"
              type="text"
              ref={nameInput}
              placeholder="Name"
              // defaultValue="Frank"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <input
              className="inputSaved"
              type="email"
              ref={emailInput}
              placeholder="Enter email"
              defaultValue="email@example.com"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <input
              className="inputSaved"
              type="tel"
              ref={phoneInput}
              placeholder="Phone Number"
              defaultValue="3332222323"
            />
          </Form.Group>{" "}
          <Form.Group controlId="formBasicPassword">
            <input
              className="inputSaved"
              type="text"
              ref={messageInput}
              placeholder="Message"
              defaultValue="Hello World!"
            />
          </Form.Group>
          <Form.Text>
            We'll never share your information with anyone else.
          </Form.Text>
          <Button variant="success" type="submit" onClick={handleForm}>
            Submit
          </Button>
        </Form>
        <p>{formMsg}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
  function handleForm(e) {
    console.log("test");
    e.preventDefault();
    const input = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
      message: messageInput.current.value
    };

    sendForm(input);
  }
  function sendForm(input) {
    axios.post("http://localhost:5000/submit", input).then(res => {
      console.log(res);
      setFormMsg(res.data);
    });
  }
}
