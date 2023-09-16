import React from "react";
import { Home } from "../components/Home";
import { test } from "firebase/app";

describe("login", () => {
  it("CheckboxWithLabel changes the text after click", () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<Home />);

    expect(checkbox.text()).toBe("Off");

    checkbox.find("input").simulate("change");

    expect(checkbox.text()).toBe("On");
  });
});
