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
import "./css/mediaApp.css";
import fire from "../../config/Fire";
import { useStore } from "../Firebase/FirebaseStore.jsx";

export default function MediaApp() {
  const { state, dispatch } = useStore();
  const webInput = useRef();
  const [webScrapData, setWebScrapData] = useState([]);
  const [webData, setWebData] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [youtube, setYoutube] = useState(false);
  const [radioScrapData, setRadioScrapData] = useState([]);
  const [radioData, setRadioData] = useState(false);
  useEffect(() => {
    // Get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mediaAppCon">
      <button onClick={test}>Test</button>

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
                  <a
                    href={item.ytURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Img
                      draggable={false}
                      src={item.img}
                      loader={
                        <Spinner size="sm" className="" animation="border" />
                      }
                      unloader={<p>Not Available</p>}
                    />
                  </a>
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
      .post("http://localhost:4000/youtube", {
        // .post("https://franklam-app.herokuapp.com/youtube", {

        // .post("https://secure-peak-92770.herokuapp.com/youtube", {
        firstName: "Fred",
        lastName: "Flintstone",
        input: input
      })
      .then(response => {
        console.log(response.data);
        setYoutube(true);
        setYoutubeURL(response.data.link);
      })
      .catch(error => console.log(error));
  }

  function HkfmScrape() {
    console.log("Hkfm");
    const input = webInput.current.value;
    console.log("Post", input);

    axios
      .post(
        "http://localhost:4000/hkfm",
        // .post("https://secure-peak-92770.herokuapp.com/hkfm",
        input
      )
      .then(response => {
        console.log(response.data);
        setRadioData(true);
        setRadioScrapData(response.data);
      });
  }
  function test() {
    console.log(radioScrapData);
    console.log(radioData);
  }
}
