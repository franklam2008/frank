import React from "react";
import { Button, Row, Col } from "react-bootstrap";
export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className="container-fluid">
      <Row>
        <Col lg={6}>
          {" "}
          {gotoPrevPage && (
            <Button
              className="mt-3 mb-3"
              variant="outline-secondary"
              size="lg"
              block
              onClick={gotoPrevPage}
            >
              Previous Page
            </Button>
          )}
        </Col>
        <Col lg={6}>
          {" "}
          {gotoNextPage && (
            <Button
              className="mt-3 mb-3"
              variant="outline-secondary"
              size="lg"
              block
              onClick={gotoNextPage}
            >
              Next Page
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}
