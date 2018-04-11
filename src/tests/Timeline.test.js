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
    const timeline = shallow(<Timeline {...props} />);
    expect(timeline).toMatchSnapshot();
  });

  it("renders child", () => {
    const timeline = shallow(<Timeline {...props} />);
    expect(timeline.find("Tabs").length).toEqual(1);
  });

  it("sets props correctly", () => {
    const timeline = shallow(<Timeline {...props} />);
    const slider = timeline.find("ComponentEnhancer").dive();
    const handle = slider.find("Handle");
    expect(handle.props().value).toBe(10);
    expect(handle.props().max).toBe(76);
  });

  it("fires click handler when buttons are clicked", () => {
    const onClick = jest.fn();
    const timeline = shallow(
      <Timeline {...props} onMonthButtonClick={onClick} />
    );
    expect(timeline.find("a.button").length).toBe(2);
    timeline.find("#previous").simulate("click");
    timeline.find("#next").simulate("click");
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
