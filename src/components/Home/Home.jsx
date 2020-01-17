import "./css/home.css";
import React from "react";
import macIcon from "../assets/img/macIcon.png";
import {
  Col,
  Row
  // Spinner
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Home() {
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
          <Col >
            <div className="homeSectionCon movieCon">
              <h3>Movie List</h3>
              <img
                src="https://image.tmdb.org/t/p/w500//udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
                alt="Joker"
                draggable={false}
              />
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
