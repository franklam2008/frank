import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieItem from "./MovieItem.jsx";
import Pagination from "./Pagination.jsx";
import {
  Col,
  Row,
  Spinner,
  FormControl,
  Button,
  InputGroup
} from "react-bootstrap";
import "./css/movie.css";
export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const movieSearchInput = useRef();
  const [currentPageUrl, setCurrentPageUrl] = useState(
    //first page
    "https://api.themoviedb.org/3/movie/popular?api_key=630dccfdf3364cb0f343c0132432ed6b&language=en-US&page=1"
  );
  useEffect(() => {
    axios.get(currentPageUrl).then(response => {
      setMovies(response.data.results);
      setLoading(false);
    });
  }, [currentPageUrl]);
  function changePageNum(url, add, num) {
    if (!url.includes("&page=")) url = url.concat("&page=1"); // adding &page= for search input
    const baseUrl = url.slice(0, url.indexOf("&page=") + 6);
    let id = num || Number(url.substring(url.indexOf("&page=") + 6));
    add ? id++ : id--;
    id > 1 ? setShowPrev(true) : setShowPrev(false);
    setCurrentPageUrl(baseUrl + id);
  }
  function handleSearchInput(e) {
    const name = movieSearchInput.current.value;
    const searchUrl =
      "https://api.themoviedb.org/3/search/movie?api_key=630dccfdf3364cb0f343c0132432ed6b&language=en-US&query=";
    if (name === "") return;
    setCurrentPageUrl(searchUrl + name);
    movieSearchInput.current.value = null;
  }
  //loading screen
  if (loading)
    return (
      <div className="loadingScreen">
        <Spinner size="lg" className="" animation="border" />
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="movieCon">
      <div className="mainTitle">Movies</div>
      <Pagination
        showPrev={showPrev}
        changePageNum={changePageNum}
        currentPageUrl={currentPageUrl}
      ></Pagination>
      <InputGroup className="mx-auto w-50">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          ref={movieSearchInput}
          type="text"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleSearchInput}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Row className="movieList mt-3">
        {movies.map(movie => (
          <Col key={movie.id} lg={4}>
            <MovieItem movie={movie} />
          </Col>
        ))}
      </Row>
      <Pagination
        showPrev={showPrev}
        changePageNum={changePageNum}
        currentPageUrl={currentPageUrl}
      ></Pagination>
    </div>
  );
}
