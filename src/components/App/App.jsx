import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
// pages
import Header from "../Header/Header.jsx";
import PokemonApp from "../Pokemon/PokemonApp.jsx";
import MovieApp from "../Movie/MovieApp.jsx";
import About from "../About/About.jsx";
import Home from "../Home/Home.jsx";
import TodoApp from "../Todo/TodoApp.jsx";
import MediaApp from "../Media/MediaApp.jsx";
import ContactCon from "../ContactCon/ContactCon.jsx";
// css
import "./css/App.css";
import "./css/LightBox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
//Store
// import { useOutsideAlerter } from "./AppEventListener";
import "./AppEventListener";
// import { StoreProvider } from "../Store/Store-provider.jsx";
import { UserProvider } from "../Firebase/FirebaseStore.jsx";
import LolApp from "../Lol/LolApp.jsx";

// fetch('https://api.darksky.net/forecast/d130903942442b3ccae7c1f6a56c60c2/37.8267,-122.4233').then(blob=>blob.json()).then(data=>console.log(data))

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
              <Col className="backSideBar" xs={0} sm={1} md={1} lg={1}></Col>
              <Col
                id={openCol ? "openCol" : undefined}
                className="sideBarMenu"
                ref={wrapperRef}
              >
                <Header setOpenCol={setOpenCol} openCol={openCol} />
              </Col>
              <Col
                xs={12}
                md={11}
                sm={11}
                lg={11}
                id={openCol ? "mainConDark" : " "}
                className="mainCon"
              >
                <ContactCon />
                <Switch>
                  {/* Paths to different Pages */}
                  <Route exact path="/" component={Home} />
                  <Route path="/pokemon" component={PokemonApp} />
                  <Route path="/movieList" component={MovieApp} />
                  <Route path="/todo" component={TodoApp} />
                  <Route path="/media" component={MediaApp} />
                  <Route path="/lol" component={LolApp} />
                  <Route path="/about" component={About} />
                </Switch>
              </Col>
            </Row>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
  //listener to Close OpenCol
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
