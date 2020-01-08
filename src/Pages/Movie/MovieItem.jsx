import React from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Img from "react-image";
export default function MovieItem({ movie }) {
  return (
    <Card>
      <Row>
        <Col lg={5}>
          <div className="imgCon">
            <Img
              variant="top"
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              loader={<Spinner size="sm" className="" animation="border" />}
              unloader={<p>Not Available</p>}
            />
          </div>
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>
              <span className="score">
                <span>{movie.vote_average}</span>
              </span>{" "}
              {movie.title}{" "}
            </Card.Title>
            <Card.Text>
              <span>
                {movie.overview
                  .split(" ")
                  .slice(0, 30)
                  .join(" ") + "..."}
              </span>
            </Card.Text>
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
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
