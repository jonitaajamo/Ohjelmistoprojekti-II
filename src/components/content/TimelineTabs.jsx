import React, { Component } from "react";
import AllButton from "./AllButton";

export default class TimelineTabs extends Component {
  render() {
    return (
      <div className="tabs is-toggle is-toggle-rounded is-centered">
        <AllButton asset="all" />
      </div>
    );
  }
}
