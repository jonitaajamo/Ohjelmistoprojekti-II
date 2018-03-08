import React from "react";
import Country from "../components/content/Country";
import { shallow } from "enzyme";

it("displays country name", () => {
  const wrapper = shallow(<Country country="Finland" />);
  expect(wrapper).toMatchSnapshot();
});
