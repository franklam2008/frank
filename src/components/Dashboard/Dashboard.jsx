import "./css/Dashboard.css";
import React, { useRef, useEffect } from "react";
import { useStore } from "../Firebase/FirebaseStore.jsx";
import macIcon from "../assets/img/macIcon.png";
import MovieDash from "./MovieDash.jsx";
import Corona from "./Corona.jsx";
import Radio from "./Radio.jsx";
import YouTubePlayer from "./YouTubePlayer.jsx";
import { Col, Row, Form } from "react-bootstrap";
import CoronaChart from "./CoronaChart.jsx";

export default function Home() {
  const { state, dispatch } = useStore();
  const colorSwitch = useRef();
  useEffect(() => {
    document.getElementById("custom-switch").checked = state.darkMode;
  }, [state.darkMode]);

  return (
    <div className="homeCon">
      <div className="header">
        <div className="mainTitle">
          <img src={macIcon} alt="movie" draggable={false} />
          Dashboard
        </div>
      </div>
      <div className="colorSwitchCon">
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Dark Mode"
            onChange={darkModeHandler}
            ref={colorSwitch}
          />
        </Form>
      </div>
      <section className="container-fluid">
        <MovieDash movies={state.addedMovies} dispatch={dispatch} />
        <Row>
          <Col lg={8}>
            <YouTubePlayer />
          </Col>
          <Col lg={4}>
            <Radio radio={state.radio} />
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <Corona corona={state.corona} />
          </Col>
          <Col lg={7}>
            <CoronaChart />
          </Col>
        </Row>
      </section>
    </div>
  );
  function darkModeHandler() {
    let colorCheck = colorSwitch.current.checked;
    dispatch({ type: "DARKMODE", payload: colorCheck });
  }
}
