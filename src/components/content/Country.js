import React from "react";

const Country = ({ country }) => (
  <article class="tile is-child notification is-success">
    <div class="content">
      <p className="title">{country}</p>
    </div>
  </article>
);

export default Country;
