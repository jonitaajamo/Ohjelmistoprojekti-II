import React, { Component } from "react";
import "bulma/css/bulma.css";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
