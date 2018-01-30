import React from "react";

const Tooltip = ({country}) => (
  <div className="tooltip">
      <div>
        <span>Portfolio</span>
        <span>Pörssi</span>
        <span>Valuutta</span><br/>
        <span>You clicked {country}</span>
      </div>
  </div>
);

export default Tooltip;