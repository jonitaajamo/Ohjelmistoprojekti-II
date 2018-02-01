import React, { Component } from "react";
import Map from "./content/Map";
import Currency from "./content/Currency";
import StockMarket from "./content/StockMarket";
import Portfolio from "./content/Portfolio";
import News from "./content/News";

class Content extends Component {
  render() {

    let contentStyle = {
      width: "99%",
      margin: "auto"
    }

    return (
      <div style={contentStyle} className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile is-parent">
            <Map />
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-danger">
              <p className="subtitle">Timeline placeholder</p>
            </article>
          </div>
          <div className="tile is-parent">
              <Portfolio />
            </div>
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <Currency />
              <StockMarket />
            </div>
            
          </div>
        </div>
        <div className="tile is-parent">
          <News />
        </div>
      </div>
    );
  }
}

export default Content;
