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
      <button className="button" onClick={zoomHandler} value="reset">
        Reset
      </button>
    </div>
    <div className="button-row">
      <button className="button" onClick={zoomHandler} value="zoom-in">
        +
      </button>
      <button className="button" onClick={zoomHandler} value="zoom-out">
        -
      </button>
    </div>
  </div>
);

export default ButtonGroup;
