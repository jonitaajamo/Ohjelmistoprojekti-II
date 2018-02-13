import React from "react";

const Portfolio = () => (
  <article className="tile is-child notification is-info">
  <div className="tabs is-centered">
  <ul>
    <li><a>Stocks</a></li>
    <li><a>Equity</a></li>
    <li><a>Interest</a></li>
  </ul>
  </div>
    <p className="title">Portfolio</p>
    <figure className="image is-4by3">
      <img
        alt="Placeholder"
        src="https://bulma.io/images/placeholders/640x480.png"
      />
    </figure>
  </article>
);

export default Portfolio;
