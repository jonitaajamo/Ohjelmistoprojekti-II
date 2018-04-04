import React, { Component } from "react";
import { feature } from "topojson-client";
import Map from "./content/Map";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geographicalWeightData: [],
      geographyBorders: [],
      geographyNames: [],
      selectedMonth: 0,
      selectedAsset: 0,
      disableOptimization: false,
      geographyId: "",
      isGeographyClicked: false
    };
  }

  fetchDataForMap() {
    fetch(
      "https://raw.githubusercontent.com/tarmeli/Ohjelmistoprojekti-II/master/src/data/getGeographicalWeights-mock.json"
    )
      .then(response => response.json())
      .then(weights =>
        this.setState({
          geographicalWeightData: weights.monthlyWeights,
          selectedMonth: weights.monthlyWeights.length - 1,
          currency: weights.currency
        })
      )
      .catch(err => console.error(err));

    fetch("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
      .then(response => response.json())
      .then(worldData =>
        this.setState({
          geographyBorders: feature(
            worldData,
            worldData.objects.countries
          ).features.sort((a, b) => {
            return a.id - b.id;
          })
        })
      )
      .catch(err => console.error(err));

    fetch(
      "https://raw.githubusercontent.com/tarmeli/Ohjelmistoprojekti-II/master/src/data/countryNames.json"
    )
      .then(response => response.json())
      .then(names =>
        this.setState({
          geographyNames: names.countries.sort((a, b) => {
            return a.id - b.id;
          })
        })
      )
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.fetchDataForMap();
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

  changeMonthOnClick(event) {
    const { selectedMonth, geographicalWeightData } = this.state;
    const weightDataLength = geographicalWeightData.length - 1;
    if (event.target.classList.contains("left") && selectedMonth > 0) {
      this.setState(
        prevState => {
          return {
            selectedMonth: prevState.selectedMonth - 1,
            disableOptimization: true
          };
        },
        () => {
          this.setState({
            disableOptimization: false
          });
        }
      );
    } else if (
      event.target.classList.contains("right") &&
      selectedMonth < weightDataLength
    ) {
      this.setState(
        prevState => {
          return {
            selectedMonth: prevState.selectedMonth + 1,
            disableOptimization: true
          };
        },
        () => {
          this.setState({
            disableOptimization: false
          });
        }
      );
    }
  }

  fetchGeographyIdFromMap(geographyId, isGeographyClicked) {
    this.setState({
      geographyId,
      isGeographyClicked
    });
  }

  render() {
    const contentStyle = {
      width: "99%",
      margin: "auto"
    };

    const weightDataLength = this.state.geographicalWeightData.length - 1;

    return (
      <div style={contentStyle}>
        <Map
          currency={this.state.currency}
          geographicalWeightData={this.state.geographicalWeightData}
          geographyNames={this.state.geographyNames}
          geographyBorders={this.state.geographyBorders}
          selectedMonth={this.state.selectedMonth}
          selectedAsset={this.state.selectedAsset}
          disableOptimization={this.state.disableOptimization}
          length={weightDataLength}
          onChange={this.changeMonth.bind(this)}
          onAssetChange={this.changeAsset.bind(this)}
          month={this.state.selectedMonth}
          onMonthButtonClick={this.changeMonthOnClick.bind(this)}
          fetchGeographyIdFromMap={this.fetchGeographyIdFromMap.bind(this)}
          geographyId={this.state.geographyId}
          isGeographyClicked={this.state.isGeographyClicked}
        />
      </div>
    );
  }
}
