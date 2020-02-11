import React, { useState, useEffect } from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaRegArrowAltCircleRight, FaTimes } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import Img from "react-image";

export default function MovieDash({ movies, dispatch }) {
  const [fullLength, setFullLength] = useState(false);
  useEffect(() => { //check if length too short for Carousel
    checkMovieArrLength(movies);
  }, [movies]);

  return (
    <div className="homeSectionCon movieCon">
      <h3 className="colorHeader">
        <strong>Movie List</strong>
      </h3>
      <Carousel
        className="carouselMovie"
        arrowLeft={fullLength ? <IoIosArrowBack /> : null}
        arrowRight={fullLength ? <IoIosArrowForward /> : null}
        addArrowClickHandler
        slidesPerScroll={1}
        slidesPerPage={9}
        infinite={fullLength}
        breakpoints={{
          1500: {
            slidesPerPage: 7,
            clickToChange: false,
            centered: false
          },
          1200: {
            slidesPerPage: 6
          },
          1050: {
            slidesPerPage: 5
          },
          900: {
            slidesPerPage: 4
          },
          750: {
            slidesPerPage: 2
          },
          500: {
            slidesPerPage: 2
          },
          400: {
            slidesPerPage: 1,
            slidesPerScroll: 1
          }
        }}
      >
        {movies.map(movie => (
          <div className="movie" key={movie.id}>
            <Img
              draggable={false}
              variant="top"
              alt="movie"
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              loader={<Spinner size="sm" className="" animation="border" />}
              unloader={<p>Not Available</p>}
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://www.themoviedb.org/movie/" + movie.id}
            >
              <FaRegArrowAltCircleRight className="movieDashboardGoto" />
            </a>
            <FaTimes
              className="movieDashboardDelete"
              onClick={() => deleteMovie(movie.id)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
  function deleteMovie(id) {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
    checkMovieArrLength(movies);
  }
  function checkMovieArrLength(arr) {
    arr.length > 8 ? setFullLength(true) : setFullLength(false);
  }
}
