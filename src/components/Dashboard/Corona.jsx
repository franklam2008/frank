import React from "react";

export default function Corona({ corona }) {
  return (
    <div className="homeSectionCon coronaCon">
      <h3 className="colorHeader">
        <strong>
          <a
            href="https://www.google.com/search?q=coronavirus"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Corona Data
          </a>
        </strong>
        <span>
          <a
            href="https://www.worldometers.info/coronavirus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </span>
        <span>(update every 30 mins)</span>
        <span>Date: {getCurrentDate()}</span>
      </h3>
      {Object.entries(corona).map(x => (
        <div key={x[0]} className="coronaCat">
          <p>
            {x[0]}: <span className={x[0]}>{x[1]}</span>
          </p>
        </div>
      ))}
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
