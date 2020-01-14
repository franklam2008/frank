import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <section className="container-fluid">
      <Row>
        <Col lg={6} xs={6}>
          {" "}
          {gotoPrevPage && (
            <Button
              className="mt-3 mb-3"
              variant="warning"
              size="lg"
              onClick={gotoPrevPage}
            >
              <IoIosArrowBack />
            </Button>
          )}
        </Col>
        <Col lg={6} xs={6} className="d-flex justify-content-end">
          {" "}
          {gotoNextPage && (
            <Button
              className="mt-3 mb-3"
              variant="warning"
              size="lg"
              onClick={gotoNextPage}
            >
              <IoIosArrowForward />
            </Button>
          )}
        </Col>
      </Row>
    </section>
  );
}
