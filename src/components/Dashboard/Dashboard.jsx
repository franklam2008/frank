import "./css/Dashboard.css";
import React, { useRef } from "react";
import { useStore } from "../Firebase/FirebaseStore.jsx";
import Img from "react-image";
import macIcon from "../assets/img/macIcon.png";
import { Col, Row, Spinner, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Home() {
  const { state } = useStore();
  const colorSwitch = useRef();
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
              label="Color Mode"
              onChange={colorSwitchFunc}
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
              <div className="movieWrapper">
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
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <div className="homeSectionCon pokeCon">
              <h3>Pokédex</h3>
              <img
                src="https://pokeres.bastionbot.org/images/pokemon/6.png"
                alt="poke"
                draggable={false}
              />
            </div>
          </Col>
          {/* radio */}
          <Col lg={4}>
            <div className="homeSectionCon radioCon">
              <h3>Radio</h3>
              <div className="radioWrapper">
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
      </section>
    </div>
  );
  function switchColor(darker, dark, normal, light, special, text, lightText) {
    document.documentElement.style.setProperty("--darkerBlueSaved", darker);
    document.documentElement.style.setProperty("--darkBlueSaved", dark);
    document.documentElement.style.setProperty("--blueSaved", normal);
    document.documentElement.style.setProperty("--lightBlueSaved", light);
    document.documentElement.style.setProperty("--pinkSaved", special);
    document.documentElement.style.setProperty("--textWhite", text);
    document.documentElement.style.setProperty("--subTextWhite", lightText);
  }

  function colorSwitchFunc() {
    const colorCheck = colorSwitch.current.checked;
    if (colorCheck) {
      switchColor(
        "#304863",
        "#364F6B",
        "#3E5B7B",
        "#43dde6",
        "#fc5185",
        "#f8f8f8",
        "#b9b9b9"
      );
    } else {
      switchColor(
        "#FFFFFF",
        "#f2f2f2",
        "#E5E3E1",
        "#FF2710",
        "#FF7711",
        "#393e46",
        "#303a52"
      );
    }
  }
}
