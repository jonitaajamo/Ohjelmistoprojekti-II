import React from "react";

const ButtonGroup = ({
  isGeographyClicked,
  clickedGeographyName,
  mapZoomValue,
  mapCenter,
  disableOptimization,
  zoomHandler
}) => (
  <div className="button-group">
    <div className="button-row">
      <button className="button reset" onClick={zoomHandler} value="reset">
        Reset
      </button>
    </div>
    <span className="button-row">
      <a className="button zoom-in" onClick={zoomHandler} value="zoom-in">
        <span className="icon zoom-in">
          <i className="fas fa-plus zoom-in" />
        </span>
      </a>
      <a className="button zoom-out" onClick={zoomHandler} value="zoom-out">
        <span className="icon zoom-out">
          <i className="fas fa-minus zoom-out" />
        </span>
      </a>
    </span>
  </div>
);

export default ButtonGroup;
