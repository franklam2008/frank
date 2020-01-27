import "./css/home.css";
import React from "react";
import { useStore } from "../Firebase/FirebaseStore.jsx";
import Img from "react-image";
import macIcon from "../assets/img/macIcon.png";
import { Col, Row, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { state, dispatch } = useStore();
  return (
    <div className="homeCon">
      <div className="header">
        <div className="mainTitle">
          <img src={macIcon} alt="movie" draggable={false} />
          Dashboard
          <div className="subTitle">
            This is where you control all your systems and stuff.
          </div>
        </div>
      </div>
      <section className="container-fluid">
        <Row className="">
          <Col>
            <div className="homeSectionCon movieCon">
              <h3>Movie List</h3>
              <div className="movieWrapper">
              {state.addedMovies.map(movie => (
                <Img
                  draggable={false}
                  variant="top" alt="movie"
                  key={movie.id}
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  loader={<Spinner size="sm" className="" animation="border" />}
                  unloader={<p>Not Available</p>}
                />
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

          <Col lg={4}>
            <div className="homeSectionCon">
              <h3>Other Information</h3>
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
      </section>
    </div>
  );
}
