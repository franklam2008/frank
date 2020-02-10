import React from "react";
import { Button, Row, Col} from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";

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
        <Col lg={{ span: 4, order: 1 }} xs={{ span: 6, order: 1 }}>
          {" "}
          {showPrev && (
            <Button
              className="pageBtn"
              size="lg"
              onClick={() => changePageNum(currentPageUrl, false)}
            >
              <IoIosArrowBack />
            </Button>
          )}
        </Col>
        <Col lg={{ span: 4, order: 2 }} xs={{ span: 12, order: 3 }}>
          <div className="searchBar">
            <IoIosSearch />
            <input
              type="text"
              placeholder={error ? "Please Try Again" : "Search"}
              className="searchBarInput"
              ref={movieSearchInput}
              onKeyPress={handleKeyPress} 
            />
            <button onClick={handleSearchInput}>Enter</button>
          </div>
        </Col>
        <Col
          lg={{ span: 4, order: 3 }}
          xs={{ span: 6, order: 2 }}
          className="d-flex justify-content-end"
        >
          {" "}
          {showNext && (
            <Button
              className="pageBtn"
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
