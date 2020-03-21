import React, { useState, useEffect } from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaRegArrowAltCircleRight, FaTimes } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import Img from "react-image";
import { NavLink } from "react-router-dom";

export default function MovieDash({ movies, dispatch }) {
  const [fullLength, setFullLength] = useState(false);
  const [emptyMovieArr, setEmptyMovieArr] = useState(false);
  useEffect(() => {
    //check if length too short for Carousel
    checkMovieArrLength(movies.length);
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
        {emptyMovieArr ? (
          <div className="emptyMovie">
            <h3 className="colorHeader">
              <span>
                <NavLink
                  className="nav-link nav-item"
                  activeClassName="activeLink"
                  exact
                  to="movieList"
                >
                  Click here to add movie
                </NavLink>
              </span>
            </h3>
          </div>
        ) : (
          movies.map(movie => (
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
                <FaRegArrowAltCircleRight className="movieDashboardGoto" title="More Detail"/>
              </a>
              <FaTimes
                className="movieDashboardDelete"
                onClick={() => deleteMovie(movie.id)}title="Delete this movie"
              />
            </div>
          ))
        )}
      </Carousel>
    </div>
  );
  function deleteMovie(id) {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
  }
  function checkMovieArrLength(length) {
    if (length > 8) {
      setFullLength(true);
      setEmptyMovieArr(false);
    } else if (length === 0) {
      setEmptyMovieArr(true);
    } else {
      setFullLength(false);
      setEmptyMovieArr(false);
    }
  }
}
