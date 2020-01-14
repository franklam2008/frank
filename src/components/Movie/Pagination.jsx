import React from "react";
import { Button, Row, Col, InputGroup, FormControl } from "react-bootstrap";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
export default function Pagination({
  inputShow,
  showPrev,
  changePageNum,
  currentPageUrl,
  showNext,
  movieSearchInput,
  error,
  handleKeyPress,
  handleSearchInput
}) {
  return (
    <section className="container-fluid">
      <Row>
        <Col lg={{span: 4, order: 1 }} xs={{span: 6, order: 1 }}>
          {" "}
          {showPrev && (
            <Button
              className=""
              variant="warning"
              size="lg"
              onClick={() => changePageNum(currentPageUrl, false)}
            >
              <IoIosArrowBack />
            </Button>
          )}
        </Col>
        <Col lg={{span: 4, order: 2 }} xs={{span: 12, order: 3 }}>
          {inputShow && (
            <InputGroup>
              <FormControl
                type="text"
                ref={movieSearchInput}
                placeholder={error ? "Please Try Again" : "Search"}
                aria-label="Search"
                aria-describedby="basic-addon2"
                onKeyPress={handleKeyPress}
              />
              <InputGroup.Append>
                <Button variant="info" onClick={handleSearchInput}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          )}
        </Col>
        <Col lg={{span: 4, order: 3 }} xs={{span: 6, order: 2 }} className="d-flex justify-content-end">
          {" "}
          {showNext && (
            <Button
              variant="warning"
              size="lg"
              onClick={() => changePageNum(currentPageUrl, true)}
            >
              <IoIosArrowForward />
            </Button>
          )}
        </Col>
      </Row>
    </section>
  );
}
