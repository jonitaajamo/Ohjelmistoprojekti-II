import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tabs from "./timeline/Tabs";

export default class Timeline extends Component {
  renderDatalist() {
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
            marks={this.renderDatalist()}
            step={1}
            min={0}
            max={this.props.length}
            defaultValue={this.props.month}
            dotStyle={{ borderColor: "orange" }}
            activeDotStyle={{ borderColor: "yellow" }}
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
          <a className="button left">
            <span className="icon left">
              <i className="fas fa-play left" />
            </span>
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
