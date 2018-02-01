import React from "react";

const Tooltip = ({ country }) => (
  <div className="box">
    <div className="media-content">
      <div className="content has-text-centered" >
      <span><strong>{country}</strong></span>
      <br />
        <span>Pörssi:</span>
        <br />
        <span>Portfolio:</span>
        <br />
        <span>Valuutta:</span>
      </div>
    </div>
  </div>
);

export default Tooltip;
