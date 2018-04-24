import React, { Component } from "react";
import Loading from "../map/Loading";

export default class Assets extends Component {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  currencyValue() {
    return this.props.currency === "EUR" ? "€" : " ";
  }

  renderTopInstruments() {
    return this.props.topInstruments.map((item, key) => {
      return (
        <tr key={key}>
          <td>{key + 1}</td>
          <td>{item.secName}</td>
          <td>
            {item.totalMarketValue}
            {this.currencyValue()}
          </td>
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
      ? " (" + this.props.currency + ") "
      : " ";

    return currency;
  }

  assetTableData() {
    return this.props.geographicalWeightData.length === 0 ? (
      <Loading item="Assets" />
    ) : (
      this.props.geographicalWeightData.map((item, key) => {
        if (key === this.props.month) {
          const assetClass = item.assetClasses.map((asset, innerKey) => {
            const weights = asset.weights.map((weight, innerInnerKey) => {
              if (weight.countryId === Number(this.props.geographyId)) {
                return (
                  <tr key={innerKey}>
                    <td>{this.capitalize(asset.class)}</td>
                    <td>
                      {weight.marketValue}
                      {this.currencyValue()}
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            });
            return weights;
          });
          return assetClass;
        } else {
          return null;
        }
      })
    );
  }

  assetTableHeadings() {
    const data = this.assetTableData();
    const hasData = data[this.props.month][0].some(item => item !== null);

    if (!hasData) {
      return (
        <tr>
          <th>Selected country has no assets</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>Asset name</th>
          <th>Value</th>
        </tr>
      );
    }
  }

  render() {
    const assetTableStyle = {
      display: !this.props.clickedGeographyName ? "none" : "block"
    };

    const currency = this.checkCurrency();
    const assetTable = this.props.clickedGeographyName
      ? this.assetTableData()
      : null;
    const assetTableHead = this.props.clickedGeographyName
      ? this.assetTableHeadings()
      : null;

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
            {!this.props.geographicalWeightData.length ? (
              <Loading item="Month" />
            ) : (
              this.props.geographicalWeightData[this.props.month].month
            )}
          </p>
          <div className="centered-table" style={assetTableStyle}>
            <table className="table is-fullwidth is-hoverable is-bordered is-striped is-narrow">
              <thead>{assetTableHead}</thead>
              <tbody>{assetTable}</tbody>
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
