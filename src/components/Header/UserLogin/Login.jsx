import React, { useState } from "react";
import { Row,Col, Spinner } from "react-bootstrap";
import Img from "react-image";

import { MdLockOpen } from "react-icons/md";
import LoginForm from "./Forms/LoginForm.jsx";
import SignUpForm from "./Forms/SignUpForm.jsx";
import login from "../../assets/img/login.png";
export default function Login() {
  const [signUpPage, setSignUpPage] = useState(false);

  return (
    <section>
      <Row>
      <Col lg={6} xs={12} className="loginImgCol">
        <Img
          className="loginImg"
         
          src= {login} 
          loader={<Spinner className="" size="sm" animation="border" />}
        />
      </Col>
      <Col className="loginCon" lg={6} xs={12}>
        <div className="loginHeader">
          <MdLockOpen className="lockIcon" />
          <h4>Sign In</h4>
        </div>
        {signUpPage ? (
          <SignUpForm setSignUpPage={setSignUpPage} />
        ) : (
          <LoginForm setSignUpPage={setSignUpPage} />
        )}
      </Col></Row>
    </section>
  );
}
