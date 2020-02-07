import "./css/Dashboard.css";
import React, { useRef, useEffect } from "react";
import { useStore } from "../Firebase/FirebaseStore.jsx";
import Img from "react-image";
import macIcon from "../assets/img/macIcon.png";
import { Col, Row, Spinner, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Home() {
  const { state, dispatch } = useStore();
  const colorSwitch = useRef();
  useEffect(() => {
    //update darkMode from store
    colorSwitchFunc(state.darkMode);
    document.getElementById("custom-switch").checked = state.darkMode;
  }, [state.darkMode]);
  return (
    <div className="homeCon">
      <div className="header">
        <div className="mainTitle">
          <img src={macIcon} alt="movie" draggable={false} />
          Dashboard
        </div>
        <div className="colorSwitchCol">
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Dark Mode"
              onChange={colorSwitchHandler}
              ref={colorSwitch}
            />
          </Form>
        </div>
      </div>
      <section className="container-fluid">
        <Row className="">
          <Col>
            <div className="homeSectionCon movieCon">
              <h3>Movie List</h3>
              <div id="container" className="movieWrapper">
                <button className="btnLeft" onClick={left}>
                  <IoIosArrowBack />
                </button>
                {state.addedMovies.map(movie => (
                  <div className="movie" key={movie.id}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://www.themoviedb.org/movie/" + movie.id}
                    >
                      <Img
                        draggable={false}
                        variant="top"
                        alt="movie"
                        src={
                          "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                        }
                        loader={
                          <Spinner size="sm" className="" animation="border" />
                        }
                        unloader={<p>Not Available</p>}
                      />
                    </a>
                  </div>
                ))}
                <button className="btnRight" onClick={right}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </Col>
        </Row>
        {/* Corona */}
        <Row>
          <Col lg={8}>
            <div className="homeSectionCon coronaCon">
              <h3>
                <a
                  href="https://www.google.com/search?q=coronavirus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Corona
                </a>{" "}
                <span>
                  (update every 3 hours)  
                  <a
                    href="https://www.worldometers.info/coronavirus/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                     Source
                  </a>{" "}
                </span>
              </h3>{" "}
              <h6> Date: {getCurrentDate()}</h6>
              {Object.entries(state.corona).map(x => (
                <div key={x[0]} className="coronaCat">
                  <p>
                    {x[0]}: <span className={x[0]}>{x[1]}</span>
                  </p>
                </div>
              ))}
            </div>
          </Col>
          {/* radio */}
          <Col lg={4}>
            <div className="homeSectionCon radioCon">
              <h3>Radio</h3>
              <div className="radioWrapper">
                <button className="btnLeft" onClick={left}>
                  <IoIosArrowBack />
                </button>
                {state.radio.map(post => (
                  <div className="player-wrapper" key={post.id}>
                    <a
                      href={post.directLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <h4>{post.name}</h4>
                    </a>
                    <ReactPlayer
                      url={post.fileURL}
                      playing={false}
                      width="240px"
                      height="50px"
                      controls
                    />
                  </div>
                ))}
                <button className="btnRight" onClick={right}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="homeSectionCon">
              <NavLink
                className="nav-link nav-item"
                activeClassName="activeLink"
                to={"/todo"}
              >
                <h3>Todo</h3>
              </NavLink>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="homeSectionCon">
              <h3>YouTube Player</h3>
            </div>
          </Col>
        </Row>
        <button onClick={test}>test</button>
      </section>
    </div>
  );
  function colorSwitchHandler() {
    let colorCheck = colorSwitch.current.checked;
    dispatch({ type: "DARKMODE", payload: colorCheck });
  }
  function colorSwitchFunc(boolean) {
    let colors = [];
    if (boolean) {
      colors = {
        //dark
        darkerBlueSaved: "#393e46",
        darkBlueSaved: "#222831",
        blueSaved: "#393e46",
        lightBlueSaved: "#caccd1",
        pinkSaved: "#f6c90e",
        textWhite: "#f3f4f7",
        subTextWhite: "#caccd1"
      };
    } else {
      colors = {
        //light
        darkerBlueSaved: "#FFFFFF",
        darkBlueSaved: "#f2f2f2",
        blueSaved: "#E5E3E1",
        lightBlueSaved: "#FF2710",
        pinkSaved: "#FF7711",
        textWhite: "#393e46",
        subTextWhite: "#303a52"
      };
    }
    Object.entries(colors).forEach(color =>
      document.documentElement.style.setProperty("--" + color[0], color[1])
    );
  }
  function right() {
    document.getElementById("container").scrollLeft += 150;
  }
  function left() {
    document.getElementById("container").scrollLeft -= 150;
  }
  function test() {
    console.log("test");
  }
  function getCurrentDate() {
    const separator = "-";
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }
}
