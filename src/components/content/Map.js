import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
      countryNames: [],
      countryHover: false,
      activeCountry: "",
      clicked: false,
      clickedCountry: ""
    };
  }

  toggleHover(i) {
    this.setState({
      countryHover: !this.state.countryHover,
      activeCountry: this.state.worldData[i].id
    });
  }

  componentDidMount() {
    fetch("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
      .then(response => response.json())
      .then(worldData =>
        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features.sort((a, b) => {
            return a.id - b.id;
          })
        })
      )
      .catch(err => console.error(err));

      fetch("https://raw.githubusercontent.com/tarmeli/Ohjelmistoprojekti-II/master/src/data/countryNames.json")
      .then(response => response.json())
      .then(names => this.setState({
        countryNames: names.sort((a, b) => {
          return a.id - b.id
        })
      }))
      .catch(err => console.error(err));
  }

  onClick(i) {
    this.setState({
      clicked: true,
      clickedCountry: this.state.countryNames[i-3].name
    })
  }

  render() {
    let countryStyle = {
      fill: "#CCCCCC",
      stroke: "#000000",
      strokeWidth: "0.5px"
    };

    let activeStyle = {
      fill: "#f0f",
      stroke: "#000000",
      strokeWidth: "0.5px"
    };

    let svgStyle = {
      marginBottom: "-6px"
    }

    const projection = geoMercator().scale(100);
    const pathGenerator = geoPath().projection(projection);
    const countries = this.state.worldData.map((d, i) => (
      <path
        style={
          this.state.countryHover &&
          this.state.activeCountry === this.state.worldData[i].id
            ? activeStyle
            : countryStyle
        }
        key={"path" + i}
        d={pathGenerator(d)}
        className="countries"
        onClick={() => this.onClick(i)}
        onMouseOver={() => this.toggleHover(i)}
        onMouseLeave={() => this.toggleHover(i)}
      />
    ));
    return (
      <article className="tile is-child notification box is-paddingless">
        <svg style={svgStyle} viewBox="82.5 20 800 450">
          {countries}
        </svg>
      </article>
    );
  }
}

export default Map;
