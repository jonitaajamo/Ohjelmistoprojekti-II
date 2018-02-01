import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css"
import Map from "./components/Map";
import Header from  "./components/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Map />
      </div>
    )
  }
}

export default App;
