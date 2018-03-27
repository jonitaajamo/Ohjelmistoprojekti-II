import React, { Component } from "react";

export default class TabButton extends Component {
  constructor() {
    super();
    this.state = {
      isTabButtonClicked: false,
      isClicked: false
    };
  }

  clickHandler() {
    console.log("Click!", this.props.asset);
    if (this.state.isTabButtonClicked) {
      this.setState({
        isTabButtonClicked: false
      });
      this.props.tabButtonClickHandler(this.state.isTabButtonClicked);
    } else {
      this.setState({
        isTabButtonClicked: true
      });
      this.props.tabButtonClickHandler(this.state.isTabButtonClicked);
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const linkStyle = {
      textDecoration: "none"
    };

    return (
      <li
        className={
          this.state.isTabButtonClicked && !this.props.isAllButtonClicked
            ? "tab is-active"
            : "tab"
        }
      >
        <a style={linkStyle} onClick={() => this.clickHandler()}>
          <span>{this.capitalize(this.props.asset)}</span>
        </a>
      </li>
    );
  }
}
