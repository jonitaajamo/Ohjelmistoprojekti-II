import React from "react";
import Timeline from "../components/content/map/Timeline";
import Content from "../components/Content";

describe("Timeline", () => {
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
    length: 76,
    month: 10
  };

  it("renders correctly", () => {
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders child", () => {
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper.find("Tabs").length).toEqual(1);
  });

  it("sets props correctly", () => {
    const wrapper = shallow(<Timeline {...props} />);
    const input = wrapper.find("input");
    expect(input.props().max).toBe(76);
    expect(input.props().value).toBe(10);
  });

  it("calls onChange when changed", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Timeline {...props} onChange={onChange} />);
    wrapper.find("input").simulate("change");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("fires click handler when buttons are clicked", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Timeline {...props} onMonthButtonClick={onClick} />
    );
    expect(wrapper.find("a.button").length).toBe(3);
    wrapper.find("#previous").simulate("click");
    wrapper.find("#next").simulate("click");
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
