import { Modal, Button } from "react-bootstrap";
import React, { useRef, useState, InputGroup } from "react";
import { Spinner, Row, Col, Form } from "react-bootstrap";
// import Img from "react-image";

export default function LightBox({ show, onHide }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  console.log();
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue="Mark"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                defaultValue="Otto"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Phone Number" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Phone Number.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check label="Send me an SMS" />
          </Form.Group>
          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
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
    const email = emailInput.current.value;
    const name = nameInput.current.value;
    const phone = phoneInput.current.value;
    const message = messageInput.current.value;

    sendForm(name, email, phone, message);
  }
  function sendForm(name, email, phone, message) {
    console.log(name, email, phone, message);
  }
}
