import React, { Component } from "react";

export default class TimelineTabs extends Component {
  render() {
    return (
      <article className="tile is-child notification is-danger">
        <input className="progress" type="range" />
      </article>
    );
  }
}
