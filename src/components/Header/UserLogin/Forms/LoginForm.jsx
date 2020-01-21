import React, { useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import fire from "../../../../config/Fire";
import firebase from 'firebase/app';

export default function LoginForm({ setSignUpPage }) {
  const [error, setError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();

  return (
    <section>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <input
            className="inputSaved"
            type="email"
            ref={emailInput}
            placeholder="Enter email"
          />

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <input
            className="inputSaved"
            type="password"
            ref={passwordInput}
            placeholder="Password"
          />
        </Form.Group>
        <Row>
          <Col>
            <Button variant="success" type="submit" block onClick={handleLogin}>
              Sign In
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              block
              onClick={() => setSignUpPage(true)}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
      <span>{error}</span>
      <hr className="hr-text" data-content="Or Login with" />

      <Row>
        <Col lg={6} className="mb-2">
          <Button
            variant="outline-success"
            type="submit"
            block
            onClick={() => {
              login("guest@gmail.com", "123456");
            }}
          >
            Guest
          </Button>
        </Col>{" "}
        <Col lg={6}>
          <Button
            variant="outline-info"
            type="submit"
            block
            // disabled
            onClick={googleSignIn}
          >
            Google
          </Button>
        </Col>
        <Col lg={6} className="mb-2">
          <Button
            variant="outline-info"
            type="submit"
            block
            disabled
            onClick={facebookSignIn}

          >
            Facebook
          </Button>
        </Col>
        <Col lg={6}>
          <Button
            variant="outline-info"
            type="submit"
            block
            disabled
            onClick={() => {
              console.log("GitHub");
            }}
          >
            GitHub
          </Button>
        </Col>{" "}
       
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
  function googleSignIn() {
    console.log('Google Sign In');
    
    var provider = new firebase.auth.GoogleAuthProvider();

    fire
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  }
  function facebookSignIn(){
    console.log('Facebook Sign In');

    // var provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  }
}
