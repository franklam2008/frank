import React, { useRef, useState } from "react";
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
import { useStore } from "../Firebase/FirebaseStore.jsx";
export default function MediaApp() {
  const {  dispatch } = useStore();
  const webInput = useRef();
  const [webScrapData, setWebScrapData] = useState([]);
  const [webData, setWebData] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [youtube, setYoutube] = useState(false);

  function test() {
    console.log("test");
   
  }
  function write() {
    console.log("write");
   
  }
 

  function read() {
    console.log("read");
   
  }
  return (
    <section className="mediaAppCon">
      <button onClick={test}>Test</button>
      <button onClick={write}>Write</button>
      <button onClick={read}>Read</button>
      
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
     

      {/* youtuber Channel */}
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

      {/* youtube */}
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
    </section>
  );
  function Get() {
    console.log("Get");

    // axios.get("https://localhost:4000/creators").then(response => {
    axios
      .get("https://secure-peak-92770.herokuapp.com/creators")
      .then(response => {
        console.log(response.data);
        setWebData(true);
        setWebScrapData(response.data);
        dispatch({ type: "LOAD_YOUTUBECHANNELS", payload: response.data });
      });
  }

  function Post() {
    console.log("Post");
    const input = webInput.current.value;

    // axios.post("https://localhost:4000/creators", {
    axios.post("https://secure-peak-92770.herokuapp.com/creators", {
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
      // .post("https://localhost:4000/youtube", {
      .post("https://secure-peak-92770.herokuapp.com/youtube", {
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

  
}
