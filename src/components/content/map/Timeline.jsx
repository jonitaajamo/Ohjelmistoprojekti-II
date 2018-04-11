import React, { Component } from "react";
import Slider from "rc-slider";
import "./timeline.css";
import Tabs from "./timeline/Tabs";

export default class Timeline extends Component {
  populateMarksForSlider() {
    const marksObject = {};
    for (
      let index = 0;
      index < this.props.geographicalWeightData.length;
      index++
    ) {
      if (index % 6 === 0) {
        marksObject[index] = this.props.geographicalWeightData[index].month;
      }
    }
    return marksObject;
  }

  render() {
    const timelineStyle = {
      margin: "10px",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <article className="tile is-child notification">
        <Tabs
          geographicalWeightData={this.props.geographicalWeightData}
          onAssetChange={this.props.onAssetChange}
        />
        <div style={timelineStyle}>
          <Slider
            marks={this.populateMarksForSlider()}
            step={1}
            min={0}
            max={this.props.length}
            value={this.props.month}
            onChange={this.props.onChange}
          />
        </div>
        <br />
        <span className="field has-addons has-addons-centered">
          <a
            className="button left"
            id="previous"
            onClick={this.props.onMonthButtonClick}
          >
            <span className="icon left">
              <i className="fas fa-arrow-left left" />
            </span>
            <span className="left">Previous month</span>
          </a>
          <a
            className="button right"
            id="next"
            onClick={this.props.onMonthButtonClick}
          >
            <span className="right">Next month</span>
            <span className="icon right">
              <i className="fas fa-arrow-right right" />
            </span>
          </a>
        </span>
      </article>
    );
  }
}
