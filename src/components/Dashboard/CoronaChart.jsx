import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row } from "react-bootstrap";

export default function CoronaChart() {
  var data1 = {
    labels: ["Jan 22", "Jan 26", "Jan 30", "Feb 3", "Feb 7", "Feb 11"],
    datasets: [
      {
        label: "Total Case",
        data: [522, 2800, 9821, 20628, 34876, 45170],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  var data2 = {
    labels: ["Jan 22", "Jan 26", "Jan 30", "Feb 3", "Feb 7", "Feb 11"],
    datasets: [
      {
        label: "Death",
        data: [25, 80, 213, 426, 724, 1115],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  return (
    <div className="homeSectionCon coronaCon">
       <h3 className="colorHeader">
        <strong>
            Corona Chart
        </strong>
      
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
