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

    return (
      <article className="tile has-accent is-child notification">
        <p className="title">Assets</p>
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Class</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{assetTableData}</tbody>
        </table>
        <p className="title">Top 10 Weights</p>
        <figure className="image is-4by3">
          <img
            alt="Placeholder"
            src="https://bulma.io/images/placeholders/640x480.png"
          />
        </figure>
      </article>
    );
  }
}
