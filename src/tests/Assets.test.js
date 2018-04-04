import React from "react";
import Assets from "../components/content/map/Assets";

describe("Assets", () => {
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
    topInstruments: [
      {
        secId: 1236452364,
        secName: "Woahtek Oyj",
        weightInClass: 0.4,
        marketValueInClass: 8000000,
        classWeightInPortfolio: 0.08,
        totalMarketValue: 8000000
      }
    ],
    month: 0,
    currency: "EUR"
  };

  it("renders correctly", () => {
    const wrapper = shallow(<Assets {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("displays loading text", () => {
    const wrapper = shallow(
      <Assets geographicalWeightData={[]} topInstruments={[]} />
    );
    expect(
      wrapper
        .find("tr")
        .at(0)
        .text()
    ).toEqual("Loading Month...");
  });

  it("displays month", () => {
    const wrapper = shallow(<Assets {...props} />);
    const subtitle = wrapper.find("p.subtitle");
    expect(subtitle.text()).toContain("2012-01");
  });

  it("renders top instruments by calling method", () => {
    const spy = jest.spyOn(Assets.prototype, "renderTopInstruments");
    const wrapper = shallow(<Assets {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(
      wrapper
        .find("td")
        .at(1)
        .text()
    ).toEqual("Woahtek Oyj");
  });

  it("displays selected country name and currency", () => {
    const wrapper = shallow(
      <Assets {...props} clickedGeographyName="Finland" />
    );
    const subtitle = wrapper.find("p.subtitle");
    expect(subtitle.text()).toContain("Finland (EUR)");
  });
});
