import React, { Component } from "react";

export default class Assets extends Component {
  render() {
    console.log(
      "geographicalWeightData in assets",
      this.props.geographicalWeightData
    );

    const assetTableData =
      this.props.geographicalWeightData.length === 0
        ? "Loading..."
        : this.props.geographicalWeightData.map((item, key) => {
            if (key === this.props.month) {
              const innerLoop = item.assetClasses.map((innerItem, innerKey) => {
                const innerInnerLoop = innerItem.weights.map(
                  (innerInnerItem, innerInnerKey) => {
                    console.log(
                      "countryid",
                      innerInnerItem.countryId,
                      "geographyid",
                      Number(this.props.geographyId)
                    );
                    if (
                      innerInnerItem.countryId ===
                      Number(this.props.geographyId)
                    ) {
                      console.log("asd", innerInnerItem);
                      return (
                        <tr key={innerKey}>
                          <td>{innerItem.class}</td>
                          <td>{innerInnerItem.marketValue}</td>
                        </tr>
                      );
                    }
                  }
                );
                return innerInnerLoop;
              });
              console.log("innerloop", innerLoop);
              return innerLoop;
            }
          });

    console.log("assetatabasdofasdlö", assetTableData);

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
