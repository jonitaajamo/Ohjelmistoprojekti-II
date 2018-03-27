import React, { Component } from "react";
import TabButton from "./TabButton";

export default class AllButton extends Component {
  constructor() {
    super();
    this.state = {
      isAllButtonClicked: true
    };
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  clickHandler() {
    console.log("Click!", this.props.asset, this.state.isAllButtonClicked);
    if (this.state.isAllButtonClicked) {
      this.setState({
        isAllButtonClicked: false
      });
    } else {
      this.setState({
        isAllButtonClicked: true
      });
    }
  }

  tabButtonClickHandler(item) {
    console.log("item", item);
    if (!item) {
      this.setState({
        isAllButtonClicked: false
      });
    }
  }

  render() {
    const linkStyle = {
      textDecoration: "none"
    };

    return (
      <ul>
        <li
          className={this.state.isAllButtonClicked ? "is-active" : ""}
        >
          <a style={linkStyle} onClick={() => this.clickHandler()}>
            <span>{this.capitalize(this.props.asset)}</span>
          </a>
        </li>
        <TabButton
          isAllButtonClicked={this.state.isAllButtonClicked}
          tabButtonClickHandler={this.tabButtonClickHandler.bind(this)}
          asset="equity"
        />
        <TabButton
          isAllButtonClicked={this.state.isAllButtonClicked}
          tabButtonClickHandler={this.tabButtonClickHandler.bind(this)}
          asset="bond"
        />
        <TabButton
          isAllButtonClicked={this.state.isAllButtonClicked}
          tabButtonClickHandler={this.tabButtonClickHandler.bind(this)}
          asset="alternative"
        />
        <TabButton
          isAllButtonClicked={this.state.isAllButtonClicked}
          tabButtonClickHandler={this.tabButtonClickHandler.bind(this)}
          asset="property"
        />
        <TabButton
          isAllButtonClicked={this.state.isAllButtonClicked}
          tabButtonClickHandler={this.tabButtonClickHandler.bind(this)}
          asset="cash"
        />
        <TabButton
          isAllButtonClicked={this.state.isAllButtonClicked}
          tabButtonClickHandler={this.tabButtonClickHandler.bind(this)}
          asset="unknown"
        />
      </ul>
    );
  }
}
