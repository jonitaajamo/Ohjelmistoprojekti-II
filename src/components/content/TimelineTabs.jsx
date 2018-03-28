import React, { Component } from "react";
import TabButton from "./TabButton";

export default class TimelineTabs extends Component {
  constructor() {
    super();
    this.state = {
      active: ""
    };
  }

  setButtonActive(name) {
    this.setState({
      active: name
    });
  }

  render() {
    const buttons = this.props.geographicalWeightData.length
      ? this.props.geographicalWeightData[0].assetClasses.map((item, key) => {
          return (
            <TabButton
              isActive={item.class === this.state.active ? "is-active" : ""}
              onClickHandler={() => this.setButtonActive(item.class)}
              key={key}
              asset={item.class}
            />
          );
        })
      : [];

    return (
      <div className="tabs is-toggle is-toggle-rounded is-centered is-fullwidth">
        {buttons}
      </div>
    );
  }
}
