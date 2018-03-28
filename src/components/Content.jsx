import React, { Component } from "react";
import Map from "./content/Map";
import Assets from "./content/Assets";
import Portfolio from "./content/Portfolio";
import Timeline from "./content/Timeline";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geographicalWeightData: [],
      selectedMonth: 0,
      selectedAsset: 0,
      disableOptimization: false
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

  changeMonth(event) {
    this.setState(
      {
        selectedMonth: JSON.parse(event.target.value),
        disableOptimization: true
      },
      () => {
        this.setState({
          disableOptimization: false
        });
      }
    );
  }

  changeAsset(item) {
    this.setState(
      {
        selectedAsset: item,
        disableOptimization: true
      },
      () => {
        this.setState({
          disableOptimization: false
        });
      }
    );
  }

  render() {
    const contentStyle = {
      width: "99%",
      margin: "auto"
    };

    const weightDataLength = this.state.geographicalWeightData.length - 1;

    return (
      <div style={contentStyle} className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile is-parent">
            <Map
              geographicalWeightData={this.state.geographicalWeightData}
              selectedMonth={this.state.selectedMonth}
              selectedAsset={this.state.selectedAsset}
              disableOptimization={this.state.disableOptimization}
            />
          </div>
          <div className="tile is-parent">
            <Timeline
              length={weightDataLength}
              geographicalWeightData={this.state.geographicalWeightData}
              onChange={this.changeMonth.bind(this)}
              onAssetChange={this.changeAsset.bind(this)}
              month={this.state.selectedMonth}
            />
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
