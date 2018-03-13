import React from "react";
import ReactDOM from "react-dom";
import Map from "../components/content/Map";
import { shallow, mount } from "enzyme";

describe("Map", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Map />);
    expect(wrapper).toMatchSnapshot();
  });

  it("initially renders Loading component", () => {
    const wrapper = shallow(<Map />);
    expect(wrapper.find("Loading").length).toEqual(1);
  });

  it("renders map when data is loaded", () => {
    const wrapper = shallow(<Map />);
    wrapper.setState({ geographyBorders: [1, 2] });
    expect(wrapper.find("ComposableMap").length).toEqual(1);
  });

  it("fires event handler when geography is clicked", () => {
    const wrapper = mount(<Map />);
    wrapper.setState({ geographyBorders: [1, 2] });
    wrapper.instance().onGeographyClick = jest.fn();
    wrapper.update();
    wrapper.find("Geography").at(0).simulate("click");
    expect(wrapper.instance().onGeographyClick).toHaveBeenCalled();
  });

  it("zooms out when button is clicked", () => {
    const wrapper = shallow(<Map />);
    wrapper.setState({ geographyBorders: [1, 2], mapZoomValue: 3 });
    wrapper.find("button").simulate("click");
    expect(wrapper.state().mapZoomValue).toBe(1);
  });
});
