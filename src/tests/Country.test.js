import React from 'react';
import Country from "../components/content/Country";
import renderer from "react-test-renderer";

it('should display country name', () => {
  const component = renderer.create(
    <Country country='Finland'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});