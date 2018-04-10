import React from "react";
import Country from "../components/content/map/Country";

describe("Country", () => {
  it("renders correctly", () => {
    const country = shallow(<Country />);
    expect(country).toMatchSnapshot();
  });

  it("displays default text when no country is selected", () => {
    const country = shallow(<Country />);
    expect(country.find("span").text()).toEqual("Select a country");
  });

  it("displays country name", () => {
    const country = shallow(<Country country="Finland" />);
    expect(country.find("span").text()).toEqual("Finland");
  });
});
