import React from "react";
import TimelineTabs from "./TimelineTabs";

const Timeline = () => (
  <article className="tile is-child notification">
  <TimelineTabs />
    <input className="progress" type="range"></input>
  </article>
);

export default Timeline;
