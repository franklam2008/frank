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

        <Button variant="success" type="submit" block onClick={login}>
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
            onClick={guestLogin}
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
  function login(e) {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    console.log(password, email);
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {
        // console.log(u);
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
      });
  }
  function guestLogin() {
    const email = "guest@gmail.com";
    const password = "123456";
    console.log(password, email);
    console.log("123");

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {
        // console.log(u);
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
      });
  }
}
