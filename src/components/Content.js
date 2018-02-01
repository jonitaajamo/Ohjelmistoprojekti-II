import React, { Component } from "react";
import Map from "./content/Map";
import Currency from "./content/Currency";
import StockMarket from "./content/StockMarket";
import Portfolio from "./content/Portfolio";
import Country from "./content/Country";

class Content extends Component {
  render() {
    return (
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile is-parent">
            <Map />
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <Currency />
              <StockMarket />
            </div>
            <div class="tile is-parent">
              <Portfolio />
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <Country />
        </div>
      </div>
    );
  }
}

export default Content;
