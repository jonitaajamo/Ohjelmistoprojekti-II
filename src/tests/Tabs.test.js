import React from "react";
import Tabs from "../components/content/map/timeline/Tabs";

describe("Tabs", () => {
  const geographicalWeightData = [
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
        },
        {
          class: "equity",
          weights: [
            { countryId: 276, weight: 0.1, marketValue: 3000000 },
            { countryId: 246, weight: 0.9, marketValue: 27000000 }
          ]
        },
        {
          class: "bond",
          weights: [
            { countryId: 276, weight: 0.1, marketValue: 2000000 },
            { countryId: 246, weight: 0.9, marketValue: 18000000 }
          ]
        },
        {
          class: "alternative",
          weights: [
            { countryId: 276, weight: 0.1, marketValue: 5000000 },
            { countryId: 246, weight: 0.2, marketValue: 10000000 },
            { countryId: 826, weight: 0.3, marketValue: 15000000 },
            { countryId: 643, weight: 0.4, marketValue: 20000000 }
          ]
        },
        {
          class: "property",
          weights: [
            { countryId: 276, weight: 0.1, marketValue: 6000000 },
            { countryId: 246, weight: 0.2, marketValue: 12000000 },
            { countryId: 826, weight: 0.3, marketValue: 18000000 },
            { countryId: 643, weight: 0.4, marketValue: 24000000 }
          ]
        },
        {
          class: "cash",
          weights: [
            { countryId: 276, weight: 0.1, marketValue: 6000000 },
            { countryId: 246, weight: 0.2, marketValue: 12000000 },
            { countryId: 826, weight: 0.3, marketValue: 18000000 },
            { countryId: 643, weight: 0.4, marketValue: 24000000 }
          ]
        },
        {
          class: "unknown",
          weights: [
            { countryId: 276, weight: 0.1, marketValue: 6000000 },
            { countryId: 246, weight: 0.2, marketValue: 12000000 },
            { countryId: 826, weight: 0.3, marketValue: 18000000 },
            { countryId: 643, weight: 0.4, marketValue: 24000000 }
          ]
        }
      ]
    }
  ];

  it("renders correctly", () => {
    const tabs = shallow(
      <Tabs geographicalWeightData={geographicalWeightData} />
    );
    expect(tabs).toMatchSnapshot();
    const buttons = tabs.find("Button");
    expect(buttons.length).toBe(7);
  });

  it("sets asset names correctly", () => {
    const tabs = shallow(
      <Tabs geographicalWeightData={geographicalWeightData} />
    );
    const buttons = tabs.find("Button");
    const texts = buttons.map(node =>
      node
        .dive()
        .find("span")
        .text()
    );
    expect(texts).toEqual([
      "All",
      "Equity",
      "Bond",
      "Alternative",
      "Property",
      "Cash",
      "Unknown"
    ]);
  });

  it("initially sets 'All' as active tab", () => {
    const tabs = shallow(
      <Tabs geographicalWeightData={geographicalWeightData} />
    );
    expect(
      tabs
        .find("Button")
        .at(0)
        .props().isActive
    ).toEqual("is-active");
  });
});
