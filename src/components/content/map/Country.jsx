import React from "react";

const style = {
  opacity: 0.9,
  margin: "10px",
  position: "absolute",
  top: "0px",
  left: "0px"
};

const Country = ({ country }) => (
  <div className="content" style={style}>
    <span className="tag is-larger is-dark">
      {country ? country : "Select a country"}
    </span>
  </div>
);

export default Country;
