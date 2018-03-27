import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.XMLHttpRequest = require("w3c-xmlhttprequest").XMLHttpRequest;
global.shallow = shallow;
global.mount = mount;
