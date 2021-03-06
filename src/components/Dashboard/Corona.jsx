import React from "react";
import { Accordion, Card, Row, Col } from "react-bootstrap";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

export default function Corona({ corona }) {
  
  return (
    <div className="homeSectionCon coronaCon">
      <h3 className="colorHeader">
        <strong>
            Live Corona Data
        </strong>
        <div />
        <span>
          <a
            href="https://www.worldometers.info/coronavirus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
          <IoMdArrowDropright />
        </span>
        <span>
          <a
            href="https://www.google.com/search?q=coronavirus"
            target="_blank"
            rel="noopener noreferrer"
          >
            News
          </a>
          <IoMdArrowDropright />
        </span>
        <span>Date: {getCurrentDate()}</span>
      </h3>
      <Accordion>
        <Card className="coronaCard">
          <Row>
            <Col md={6}>Coronavirus: {corona["Total Case"]}</Col>
            <Col>
              Deaths: <span className="deaths">{corona.Deaths}</span>
            </Col>
            <Col md={6}>
              Recovered: <span className="recovered">{corona.Recovered}</span>
            </Col>
            <Col>
              <Accordion.Toggle eventKey="0">
                <h3 className="colorHeader">
                  <span>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>Detail</a> <IoMdArrowDropdown className="mb-1" />
                  </span>
                </h3>
              </Accordion.Toggle>
            </Col>
          </Row>

          <Accordion.Collapse eventKey="0">
            <div>
         
              {Object.entries(corona).map(x => (
                <div key={x[0]} className="coronaCat">
                  <span>{x[0]}: </span>
                    <span className={x[0]}>{x[1]}</span>
                  
                </div>
              ))}
              
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
  function getCurrentDate() {
    const separator = "-";
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }
}
