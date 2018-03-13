import React from "react";
import ReactDOM from "react-dom";
import Map from "../components/content/Map";
import { shallow, mount } from "enzyme";

describe("Map", () => {
  const expected = [
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

  it("renders without crashing", () => {
    const wrapper = shallow(<Map geographicalWeightData={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("initially renders Loading component", () => {
    const wrapper = shallow(<Map geographicalWeightData={[]} />);
    expect(wrapper.find("Loading").length).toEqual(1);
  });

  it("renders map when data is loaded", () => {
    const wrapper = shallow(<Map geographicalWeightData={expected} />);
    expect(wrapper.find("ComposableMap").length).toEqual(1);
  });

  it("fires event handler when geography is clicked", () => {
    const wrapper = mount(<Map geographicalWeightData={expected} />);
    wrapper.instance().onGeographyClick = jest.fn();
    wrapper.setState({ geographyBorders: [1, 2]});
    wrapper.update();
    wrapper
      .find("Geography")
      .at(0)
      .simulate("click");
    expect(wrapper.instance().onGeographyClick).toHaveBeenCalled();
  });

  it("zooms out when button is clicked", () => {
    const wrapper = shallow(<Map geographicalWeightData={expected} />);
    wrapper.setState({ mapZoomValue: 3 });
    wrapper.find("button").simulate("click");
    expect(wrapper.state().mapZoomValue).toBe(1);
  });
});
