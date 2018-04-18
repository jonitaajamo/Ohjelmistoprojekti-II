import React from "react";

const Loading = ({ item }) => (
  <span className="box has-text-centered has-accent notification">
    <strong>Loading {item}...</strong>
  </span>
);

export default Loading;
