import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row } from "react-bootstrap";

export default function CoronaChart() {
  var labels = [
    "Jan 22",
    "Jan 23",
    "Jan 24",
    "Jan 25",
    "Jan 26",
    "Jan 27",
    "Jan 28",
    "Jan 29",
    "Jan 30",
    "Jan 31",
    "Feb 1",
    "Feb 2",
    "Feb 3",
    "Feb 4",
    "Feb 5",
    "Feb 6",
    "Feb 7",
    "Feb 8",
    "Feb 9",
    "Feb 10",
    "Feb 11",
    "Feb 12",
    "Feb 13",
    "Feb 14",
    "Feb 15"
  ];
  var data1 = {
    labels: labels,
    datasets: [
      {
        label: "Total Case",
        data: [
          580,
          845,
          1315,
          2015,
          2800,
          4581,
          6058,
          7813,
          9821,
          11948,
          14551,
          17389,
          20628,
          24553,
          28276,
          31439,
          34876,
          37552,
          40553,
          43099,
          45170,
          59283,
          64437,
          67100,
          69197
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }
    ]
  };
  var data2 = {
    labels: labels,
    datasets: [
      {
        label: "Death",
        data: [
          25,
          25,
          41,
          56,
          80,
          106,
          132,
          170,
          213,
          259,
          304,
          362,
          426,
          492,
          565,
          638,
          724,
          813,
          910,
          1018,
          1115,
          1261,
          1383,
          1526,
          1669
        ],

        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }
    ]
  };
  return (
    <div className="homeSectionCon coronaCon">
      <h3 className="colorHeader">
        <strong>Corona Chart</strong>
      </h3>
      <Row>
        <Col lg={6}>
          {" "}
          <div className="chartCon">
            <Line data={data1} options={{ maintainAspectRatio: false }} />
          </div>
        </Col>

        <Col lg={6}>
          <div className="chartCon">
            <Line data={data2} options={{ maintainAspectRatio: false }} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
