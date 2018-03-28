import React, { Component } from "react";
import TimelineTabs from "./TimelineTabs";

export default class Timeline extends Component {
  render() {
    const timelineStyle = {
      alignItems: "center",
      justifyContent: "center"
    };
    

    return (
      <article className="tile is-child notification">
        <TimelineTabs
          geographicalWeightData={this.props.geographicalWeightData}
          onAssetChange={this.props.onAssetChange}
        />
        <div className="columns" style={timelineStyle}>
          <input
            className="progress"
            type="range"
            min="0"
            max={this.props.length}
            value={this.props.month}
            onChange={this.props.onChange}
            style={{outline: "none"}}
          />
        </div>
        <span className="field has-addons has-addons-centered">
          <a className="button left" id="previous" onClick={this.props.onMonthButtonClick}>
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
            id="1"
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
