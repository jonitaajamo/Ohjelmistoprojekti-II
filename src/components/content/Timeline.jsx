import React, { Component } from "react";
import TimelineTabs from "./TimelineTabs";

export default class Timeline extends Component {
  render() {
    return (
      <article className="tile is-child notification">
        <TimelineTabs
          geographicalWeightData={this.props.geographicalWeightData}
        />
        <input
          className="progress"
          type="range"
          min="0"
          max={this.props.length}
          value={this.props.month}
          onChange={this.props.onChange}
        />
        <span className="field has-addons has-addons-centered">
          <a className="button left" onClick={this.props.onMonthButtonClick}>
            <span className="icon left">
              <i className="fas fa-arrow-left left" />
            </span>
            <span className="left">Previous month</span>
          </a>
          <a className="button right" id="1" onClick={this.props.onMonthButtonClick}>
            <span className="icon right">
              <i className="fas fa-arrow-right right" />
            </span>
            <span className="right">Next month</span>
          </a>
        </span>
      </article>
    );
  }
}
