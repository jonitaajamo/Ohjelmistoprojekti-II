import React, { Component } from "react";
import Country from "./map/Country";
import Loading from "./map/Loading";
import Timeline from "./map/Timeline";
import Assets from "./map/Assets";
import ButtonGroup from "./map/ButtonGroup";
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGeographyHovered: false,
      hoveredGeographyName: "",
      isGeographyClicked: true,
      clickedGeographyName: "",
      mapZoomValue: 1,
      mapCenter: [0, 20],
      disableOptimization: false
    };
  }

  toggleHover(i) {
    this.setState({
      isGeographyHovered: !this.state.isGeographyHovered,
      hoveredGeographyName: this.props.geographyNames[i].name
    });
  }

  mapProjection() {
    return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160);
  }

  onGeographyClick(geography, i) {
    const path = geoPath().projection(this.mapProjection());
    const centroid = this.mapProjection().invert(path.centroid(geography));

    this.setState(
      {
        isGeographyClicked: true,
        clickedGeographyName: this.props.geographyNames[i].name,
        mapZoomValue: 3,
        mapCenter: centroid,
        disableOptimization: true
      },
      () => {
        this.setState({
          disableOptimization: false
        });
      }
    );

    if (
      this.state.clickedGeographyName === this.props.geographyNames[i].name &&
      this.state.isGeographyClicked
    ) {
      this.setState({
        isGeographyClicked: false,
        clickedGeographyName: "",
        mapZoomValue: 1,
        mapCenter: [0, 20]
      });
    }

    this.props.fetchGeographyIdFromMap(
      geography.id,
      this.state.isGeographyClicked
    );
  }

  checkGeographyName() {
    let geography;
    if (this.state.isGeographyClicked) {
      geography = this.state.clickedGeographyName;
    } else if (this.state.isGeographyHovered) {
      geography = this.state.hoveredGeographyName;
    } else {
      geography = "Select a country";
    }
    return geography;
  }

  setWeightValuesForHeatmap() {
    const weightDataForMap = [];
    const month = this.props.month;
    const asset =
      this.props.selectedAsset === undefined ? 0 : this.props.selectedAsset;
    const assetClasses = this.props.geographicalWeightData.length
      ? this.props.geographicalWeightData[month].assetClasses[asset].weights
      : [];
    for (let i = 0; i < this.props.geographyNames.length; i++) {
      for (let j = 0; j < assetClasses.length; j++) {
        let id = assetClasses[j].countryId;
        let weight = assetClasses[j].weight;
        if (this.props.geographyNames[i].id === JSON.stringify(id)) {
          weightDataForMap.push(weight);
        }
      }
      if (!weightDataForMap[i]) {
        weightDataForMap.push(0);
      }
    }
    return weightDataForMap;
  }

  zoomHandler(e) {
    switch (e.target.value) {
      case "reset":
        this.setState(
          {
            isGeographyClicked: false,
            mapZoomValue: 1,
            mapCenter: [0, 20],
            clickedGeographyName: "",
            disableOptimization: true
          },
          () => {
            this.setState({
              disableOptimization: false
            });
          }
        );
        break;
      case "zoom-out":
        this.setState(
          {
            mapZoomValue:
              this.state.mapZoomValue === 1
                ? this.state.mapZoomValue
                : this.state.mapZoomValue - 1,
            disableOptimization: true
          },
          () => {
            this.setState({
              disableOptimization: false
            });
          }
        );
        break;
      case "zoom-in":
        this.setState(
          {
            mapZoomValue: this.state.mapZoomValue + 1,
            disableOptimization: true
          },
          () => {
            this.setState({
              disableOptimization: false
            });
          }
        );
        break;
      default:
        break;
    }
  }

  renderMap() {
    const weightData = this.setWeightValuesForHeatmap();
    const optimization =
      this.state.disableOptimization || this.props.disableOptimization;
    const mapGeographies = (
      <Geographies
        disableOptimization={optimization}
        geography={this.props.geographyBorders}
      >
        {(geographies, projection) =>
          geographies.map((geography, i) => (
            <Geography
              style={{
                default: {
                  fill:
                    weightData[i] === 0
                      ? "#fcfcfc"
                      : `rgba(200,50,56, ${weightData[i] * 2})`,
                  stroke:
                    this.state.isGeographyClicked &&
                    this.state.clickedGeographyName ===
                      this.props.geographyNames[i].name
                      ? "rgb(50, 115, 220)"
                      : "black",
                  strokeWidth:
                    this.state.isGeographyClicked &&
                    this.state.clickedGeographyName ===
                      this.props.geographyNames[i].name
                      ? "1.4px"
                      : "0.5px",
                  outline: "none"
                },
                hover: {
                  fill: "rgba(200, 50, 56, 0.5)",
                  stroke:
                    this.state.isGeographyClicked &&
                    this.state.clickedGeographyName ===
                      this.props.geographyNames[i].name
                      ? "rgb(50, 115, 220)"
                      : "black",
                  strokeWidth:
                    this.state.isGeographyClicked &&
                    this.state.clickedGeographyName ===
                      this.props.geographyNames[i].name
                      ? "1.4px"
                      : "0.5px",
                  outline: "none"
                },
                pressed: {
                  fill: "rgb(50, 115, 220)",
                  stroke:
                    this.state.isGeographyClicked &&
                    this.state.clickedGeographyName ===
                      this.props.geographyNames[i].name
                      ? "rgb(50, 115, 220)"
                      : "black",
                  strokeWidth:
                    this.state.isGeographyClicked &&
                    this.state.clickedGeographyName ===
                      this.props.geographyNames[i].name
                      ? "1.4px"
                      : "0.5px",
                  outline: "none"
                }
              }}
              key={geography + i}
              geography={geography}
              projection={projection}
              className="countries"
              onClick={() => this.onGeographyClick(geography, i)}
              onMouseOver={() => this.toggleHover(i)}
              onMouseLeave={() => this.toggleHover(i)}
            />
          ))
        }
      </Geographies>
    );

    return (
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile is-parent">
            <article className="box tile has-accent is-child notification is-paddingless">
              <div>
                <ComposableMap
                  width={800}
                  height={450}
                  style={{
                    width: "100%",
                    height: "auto"
                  }}
                >
                  <ZoomableGroup
                    center={this.state.mapCenter}
                    zoom={this.state.mapZoomValue}
                    disablePanning="true"
                  >
                    {mapGeographies}
                  </ZoomableGroup>
                </ComposableMap>
                <Country country={this.checkGeographyName()} />
                <ButtonGroup
                  isGeographyClicked={this.state.isGeographyClicked}
                  clickedGeographyName={this.state.clickedGeographyName}
                  mapZoomValue={this.state.mapZoomValue}
                  mapCenter={this.state.mapCenter}
                  disableOptimization={this.state.disableOptimization}
                  zoomHandler={this.zoomHandler.bind(this)}
                />
              </div>
              <Timeline
                length={this.props.length}
                geographicalWeightData={this.props.geographicalWeightData}
                onChange={this.props.onChange}
                onAssetChange={this.props.onAssetChange}
                month={this.props.month}
                onMonthButtonClick={this.props.onMonthButtonClick}
                onAfterChange={this.props.onAfterChange}
              />
            </article>
          </div>
        </div>
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <Assets
              geographyId={this.props.geographyId}
              geographicalWeightData={this.props.geographicalWeightData}
              month={this.props.month}
              isGeographyClicked={this.props.isGeographyClicked}
              clickedGeographyName={this.state.clickedGeographyName}
              currency={this.props.currency}
              topInstruments={this.props.topInstruments}
              selectedAsset={this.props.selectedAsset}
            />
          </div>
        </div>
      </div>
    );
  }

  renderLoading() {
    return (
      <article className="is-child notification is-paddingless">
        <Loading item="map" />
      </article>
    );
  }

  render() {
    if (!this.props.isLoaded) {
      return this.renderLoading();
    } else {
      return this.renderMap();
    }
  }
}

export default Map;
