import React, { Component } from "react";
import { feature } from "topojson-client";
import Country from "./Country";
import Loading from "./Loading";
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
      countryNames: [],
      countryHover: false,
      hoveredCountry: "",
      clicked: false,
      activeCountry: "",
      zoom: 1,
      center: [0, 20],
      disableOptimization: false
    };
  }

  componentDidMount() {
    fetch("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
      .then(response => response.json())
      .then(worldData =>
        this.setState({
          worldData: feature(
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
          countryNames: names.countries.sort((a, b) => {
            return a.id - b.id;
          })
        })
      )
      .catch(err => console.error(err));
  }

  toggleHover(i) {
    this.setState({
      countryHover: !this.state.countryHover,
      hoveredCountry: this.state.countryNames[i].name
    });
  }

  projection() {
    return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160);
  }

  onClick(geography, i) {
    const path = geoPath().projection(this.projection());
    const centroid = this.projection().invert(path.centroid(geography));
    this.setState(
      {
        clicked: true,
        activeCountry: this.state.countryNames[i].name,
        zoom: 3,
        center: centroid,
        disableOptimization: true
      },
      () => {
        this.setState({
          disableOptimization: false
        });
      }
    );

    if (this.state.activeCountry === this.state.countryNames[i].name) {
      this.setState({
        clicked: false,
        activeCountry: "",
        zoom: 1,
        center: [0, 20]
      });
    }
  }

  checkCountry() {
    let country;
    if (this.state.clicked) {
      country = this.state.activeCountry;
    } else if (this.state.countryHover) {
      country = this.state.hoveredCountry;
    } else {
      country = "Select a country";
    }
    return country;
  }

  zoomOut() {
    this.setState(
      {
        clicked: false,
        zoom: 1,
        center: [0, 20],
        activeCountry: "",
        disableOptimization: true
      },
      () => {
        this.setState({
          disableOptimization: false
        });
      }
    );
  }

  renderMap() {
    const buttonStyle = {
      margin: "10px",
    };

    const mapGeographies = (
      <Geographies
        disableOptimization={this.state.disableOptimization}
        geography={this.state.worldData}
      >
        {(geographies, projection) =>
          geographies.map((geography, i) => (
            <Geography
              style={{
                default: {
                  fill:
                    this.state.clicked &&
                    this.state.activeCountry === this.state.countryNames[i].name
                      ? "steelblue"
                      : this.state.countryNames[i].data === 10
                        ? "#fcfcfc"
                        : `rgba(200,50,56, ${1 *
                            this.state.countryNames[i].data /
                            10000})`,
                  stroke: "black",
                  strokeWidth: "0.5px",
                  outline: "none"
                },
                hover: {
                  fill: "rgba(200, 50, 56, 0.5)",
                  stroke: "black",
                  strokeWidth: "0.5px",
                  outline: "none"
                },
                pressed: {
                  fill: "tomato",
                  stroke: "black",
                  strokeWidth: "0.5px",
                  outline: "none"
                }
              }}
              key={geography + i}
              geography={geography}
              projection={projection}
              className="countries"
              onClick={() => this.onClick(geography, i)}
              onMouseOver={() => this.toggleHover(i)}
              onMouseLeave={() => this.toggleHover(i)}
            />
          ))
        }
      </Geographies>
    );

    return (
      <article className="tile is-child notification is-paddingless">
        <ComposableMap
          width={800}
          height={450}
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "-62px"
          }}
        >
          <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
            {mapGeographies}
          </ZoomableGroup>
        </ComposableMap>
        <button
          className="button"
          style={buttonStyle}
          onClick={() => this.zoomOut()}
        >
          Zoom out
        </button>
        <Country country={this.checkCountry()} />
      </article>
    );
  }

  renderLoading() {
    return (
      <article className="tile is-child notification is-paddingless">
        <Loading color="tomato" />
      </article>
    );
  }

  render() {
    if (!this.state.countryNames.length) {
      return this.renderLoading();
    } else {
      return this.renderMap();
    }
  }
}

export default Map;
