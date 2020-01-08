import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// pages
import Header from "./Layout/Header.jsx";
import PokemonApp from "./Pages/Pokemon/PokemonApp.jsx";
import MovieApp from "./Pages/Movie/MovieApp.jsx";
import About from "./Pages/About.jsx";
import Home from "./Pages/Home/Home.jsx";
import TodoApp from "./Pages/Todo/TodoApp.jsx";
// css
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container-fluid ">
          <Row>
            <Col xs={2} lg={1}></Col>
            <Col xs={2} lg={1} className="sideBarMenu bg-dark ">
              <Header />
            </Col>

            <Col xs={10} lg={11} className="mainCon">
              {/* Paths to different Pages */}
              <Route exact path="/" component={Home} />

              <Route path="/Pokemon" component={PokemonApp} />
              <Route path="/MovieList" component={MovieApp} />
              <Route path="/Todo" component={TodoApp} />
              <Route path="/about" component={About} />
            </Col>
          </Row>
        </div>
      </div>
    </Router>
  );
}

export default App;
