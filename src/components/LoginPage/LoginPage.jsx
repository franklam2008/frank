import React, { useState} from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Img from "react-image";
import { MdLockOpen } from "react-icons/md";
import LoginForm from "../Forms/LoginForm.jsx";
import SignUpForm from "../Forms/SignUpForm.jsx";
import login from "../assets/img/login.png";
import "./css/LoginPage.css";
export default function LoginPage() {
  const [signUpPage, setSignUpPage] = useState(false);
  

  return (
    <Row className="loginPage">
        <Col lg={12} xs={12} className="loginCon">
          <div className="loginImgCol">
            <Img
              className="loginImg"
              src={login}
              loader={<Spinner className="" size="sm" animation="border" />}
            />
          </div>
          <div className="loginHeader">
            <MdLockOpen className="lockIcon" />
            <span>Log in to continue</span>
          </div>
          {signUpPage ? (
            <SignUpForm setSignUpPage={setSignUpPage} />
          ) : (
            <LoginForm setSignUpPage={setSignUpPage} />
          )}
        </Col>
    
    </Row>
  );
}
