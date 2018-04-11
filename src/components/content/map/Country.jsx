import React from "react";

const Country = ({ country }) => (
  <div className="content country-name-tag">
    <span className="tag is-larger is-dark">
      {country ? country : "Select a country"}
    </span>
  </div>
);

export default Country;
