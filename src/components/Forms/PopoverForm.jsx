import React, { useState, useRef } from "react";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

export default function PopoverForm() {
  const [formMsg, setFormMsg] = useState("");
  const emailInput = useRef();
  const checkInput = useRef();
  const nameInput = useRef();
  const phoneInput = useRef();
  const messageInput = useRef();
  return (
    <Form onSubmit={handleForm}>
      <Form.Group controlId="formBasicPassword">
        <input
          className="inputSaved"
          type="text"
          ref={nameInput}
          placeholder="Name"
          required
          // defaultValue="Frank"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <input
          className="inputSaved"
          type="email"
          ref={emailInput}
          placeholder="Enter email"
          required
          // defaultValue="corlohk@yahoo.com.hk"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <input
          className="inputSaved"
          type="tel"
          ref={phoneInput}
          placeholder="Phone Number"
          required
          // defaultValue="3529999579"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <input
          className="inputSaved"
          type="text"
          ref={messageInput}
          placeholder="Message"
          required
          // defaultValue="Testing String"
        />
      </Form.Group>
      <Form.Group id="formCheckbox" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          ref={checkInput}
          label="Send me a SMS &amp; Email"
        />
        <Form.Text>
          We'll never share your information with anyone else saving it Airtable
          and send you a SMS and Email via Twilio and SendGrid API.
        </Form.Text>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        // onClick={handleForm}
      >
        Submit
      </Button>
      <span>{formMsg}</span>
    </Form>
  );
  function handleForm(e) {
    e.preventDefault();
    const input = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
      message: messageInput.current.value,
      checkbox: checkInput.current.checked
    };

    sendForm(input);
  }
  function sendForm(input) {
    axios
      .post("https://localhost:4000/submit", input)

      // .post("https://secure-peak-92770.herokuapp.com/submit", input)

      .then(res => {
        console.log(res);
        setFormMsg(res.data);
      })
      .catch(setFormMsg("Connected Error"));
  }
}
