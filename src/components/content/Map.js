import React, { Component } from "react";
import { feature } from "topojson-client";
import Country from "./Country";
import Loading from "./Loading";
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
      activeCountry: "",
      clicked: false,
      clickedCountry: "",
      zoom: 1,
      center: [0, 20]
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
      activeCountry: this.state.worldData[i].id
    });
  }

  onClick(i) {
    this.setState({
      clicked: true,
      clickedCountry: this.state.countryNames[i].name,
      zoom: this.state.zoom * 2
    });
  }

  renderSimpleMaps() {
    return (
      <article className="tile is-child notification is-paddingless">
        <ComposableMap
          width={800}
          height={450}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup
            center={this.state.center}
            zoom={this.state.zoom}
          >
            <Geographies geography={this.state.worldData}>
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    style={{
                      default: {
                        fill: `rgba(38,50,56, ${1 *
                          this.state.countryNames[i].data /
                          10000})`,
                        stroke: "black",
                        strokeWidth: "0.5px",
                        outline: "none"
                      },
                      hover: {
                        fill: "gray",
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
                    onClick={() => this.onClick(i)}
                    onMouseOver={() => this.toggleHover(i)}
                    onMouseLeave={() => this.toggleHover(i)}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <Country country={this.state.clickedCountry} />
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
      return this.renderSimpleMaps();
    }
  }
}

export default Map;
