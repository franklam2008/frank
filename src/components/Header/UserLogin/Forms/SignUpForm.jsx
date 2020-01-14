import React, { useRef, useState }  from "react";
import { Form, Button } from "react-bootstrap";
import fire from "../../../../config/Fire";

export default function SignUpForm({setSignUpPage}) {
  const [error, setError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const nameInput = useRef();
  
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
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordInput}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={nameInput} placeholder="Enter Name" />
        </Form.Group>
        <Button variant="success" type="submit" block onClick={signUp}>
          Submit
        </Button>
        <Button variant="secondary" type="submit" block  onClick={() => setSignUpPage(false)}>
          Back
        </Button>
  

        <span>{error}</span>
      </Form>
    </div>
  );
}
