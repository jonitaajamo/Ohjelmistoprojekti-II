import React from "react";
import ReactDOM from "react-dom";
import Map from "../components/content/Map";
import { shallow, mount } from "enzyme";

describe("Map", () => {
  const mockData = [
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
  ];

  const initialState = {
    geographyBorders: [1, 2],
    geographyNames: ["Finland", "Sweden"]
  };

  it("renders without crashing", () => {
    const wrapper = shallow(<Map geographicalWeightData={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("initially renders Loading component", () => {
    const wrapper = shallow(<Map geographicalWeightData={[]} />);
    expect(wrapper.find("Loading").length).toEqual(1);
  });

  it("renders map when data is loaded", () => {
    const wrapper = shallow(<Map geographicalWeightData={mockData} />);
    expect(wrapper.find("ComposableMap").length).toEqual(1);
  });

  it("fires event handler when geography is clicked", () => {
    const wrapper = mount(<Map geographicalWeightData={mockData} />);
    wrapper.instance().onGeographyClick = jest.fn();
    wrapper.setState(initialState);
    wrapper.update();
    wrapper
      .find("Geography")
      .at(0)
      .simulate("click");
    expect(wrapper.instance().onGeographyClick).toHaveBeenCalledTimes(1);
  });

  it("zooms in when geography is clicked", () => {
    const wrapper = mount(<Map geographicalWeightData={mockData} />);
    wrapper.setState(initialState);
    wrapper
      .find("Geography")
      .at(0)
      .simulate("click");
    expect(wrapper.state().mapZoomValue).toBe(3);
  });

  it("zooms out when button is clicked", () => {
    const wrapper = shallow(<Map geographicalWeightData={mockData} />);
    wrapper.setState({ mapZoomValue: 3 });
    wrapper.find("button").simulate("click");
    expect(wrapper.state().mapZoomValue).toBe(1);
  });

  it("sets weight values when map is rendered", () => {
    const spy = jest.spyOn(Map.prototype, "setWeightValuesForHeatmap");
    const wrapper = mount(<Map geographicalWeightData={mockData} />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
