import React from "react";
import Timeline from "../components/content/Timeline";

describe("Timeline", () => {
  const props = {
    length: 76,
    month: 10
  };

  it("renders correctly", () => {
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders child", () => {
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper.find("TimelineTabs").length).toEqual(1);
  });

  it("sets props correctly", () => {
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper.find("input").props().max).toBe(76);
    expect(wrapper.find("input").props().value).toBe(10);
  });

  it("calls onChange when changed", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Timeline {...props} onChange={onChange} />);
    wrapper.find("input").simulate("change");
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
