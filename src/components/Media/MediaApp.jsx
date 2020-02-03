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
import { IoMdRefresh } from "react-icons/io";
import fire from "../../config/Fire";
var db = fire.firestore();

export default function MediaApp() {
  const { state, dispatch } = useStore();
  const webInput = useRef();
  const [webScrapData, setWebScrapData] = useState([]);
  const [webData, setWebData] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [youtube, setYoutube] = useState(false);

  function test() {
    console.log("test");
    console.log(state.addedMovies);
    console.log(state.authUser);
    switchColor(
      "#304863",
      "#364F6B",
      "#3E5B7B",
      "#43dde6",
      "#fc5185",
      "#f8f8f8",
      "#b9b9b9"
    );
  }
  function write() {
    console.log("write");
    document.documentElement.style.setProperty("--darkBlueSaved", "#FF0000");
    // --darkerBlueSaved: #304863;
    // --darkBlueSaved: #364F6B;
    // --blueSaved: #3E5B7B;
    // --lightBlueSaved: #43dde6;
    // --pinkSaved: rgb(252 ,81,133);
    // --textWhite: rgb(248, 248, 248);
    // --subTextWhite: rgb(185, 185, 185);
    //white
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
  function switchColor(darker, dark, normal,  light,special, text, lightText) {
    document.documentElement.style.setProperty("--darkerBlueSaved", darker);
    document.documentElement.style.setProperty("--darkBlueSaved", dark);
    document.documentElement.style.setProperty("--blueSaved", normal);
    document.documentElement.style.setProperty("--lightBlueSaved", light);
    document.documentElement.style.setProperty("--pinkSaved", special);
    document.documentElement.style.setProperty("--textWhite", text);
    document.documentElement.style.setProperty("--subTextWhite", lightText);
  }
  function read() {
    console.log("read");
    db.collection("users")
      .doc(state.authUser.uid)
      .update({
        movie: state.addedMovies
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
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
      <Button variant="info" onClick={HkfmScrape}>
        Hkfm <IoMdRefresh />
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

    // axios.get("http://localhost:4000/creators").then(response => {
    axios
      .get("http://secure-peak-92770.herokuapp.com/creators")
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

    // axios.post("http://localhost:4000/creators", {
    axios.post("http://secure-peak-92770.herokuapp.com/creators", {
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
      })
      .catch(error => console.log(error));
  }

  function HkfmScrape() {
    console.log("Hkfm");
    const input = webInput.current.value;
    console.log("Post", input);

    axios
      // .post(
      //   "http://localhost:4000/hkfm",
      .post("https://secure-peak-92770.herokuapp.com/hkfm", input)
      .then(response => {
        console.log(response.data);

        dispatch({ type: "LOAD_RADIO", payload: response.data });
      });
  }
}
