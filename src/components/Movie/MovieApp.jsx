import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieItem from "./MovieItem.jsx";
import Pagination from "./Pagination.jsx";
import { Col, Row, Spinner } from "react-bootstrap";
import "./css/movie.css";
import movieIcon from "../assets/img/movieIcon.png";
import { useStore } from "../Firebase/FirebaseStore.jsx";

export default function Movie() {
  const { state, dispatch } = useStore();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const [error, setError] = useState(false);
  const movieSearchInput = useRef();

  const [currentPageUrl, setCurrentPageUrl] = useState(
    //first page
    "https://api.themoviedb.org/3/movie/popular?api_key=630dccfdf3364cb0f343c0132432ed6b&language=en-US&page=1"
  );

  useEffect(() => {
    axios.get(currentPageUrl).then(response => {
      if (response.data.results.length !== 0) {
        setMovies(response.data.results);
        setError(false);
        setShowNext(true);
      } else {
        setError(true);
        setShowNext(false);
        setShowPrev(false);
        setMovies(response.data.results);
      }
      setLoading(false);
    });

    // fetch to check next page available
    axios
      .get(changePageNum(currentPageUrl, true, null, true))
      .then(response => {
        if (response.data.results.length === 0) {
          setShowNext(false);
        } else {
          setShowNext(true);
        }
      });
  }, [currentPageUrl]);

  //loading screen
  if (loading)
    return (
      <div className="loadingScreen">
        <Spinner size="lg" className="" animation="border" />
        <p>Loading...</p>
      </div>
    );
  return (
    <section className="movieCon">
      <div className="mainTitle">
        <img src={movieIcon} alt="movie" />
        Movies
      </div>
      <Pagination
        showPrev={showPrev}
        showNext={showNext}
        changePageNum={changePageNum}
        currentPageUrl={currentPageUrl}
        movieSearchInput={movieSearchInput}
        handleKeyPress={handleKeyPress}
        handleSearchInput={handleSearchInput}
        error={error}
      ></Pagination>

      {error && <p className="inputError">"No Result"</p>}

      <Row className="movieList mt-3">
        {movies.map(movie => (
          <Col key={movie.id} md={6} lg={6} xl={4}>
            <MovieItem movie={movie} addMovie={() => addMovie(movie)} />
          </Col>
        ))}
      </Row>
     
    </section>
  );

  function changePageNum(url, add, num, check) {
    if (!url.includes("&page=")) url = url.concat("&page=1"); // adding &page= for search input
    const baseUrl = url.slice(0, url.indexOf("&page=") + 6);
    let id = num || Number(url.substring(url.indexOf("&page=") + 6));
    add ? id++ : id--;
    if (check) return baseUrl + id;
    id > 1 ? setShowPrev(true) : setShowPrev(false); // show prev btn or not
    setCurrentPageUrl(baseUrl + id);
  }

  function handleSearchInput(e) {
    console.log(e);

    const name = movieSearchInput.current.value;
    const searchUrl =
      "https://api.themoviedb.org/3/search/movie?api_key=630dccfdf3364cb0f343c0132432ed6b&language=en-US&query=";
    if (name === "") return;
    setCurrentPageUrl(searchUrl + name);
    movieSearchInput.current.value = null;
    setShowPrev(false);
  }
  // press Enter listener
  function handleKeyPress(target) {
    if (target.charCode === 13) {
      handleSearchInput();
    }
  }
  function addMovie(movie) {
    // console.log(movie);
    const targetId = movie.id;
    let checkMovieInList = false;
    console.log(movie);

    if (state.addedMovies !== []) {
      checkMovieInList = state.addedMovies.some(movie => movie.id === targetId);
    }
    if (!checkMovieInList) {
      dispatch({ type: "ADD_MOVIE", payload: movie });
    }
  }
}
