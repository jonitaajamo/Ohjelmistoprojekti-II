import React, { Component } from "react";

export default class Assets extends Component {
  Loading() {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }

  render() {
    const assetTableData =
      this.props.geographicalWeightData.length === 0
        ? this.Loading()
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
                          <td>{innerItem.class}</td>
                          <td>{innerInnerItem.marketValue}</td>
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

    console.log(this.props.isGeographyClicked);

    return (
      <article className="tile has-accent is-child notification">
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{assetTableData}</tbody>
        </table>
      </article>
    );
  }
}
