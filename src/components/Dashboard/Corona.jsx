import React from 'react'

export default function Corona({corona}) {
    return (
        <div className="homeSectionCon coronaCon">
        <h3>
          <a
            href="https://www.google.com/search?q=coronavirus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Live Corona Data</strong>
          </a>
          <span>
            <a
              href="https://www.worldometers.info/coronavirus/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Source</span>
            </a>
          </span>
          <span>(update every 30 mins)</span>
        </h3>
        <h6> Date: {getCurrentDate()}</h6>
        {Object.entries(corona).map(x => (
          <div key={x[0]} className="coronaCat">
            <p>
              {x[0]}: <span className={x[0]}>{x[1]}</span>
            </p>
          </div>
        ))}
      </div>
    )
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
