import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Map from "../components/content/Map";
import { shallow } from "enzyme";

describe("Map", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Map />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("initially renders Loading component", () => {
    const wrapper = shallow(<Map />);
    expect(wrapper.find("Loading").length).toEqual(1);
  });
});
