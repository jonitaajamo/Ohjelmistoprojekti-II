import React, { Component } from "react";

export default class TabButton extends Component {
  clickHandler() {
    this.props.onClickHandler();
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const linkStyle = {
      textDecoration: "none"
    };

    return (
      <li className={this.props.isActive}>
        <a style={linkStyle} onClick={() => this.clickHandler()}>
          <span>{this.capitalize(this.props.asset)}</span>
        </a>
      </li>
    );
  }
}
