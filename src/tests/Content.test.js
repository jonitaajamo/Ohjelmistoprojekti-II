import React from "react";
import Content from "../components/Content";

describe("Content", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Map").length).toBe(1);
  });

  it("fetches data when mounted", () => {
    const spy = jest.spyOn(Content.prototype, "fetchDataForMap");
    const wrapper = shallow(<Content />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
