import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Img from "react-image";
import {
  Button,
  InputGroup,
  FormControl,
  Spinner,
  Row,
  Col
} from "react-bootstrap";
import ReactPlayer from "react-player";
//Firebase
import fire from "../../config/Fire";
import { useStore } from "../Firebase/FirebaseStore.jsx";
//css
import { FaHeart } from "react-icons/fa";
import "./css/about.css";

export default function About() {
  const { state, dispatch } = useStore();
  const dataInput = useRef();
  const webInput = useRef();
  const [webScrapData, setWebScrapData] = useState([]);
  const [webData, setWebData] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [youtube, setYoutube] = useState(false);
  const [radioScrapData, setRadioScrapData] = useState([]);
  const [radioData, setRadioData] = useState(false);
  useEffect(() => {
    const db = fire.database();
    const dbRef = db.ref().child("data");

    dbRef.on("value", snapshot => {
      //do sth
      dispatch({ type: "ADD_DB", payload: snapshot.val() });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="aboutCon">
      <div className="mainTitle">About</div>
      <p>This is a ReactJS Application with Authentication from Firebase.</p>
      <p>Feel free to visit my personal Website.</p>
      <a
        href="https://www.ifranklam.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>ifranklam.com </p>
      </a>
      <a
        href="https://quirky-shirley-a7ad09.netlify.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>quirky-shirley-a7ad09</p>
      </a>
      <p className="madeWith">
        Made with <FaHeart className="" /> in Orlando, Florida
      </p>
      <p> Test Section</p>
      <h4 className="text-center">AuthUser</h4>
      <p>{state.authUser.displayName ?? "No username"}</p>
      <p>{state.authUser.email ?? "login"}</p>
      <h4 className="text-center"> Counter/test</h4>
      <div>{state.counter}</div>
      <button onClick={() => dispatch({ type: "ADD1" })}>Add</button>
      <button onClick={() => dispatch({ type: "MINUS1" })}>Subtract</button>
      <button onClick={() => dispatch({ type: "CHECK_STATE" })}>
        log state
      </button>
      <button onClick={test}>Test</button>
      <h4 className="text-center"> Quick Snap Container</h4>
      <InputGroup>
        <FormControl
          type="text"
          ref={dataInput}
          placeholder={"Data"}
          aria-label="Search"
          aria-describedby="basic-addon2"
          onKeyPress={handleKeyPress}
        />
        <InputGroup.Append>
          <Button variant="info" onClick={handleSearchInput}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <p>{state.db.data}</p>
      <InputGroup>
        <FormControl
          type="text"
          ref={webInput}
          placeholder={"webTest"}
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append></InputGroup.Append>
      </InputGroup>
      <Button variant="info" onClick={Get}>
        Get
      </Button>
      <Button variant="info" onClick={Post}>
        Post
      </Button>
      <Button variant="info" onClick={YouTubeScrape}>
        YouTube
      </Button>
      <Button variant="info" onClick={HkfmScrape}>
        Hkfm
      </Button>
      <Row className="scrapersCon">
        {webData
          ? webScrapData.map(item => (
              <Col key={item.id} lg={2}>
                <div>
                  <Img
                    draggable={false}
                    src={item.img}
                    loader={
                      <Spinner size="sm" className="" animation="border" />
                    }
                    unloader={<p>Not Available</p>}
                  />
                </div>
              </Col>
            ))
          : null}
      </Row>
      {youtube ? (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={youtubeURL}
            playing
            controls
          />
        </div>
      ) : null}
      <Row>
        {radioScrapData.length > 2 && radioData
          ? radioScrapData.map(post => (
              <Col lg={3} key={post.id}>
                <div className="player-wrapper">
                  <a href={post.directLink} rel="noopener noreferrer"target="_blank"><h4>{post.name}</h4></a>
                  <ReactPlayer
                    url={post.fileURL}
                    playing={false}
                    width="300px"
                    height="70px"
                    controls
                  />
                </div>
              </Col>
            ))
          : null}
      </Row>
    </section>
  );

  function handleSearchInput(e) {
    const name = dataInput.current.value;
    // fire
    //   .database()
    //   .ref("data")
    //   .set({
    //     data: name
    //   });
    if (name === "") return;
    dispatch({
      type: "ADD_DB",
      payload: {
        data: name
      }
    });
  }
  function handleKeyPress(target) {
    if (target.charCode === 13) {
      handleSearchInput();
    }
  }

  function Get() {
    console.log("Get");

    axios.get("http://localhost:4000/creators").then(response => {
      console.log(response.data);
      setWebData(true);
      setWebScrapData(response.data);
    });
  }

  function Post() {
    console.log("Post");
    const input = webInput.current.value;

    axios.post("http://localhost:4000/creators", {
      firstName: "Fred",
      lastName: "Flintstone",
      input: input
    });
  }
  function YouTubeScrape() {
    console.log("YouTube");
    const input = webInput.current.value;
    console.log("Post", input);

    axios
      // .post("http://localhost:4000/youtube", {
      .post("https://secure-peak-92770.herokuapp.com/youtube", {
        firstName: "Fred",
        lastName: "Flintstone",
        input: input
      })
      .then(response => {
        console.log(response.data);
        setYoutube(true);
        setYoutubeURL(response.data.link);
      });
  }

  function HkfmScrape() {
    console.log("Hkfm");
    const input = webInput.current.value;
    console.log("Post", input);

    axios
      .post("http://localhost:4000/hkfm", 
        // .post("https://secure-peak-92770.herokuapp.com/hkfm", 
        input
      )
      .then(response => {
        console.log(response.data);
        setRadioData(true);
        setRadioScrapData(response.data);
        for (var i in response.data) {
          // champObj = response.data.data[i];
          setRadioScrapData(response.data[i]);
        }
      });
  }
  function test() {
    console.log(radioScrapData);
    console.log(radioData);
  }
}
