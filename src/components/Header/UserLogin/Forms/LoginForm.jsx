import React, { useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import fire from "../../../../config/Fire";
export default function LoginForm({ setSignUpPage }) {
  const [error, setError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();

  return (
    <section>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            ref={emailInput}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            ref={passwordInput}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="success" type="submit" block onClick={handleLogin}>
          Sign In
        </Button>
        <Button variant="primary" block onClick={() => setSignUpPage(true)}>
          Sign Up
        </Button>
      </Form>
      <span>{error}</span>
      <hr className="hr-text" data-content="Or Login with" />
      <Row className="mb-2">
        <Col lg={{ span: 6, offset: 3 }}>
          <Button
            variant="outline-dark"
            type="submit"
            block
            onClick={() => {
              login("guest@gmail.com", "123456");
            }}
          >
            Guest
          </Button>
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="mb-2">
          <Button
            variant="primary"
            type="submit"
            block
            disabled
            onClick={() => {
              console.log("Facebook");
            }}
          >
            Facebook
          </Button>
        </Col>
        <Col lg={6}>
          <Button
            variant="light"
            type="submit"
            block
            disabled
            onClick={() => {
              console.log("Google");
            }}
          >
            Google
          </Button>
        </Col>
      </Row>
    </section>
  );
  function login(email, password) {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {
        console.log("User Sign In...");
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
      });
  }
  function handleLogin(e) {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    login(email, password);
  }
}
