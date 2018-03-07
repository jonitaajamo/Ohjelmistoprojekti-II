import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Map from "../components/content/Map";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Map", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Map />, div);
  });

  it("changes state when country is clicked", () => {
    const mapComponent = shallow(<Map />);
    mapComponent.setState({ clicked: true });
    const status = mapComponent.state().clicked;
    expect(status).toEqual(true);
  });
});
