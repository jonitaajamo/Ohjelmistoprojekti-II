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
      </article>
    );
  }
}
