import React from "react";
import Content from "../components/Content";

describe("Content", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with children", () => {
    const wrapper = mount(<Content />);
    expect(wrapper.find("Map").length).toEqual(1);
    expect(wrapper.find("Assets").length).toEqual(1);
  });

  it("fetches data when mounted", () => {
    const spy = jest.spyOn(Content.prototype, "fetchDataForMap");
    const wrapper = shallow(<Content />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
