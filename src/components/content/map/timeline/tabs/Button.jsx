import React, { Component } from "react";

export default class Button extends Component {
  clickHandler() {
    this.props.onClickHandler();
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <li className={this.props.isActive}>
        <a className="tab-button" onClick={() => this.clickHandler()}>
          <span>{this.capitalize(this.props.asset)}</span>
        </a>
      </li>
    );
  }
}
