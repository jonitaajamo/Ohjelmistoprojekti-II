import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      worldData: []
    };
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
    const projection = geoMercator().scale(100);
    const pathGenerator = geoPath().projection(projection);
    const countries = this.state.worldData.map((d, i) => (
      <path key={"path" + i} d={pathGenerator(d)} className="countries" onClick={d => this.onClick(d)}/>
    ));
    return (
      <svg width={800} height={450} viewBox="0 0 800 450">
        {countries}
      </svg>
    );

    
  }
}

export default Map;
