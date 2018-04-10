import React from "react";
import Content from "../components/Content";

describe("Content", () => {
  it("renders correctly", () => {
    const content = shallow(<Content />);
    expect(content).toMatchSnapshot();
    expect(content.find("Map").length).toBe(1);
  });

  it("fetches data when mounted", () => {
    const spy = jest.spyOn(Content.prototype, "fetchDataForMap");
    const content = shallow(<Content />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
