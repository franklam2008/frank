import React, { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import ReactPlayer from "react-player";
import { Spinner } from "react-bootstrap";
import axios from "axios";

export default function YouTubePlayer() {
  const youTubeSearchInput = useRef();
  const [youtubeURL, setYoutubeURL] = useState("");
  const [youtube, setYoutube] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="homeSectionCon youTubeCon">
      <h3>
        <strong>YouTube Player</strong>
        {loading ? (
          <Spinner size="sm" className="youTubeSpinner" animation="border" />
        ) : null}
      </h3>

      <div className="searchBar">
        <IoIosSearch />
        <input
          type="text"
          placeholder={"Play video in one click"}
          className="searchBarInput"
          ref={youTubeSearchInput}
          onKeyPress={handleKeyPress}
        />
        <button onClick={YouTubeScrape}>Search</button>
      </div>

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
    </div>
  );
  function YouTubeScrape() {
    console.log("YouTube");
    const input = youTubeSearchInput.current.value;
    console.log("Post", input);
    setLoading(true);
    axios
      // .post(`http://localhost:4000/youtube/${input}`, {
      // .get("http://localhost:4000/youtube", {
      .post(`https://secure-peak-92770.herokuapp.com/youtube/${input}`, {
        input: input
      })
      .then(response => {
        setYoutube(true);
        setYoutubeURL(response.data.link);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }
  function handleKeyPress(target) {
    if (target.charCode === 13) {
      YouTubeScrape();
    }
  }
}
