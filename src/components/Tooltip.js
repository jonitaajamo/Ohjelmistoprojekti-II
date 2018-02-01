import React from "react";

const Tooltip = ({ country }) => (
  <div className="box">
    <div className="media-content">
      <div className="content">
        <span>Portfolio </span>
        <span>Pörssi </span>
        <span>Valuutta </span>
        <br />
        <span>You clicked {country}</span>
      </div>
    </div>
  </div>
);

export default Tooltip;
