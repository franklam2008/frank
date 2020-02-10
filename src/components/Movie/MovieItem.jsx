import React from "react";
import { Row, Col, Card,  Spinner } from "react-bootstrap";
import Img from "react-image";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function MovieItem({ movie, addMovie }) {
  return (
    <>
      <Card className="mb-3" style={{ maxWidth: "540px" }}>
        <Row className="no-gutters">
          <Col md={5} className="imgCon" onClick={addMovie}>
            <Img
              draggable={false}
              variant="top"
              alt="movie"
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              loader={<Spinner size="sm" className="" animation="border" />}
              unloader={<p>Not Available</p>}
            />
            <div className="addCon">
              <IoIosAddCircleOutline />
              <p>Add to bookmark</p>
            </div>
          </Col>
          <Col md={7} className="">
            <div className="card-body">
              <div>
                <h5 className="card-title">
                  {movie.title.split("(").slice(0, 1)}
                  <span className="score">
                    <span>{movie.vote_average}</span>
                  </span>
                </h5>
                <p className="card-text">
                  {movie.overview
                    .split(" ")
                    .slice(0, 20)
                    .join(" ") + "..."}
                </p>
              </div>
              <div className="cardFooter">
                <span className="date">{movie.release_date}</span>

                <h3 className="movieInfo colorHeader">
                  <strong>
                    <a
                      href={"https://www.themoviedb.org/movie/" + movie.id}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      More Info
                    </a>
                  </strong>
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}
