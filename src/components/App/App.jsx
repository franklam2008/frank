import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route ,Redirect} from "react-router-dom";
// pages
import Header from "../Header/Header.jsx";
import PokemonApp from "../Pokemon/PokemonApp.jsx";
import MovieApp from "../Movie/MovieApp.jsx";
import About from "../About/About.jsx";
import Home from "../Home/Home.jsx";
import TodoApp from "../Todo/TodoApp.jsx";
import Counter from "../Store/counter.jsx";
// css
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
//Store
// import { useOutsideAlerter } from "./AppEventListener";
import "./AppEventListener";
// import { StoreProvider } from "../Store/Store-provider.jsx";
import { UserProvider } from "../Firebase/FirebaseStore.jsx";

function App() {
  const [openCol, setOpenCol] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <div className="container-fluid">
            <Row>
              <Col className="backSideBar" xs={0} lg={1}></Col>
              <Col
                id={openCol ? "openCol" : undefined}
                className="sideBarMenu"
                ref={wrapperRef}
              >
                <Header setOpenCol={setOpenCol} openCol={openCol} />
              </Col>
              <Col xs={12} lg={11} className="mainCon">
                {/* Paths to different Pages */}
                <Redirect exact from="/" to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/Pokemon" component={PokemonApp} />
                <Route path="/MovieList" component={MovieApp} />
                <Route path="/Todo" component={TodoApp} />
                <Route path="/about" component={About} />
                <Route path="/counter" component={Counter} />
              </Col>
            </Row>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenCol(false);
      }
    }
    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
}

export default App;
