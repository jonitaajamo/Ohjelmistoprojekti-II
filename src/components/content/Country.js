import React from "react";

let style = {
  opacity: 0.7
};

const Country = ({ country }) => (
  <article className="tile is-child notification is-dark" style={style}>
    <div className="content">
      <p className="title">{country ? country : "Select a country"}</p>
    </div>
  </article>
);

export default Country;
