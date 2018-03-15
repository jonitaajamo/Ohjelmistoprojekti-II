import React, { Component } from "react";
import Map from "./content/Map";
import Assets from "./content/Assets";
import Portfolio from "./content/Portfolio";
import Timeline from "./content/Timeline";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geographicalWeightData: []
    };
  }

  fetchGeographicalWeightData() {
    fetch(
      "https://raw.githubusercontent.com/tarmeli/Ohjelmistoprojekti-II/master/src/data/getGeographicalWeights-mock.json"
    )
      .then(response => response.json())
      .then(weights =>
        this.setState({
          geographicalWeightData: weights.monthlyWeights
        })
      )
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.fetchGeographicalWeightData();
  }

  render() {
    const contentStyle = {
      width: "99%",
      margin: "auto"
    };

    return (
      <div style={contentStyle} className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile is-parent">
            <Map geographicalWeightData={this.state.geographicalWeightData} />
          </div>
          <div className="tile is-parent">
            <Timeline />
          </div>
          <div className="tile is-parent">
            <Portfolio />
          </div>
        </div>
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <Assets />
            
          </div>
        </div>
      </div>
    );
  }
}
