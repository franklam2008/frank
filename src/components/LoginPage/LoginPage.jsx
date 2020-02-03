import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Img from "react-image";
import { MdLockOpen } from "react-icons/md";
import LoginForm from "../Forms/LoginForm.jsx";
import SignUpForm from "../Forms/SignUpForm.jsx";
import login from "../assets/img/login.png";
import gear from "../assets/img/gear.svg";
import "./css/LoginPage.css";
export default function LoginPage({ setLoading, loading }) {
  const [signUpPage, setSignUpPage] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="loginPage">
      {loading ? (
        <div> 
          <img src={gear} alt="Kiwi standing on oval"></img>
        </div>
      ) : (
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
      )}
    </Row>
  );
}
