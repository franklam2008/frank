import React, { useRef, useState } from "react";
import { Form, Button,Row,Col } from "react-bootstrap";
import fire from "../../../../config/Fire";

export default function SignUpForm({ setSignUpPage }) {
  const [error, setError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const nameInput = useRef();

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail"> <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <input
            className="inputSaved"
            type="email"
            ref={emailInput}
            placeholder="Enter email"
          />
         
         
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <input
            className="inputSaved"
            type="password"
            ref={passwordInput}
            placeholder="Password"
          />
      
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicName">
          <input
            className="inputSaved"
            type="text" ref={nameInput} placeholder="Enter Name"
          />
        </Form.Group>
        <Row className="mb-4">
          <Col><Button variant="success" type="submit" block onClick={signUp}>
          Submit
        </Button>
          </Col>
          <Col><Button
          variant="secondary"
          type="submit"
          block
          onClick={() => setSignUpPage(false)}
        >
          Back
        </Button>
          </Col>
        </Row>
        
        

        <span>{error}</span>
      </Form>
    </div>
  );
  function signUp(e) {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const name = nameInput.current.value;
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(u => {
        var user = fire.auth().currentUser;
        user
          .updateProfile({
            displayName: name
          })
          .then(function() {
            // Update successful.
          })
          .catch(function(error) {
            // An error happened.
          });
        console.log(u);
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
      });
  }
}
