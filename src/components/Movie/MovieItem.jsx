import React from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Img from "react-image";
export default function MovieItem({ movie }) {
  return (
    <>
      <Card className="mb-3" style={{ maxWidth: "540px" }}>
        <Row className="no-gutters">
          <Col md={5} className=" imgCon">
            <Img
              variant="top"
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              loader={<Spinner size="sm" className="" animation="border" />}
              unloader={<p>Not Available</p>}
            />
          </Col>
          <Col md={7} className="">
            <div className="card-body">
              <h5 className="card-title">{movie.title} <span className="score">
                  <span>{movie.vote_average}</span>
                </span></h5>
              <p className="card-text">
              {movie.overview
                  .split(" ")
                  .slice(0, 20)
                  .join(" ") + "..."}
              </p>
              <div className="cardFooter">
                <span className="date">{movie.release_date}</span>
                <Button variant="info">
                  <a
                    href={"https://www.themoviedb.org/movie/" + movie.id}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    More Info
                  </a>
                </Button>
              </div>
            </div>
            
          </Col>
        </Row>
      </Card>
      
    </>
  );
}
