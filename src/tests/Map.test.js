import React from "react";
import Map from "../components/content/Map";

describe("Map", () => {
  const props = {
    geographicalWeightData: [
      {
        month: "2012-01",
        assetClasses: [
          {
            class: "all",
            weights: [
              { countryId: 840, weight: 0.7, marketValue: 14000000 },
              { countryId: 246, weight: 0.2, marketValue: 4000000 },
              { countryId: 826, weight: 0.05, marketValue: 1000000 },
              { countryId: 643, weight: 0.05, marketValue: 1000000 }
            ]
          }
        ]
      }
    ],
    topInstruments: [
      {
        secId: 1236452364,
        secName: "Woahtek",
        weightInClass: 0.4,
        marketValueInClass: 8000000,
        classWeightInPortfolio: 0.08,
        totalMarketValue: 8000000
      }
    ],
    geographyBorders: [1, 2],
    geographyNames: ["Finland", "Sweden"],
    selectedMonth: 0,
    selectedAsset: 0
  };

  it("renders without crashing", () => {
    const map = shallow(<Map geographicalWeightData={[]} />);
    expect(map).toMatchSnapshot();
  });

  it("initially renders Loading component", () => {
    const map = shallow(<Map geographicalWeightData={[]} />);
    expect(map.find("Loading").length).toEqual(1);
  });

  it("renders map when data is loaded", () => {
    const map = shallow(<Map {...props} />);
    expect(map.find("ComposableMap").length).toEqual(1);
  });

  it("renders children", () => {
    const map = shallow(<Map {...props} />);
    expect(map.find("Country").length).toBe(1);
    expect(map.find("Timeline").length).toBe(1);
    expect(map.find("Assets").length).toBe(1);
  });

  it("fires event handler when geography is clicked", () => {
    const map = mount(<Map {...props} />);
    map.instance().onGeographyClick = jest.fn();
    map
      .find("Geography")
      .at(0)
      .simulate("click");
    expect(map.instance().onGeographyClick).toHaveBeenCalledTimes(1);
  });

  it("zooms in when geography is clicked", () => {
    const mock = jest.fn();
    const map = mount(<Map {...props} fetchGeographyIdFromMap={mock} />);
    map
      .find("Geography")
      .at(0)
      .simulate("click");
    expect(map.state().mapZoomValue).toBe(3);
  });

  it("zooms out when button is clicked", () => {
    const map = shallow(<Map {...props} />);
    map.setState({ mapZoomValue: 3 });
    map.find("button").simulate("click");
    expect(map.state().mapZoomValue).toBe(1);
  });

  it("sets weight values when map is rendered", () => {
    const spy = jest.spyOn(Map.prototype, "setWeightValuesForHeatmap");
    const map = mount(<Map {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
