import React, { Component } from "react";

export default class Assets extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: ""
    };
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  Loading(what) {
    return (
      <tr>
        <td>Loading {what}...</td>
      </tr>
    );
  }

  renderTopInstruments() {
    return this.props.topInstruments.map((item, key) => {
      return (
        <tr key={key}>
          <td>{key + 1}</td>
          <td>{item.secName}</td>
          <td>{item.totalMarketValue}</td>
          <td>{item.weightInClass * 100 + "%"}</td>
        </tr>
      );
    });
  }

  checkCurrency() {
    const geographyIdArray = this.props.geographicalWeightData.length
      ? this.props.geographicalWeightData[this.props.month].assetClasses[
          this.props.selectedAsset
        ].weights
      : [];

    const currency = geographyIdArray.some(
      item => JSON.stringify(item.countryId) === this.props.geographyId
    )
      ? " (" + this.props.currency + ")"
      : " ";

    return currency;
  }

  render() {
    const assetTableData =
      this.props.geographicalWeightData.length === 0
        ? this.Loading("Assets")
        : this.props.geographicalWeightData.map((item, key) => {
            if (key === this.props.month) {
              const innerLoop = item.assetClasses.map((innerItem, innerKey) => {
                const innerInnerLoop = innerItem.weights.map(
                  (innerInnerItem, innerInnerKey) => {
                    if (
                      innerInnerItem.countryId ===
                      Number(this.props.geographyId)
                    ) {
                      return (
                        <tr key={innerKey}>
                          <td>{this.capitalize(innerItem.class)}</td>
                          <td>{innerInnerItem.marketValue + "€"}</td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  }
                );
                return innerInnerLoop;
              });
              return innerLoop;
            } else {
              return null;
            }
          });
    const assetTableStyle = {
      display: !this.props.clickedGeographyName ? "none" : "block"
    };

    const currency = this.checkCurrency();

    return (
      <div className="tile is-vertical">
        <article className="box tile is-child notification has-accent notification">
          <p className="title">Assets</p>
          <p className="subtitle">
            {!this.props.clickedGeographyName
              ? "World"
              : this.props.clickedGeographyName}

            {!this.props.clickedGeographyName ? "" : currency}

            <br />
            {!this.props.geographicalWeightData.length
              ? this.Loading("Month")
              : this.props.geographicalWeightData[this.props.month].month}
          </p>
          <div className="centered-table" style={assetTableStyle}>
            <table className="table is-fullwidth is-hoverable is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>Asset name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>{assetTableData}</tbody>
            </table>
          </div>
        </article>
        <article className="box tile is-child notification has-accent notification">
          <p className="title">Top 10 Instruments</p>
          <table className="table is-fullwidth is-hoverable is-bordered is-striped is-narrow">
            <thead>
              <tr>
                <th />
                <th>Instrument name</th>
                <th>Value</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>{this.renderTopInstruments()}</tbody>
          </table>
        </article>
      </div>
    );
  }
}
