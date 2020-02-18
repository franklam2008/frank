import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Header from "../Header/Header.jsx";
import BottomNav from "../Header/BottomNav.jsx";
import LoadingPage from "./LoadingPage.jsx";
import PokemonApp from "../Pokemon/PokemonApp.jsx";
import MovieApp from "../Movie/MovieApp.jsx";
import About from "../About/About.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import TodoApp from "../Todo/TodoApp.jsx";
import ContactCon from "../ContactCon/ContactCon.jsx";
// css
import "./css/App.css";
import "./css/LoadingPage.css";
import { Container, Row, Col } from "react-bootstrap";
//Store
import FirebaseFunc from "../Firebase/Firebase.jsx";
import LoginPage from "../LoginPage/LoginPage.jsx";
import { UserProvider } from "../Firebase/FirebaseStore.jsx";
import LolApp from "../Lol/LolApp.jsx";
//js
import { CSSTransition, TransitionGroup } from "react-transition-group";
function App() {
  const [openCol, setOpenCol] = useState(false);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Container fluid>
            <FirebaseFunc setLoading={setLoading} setLogin={setLogin} />
            <LoadingPage loading={loading} />
            {login ? (
              <Row>
                <Col className="backSideBar" sm={0} md={1}></Col>
                <Col
                  id={openCol ? "openCol" : undefined}
                  className="sideBarMenu"
                  ref={wrapperRef}
                >
                  <Header setOpenCol={setOpenCol} openCol={openCol} />
                </Col>
                <BottomNav setOpenCol={setOpenCol} openCol={openCol} />

                <Col
                  sm={12}
                  md={11}
                  id={openCol ? "mainConDark" : " "}
                  className="mainCon"
                >
                  <ContactCon />
                  <Route
                    render={({ location }) => (
                      <TransitionGroup>
                        <CSSTransition
                          key={location.key}
                          timeout={450}
                          classNames="fade"
                        >
                          <Switch location={location}>
                            {/* Paths to different Pages */}
                            <Route exact path="/" component={Dashboard} />
                            <Route path="/pokemon" component={PokemonApp} />
                            <Route path="/movieList" component={MovieApp} />
                            <Route path="/todo" component={TodoApp} />
                            <Route path="/lol" component={LolApp} />
                            <Route path="/about" component={About} />
                          </Switch>
                        </CSSTransition>
                      </TransitionGroup>
                    )}
                  />
                </Col>
              </Row>
            ) : (
              <LoginPage />
            )}
          </Container>
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
