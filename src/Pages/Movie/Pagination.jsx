import React from "react";
import { Button, Row, Col } from "react-bootstrap";
export default function Pagination({showPrev, changePageNum, currentPageUrl }) {
  return (
    <div className="container-fluid">
      <Row>
        <Col lg={6}>
          {" "}
          {showPrev && (
            <Button
              className="mt-3 mb-3"
              variant="outline-secondary"
              size="lg"
              block
              onClick={() => changePageNum(currentPageUrl, false)}
            >
              Previous Page
            </Button>
          )}
        </Col>
        <Col lg={6}>
          {" "}
          {true && (
            <Button
              className="mt-3 mb-3"
              variant="outline-secondary"
              size="lg"
              onClick={() => changePageNum(currentPageUrl, true)}
              block
            >
              Next Page
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}
