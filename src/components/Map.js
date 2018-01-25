import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
      countryHover: false
    };
  }

  toggleHover() {
    this.setState({countryHover: !this.state.countryHover});
  }

  componentDidMount() {
    fetch("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
      .then(response => response.json())
      .then(worldData =>
        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features
        })
      )
      .catch(err => console.error(err));
  }

  onClick(d) {
    console.log(d);
  }

  render() {
    let countryStyle = {
      fill: '#CCCCCC',
      stroke: '#000000',
      strokeWidth: '0.5px'
    }

    if (this.state.countryHover) {
      countryStyle = {
        fill: 'pink',
        stroke: '#000000',
        strokeWidth: '0.5px'
      }
    }

    const projection = geoMercator().scale(100);
    const pathGenerator = geoPath().projection(projection);
    const countries = this.state.worldData.map((d, i) => (
      <path style={countryStyle} key={"path" + i} d={pathGenerator(d)} className="countries" onClick={d => this.onClick(d)} onMouseOver={() => this.toggleHover()} onMouseLeave={() => this.toggleHover()} />
    ));
    return (
      <svg width={800} height={450} viewBox="0 0 800 450">
        {countries}
      </svg>
    );

    
  }
}

export default Map;
